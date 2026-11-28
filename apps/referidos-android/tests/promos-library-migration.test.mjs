import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmdirSync, unlinkSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { newPromo, readLibrary } from "../src/features/promos-beta/promoLibrary.ts";

const hash = (value) => createHash("sha256").update(value).digest("hex");

// Test-only sketch. The app still reads and writes AsyncStorage v1.
function openPrototype(path) {
  const db = new DatabaseSync(path);
  db.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS import_receipt (singleton INTEGER PRIMARY KEY CHECK (singleton = 1), digest TEXT, remembered_name TEXT);
    CREATE TABLE IF NOT EXISTS media (filename TEXT PRIMARY KEY, digest TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS businesses (id TEXT PRIMARY KEY, suggested_name TEXT NOT NULL, confirmed_at TEXT);
    CREATE TABLE IF NOT EXISTS drafts (
      id TEXT PRIMARY KEY, legacy_id TEXT UNIQUE NOT NULL, business_id TEXT NOT NULL REFERENCES businesses(id),
      photo TEXT REFERENCES media(filename), payload TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS outbox (operation_id TEXT PRIMARY KEY);
  `);
  return db;
}

function importPrototype(db, sourcePath, photoDir, onDraft = () => {}) {
  const raw = readFileSync(sourcePath, "utf8");
  const sourceDigest = hash(raw);
  const library = readLibrary(raw);

  db.exec("BEGIN IMMEDIATE");
  try {
    const receipt = db.prepare("SELECT digest FROM import_receipt").get();
    if (receipt) {
      if (receipt.digest !== sourceDigest) throw new Error("Legacy snapshot changed after import");
    } else {
      const insertMedia = db.prepare("INSERT OR IGNORE INTO media VALUES (?, ?)");
      const insertBusiness = db.prepare("INSERT INTO businesses VALUES (?, ?, NULL)");
      const insertDraft = db.prepare("INSERT INTO drafts VALUES (?, ?, ?, ?, ?)");
      for (const draft of library.promos) {
        const businessId = randomUUID();
        if (draft.photo) {
          const photo = readFileSync(join(photoDir, draft.photo));
          insertMedia.run(draft.photo, hash(photo));
        }
        insertBusiness.run(businessId, draft.businessName || library.businessName);
        insertDraft.run(randomUUID(), draft.id, businessId, draft.photo, JSON.stringify(draft));
        onDraft();
      }
      db.prepare("INSERT INTO import_receipt VALUES (1, ?, ?)").run(sourceDigest, library.businessName);
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
}

function withLegacyFixture(run) {
  const dir = mkdtempSync(join(tmpdir(), "promos-v1-migration-"));
  const photo = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa.jpg";
  const sourcePath = join(dir, "legacy.json");
  const databasePath = join(dir, "test.sqlite");
  const pictureBytes = "Synthetic media fixture for digest checks";
  const first = {
    ...newPromo("old-id", "Café Río", 103),
    title: "Descuento de apertura",
    offer: "2 por 1",
    description: "Aplica el sábado",
    photo,
    expiration: "2027-01-16",
    template: "contrast",
    color: "ocean",
  };
  const raw = JSON.stringify({
    version: 1,
    businessName: "Café Río",
    promos: [first, { ...first, title: "Una promoción distinta", updatedAt: 104 }, newPromo("other", "", 105)],
  });
  try {
    writeFileSync(sourcePath, raw);
    writeFileSync(join(dir, photo), pictureBytes);
    run({ dir, photo, raw, pictureBytes, sourcePath, databasePath });
  } finally {
    for (const name of readdirSync(dir)) unlinkSync(join(dir, name));
    rmdirSync(dir);
  }
}

test("SQLite design preserves every legacy field and shared photo and keeps the same IDs after retry", () => {
  withLegacyFixture(({ dir, photo, raw, pictureBytes, sourcePath, databasePath }) => {
    const firstDb = openPrototype(databasePath);
    let originalIds;
    try {
      importPrototype(firstDb, sourcePath, dir);
      const rows = firstDb.prepare("SELECT * FROM drafts ORDER BY rowid").all();
      originalIds = rows.map(({ id, business_id }) => [id, business_id]);
      assert.deepEqual(rows.map(({ payload }) => JSON.parse(payload)), readLibrary(raw).promos);
      assert.equal(new Set(rows.map(({ business_id }) => business_id)).size, 3);
      assert.equal(firstDb.prepare("SELECT count(*) AS n FROM businesses WHERE confirmed_at IS NULL").get().n, 3);
      assert.equal(firstDb.prepare("SELECT count(*) AS n FROM drafts WHERE photo = ?").get(photo).n, 2);
      assert.equal(firstDb.prepare("SELECT count(*) AS n FROM media").get().n, 1);
      assert.equal(firstDb.prepare("SELECT digest FROM media WHERE filename = ?").get(photo).digest, hash(pictureBytes));
      assert.equal(firstDb.prepare("SELECT count(*) AS n FROM outbox").get().n, 0);
    } finally {
      firstDb.close();
    }
    const reopened = openPrototype(databasePath);
    try {
      importPrototype(reopened, sourcePath, dir);
      assert.deepEqual(
        reopened.prepare("SELECT id, business_id FROM drafts ORDER BY rowid").all().map(({ id, business_id }) => [id, business_id]),
        originalIds,
      );
      assert.equal(readFileSync(sourcePath, "utf8"), raw);
      assert.equal(readFileSync(join(dir, photo), "utf8"), pictureBytes);
      writeFileSync(sourcePath, raw + "\n");
      assert.throws(() => importPrototype(reopened, sourcePath, dir), /snapshot changed/);
    } finally {
      reopened.close();
    }
  });
});

test("SQLite design rolls back a partial import and retries without losing the legacy source", () => {
  withLegacyFixture(({ dir, photo, raw, pictureBytes, sourcePath, databasePath }) => {
    const interrupted = openPrototype(databasePath);
    try {
      assert.throws(() => importPrototype(interrupted, sourcePath, dir, () => {
        throw new Error("synthetic interrupted write");
      }), /interrupted/);
    } finally {
      interrupted.close();
    }
    const reopened = openPrototype(databasePath);
    try {
      for (const table of ["drafts", "businesses", "media", "import_receipt"]) {
        assert.equal(reopened.prepare(`SELECT count(*) AS n FROM ${table}`).get().n, 0);
      }
      unlinkSync(join(dir, photo));
      assert.throws(() => importPrototype(reopened, sourcePath, dir), { code: "ENOENT" });
      assert.equal(reopened.prepare("SELECT count(*) AS n FROM import_receipt").get().n, 0);
      assert.equal(readFileSync(sourcePath, "utf8"), raw);
      writeFileSync(join(dir, photo), pictureBytes);
      importPrototype(reopened, sourcePath, dir);
      assert.equal(reopened.prepare("SELECT count(*) AS n FROM drafts").get().n, 3);
      assert.equal(existsSync(join(dir, photo)), true);
    } finally {
      reopened.close();
    }
  });
});
