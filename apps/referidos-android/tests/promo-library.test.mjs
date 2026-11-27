import assert from "node:assert/strict";
import { test } from "node:test";
import {
  countCharacters, createLibraryWriter, createPromoIds, duplicatePromo, emptyLibrary, firstPromoError,
  formatExpiration, isReady, limits, newPromo, photoNames, promoCardData, promoErrors, readLibrary, removePromo, savePromo,
} from "../src/features/promos-beta/promoLibrary.ts";

test("first opening offers an empty library and incomplete drafts survive reopening", () => {
  const library = readLibrary(null);
  assert.deepEqual(library.promos, []);
  const draft = { ...newPromo("legacy-1", ""), title: "Oferta del día", businessName: "Café Aurora" };
  const reopened = readLibrary(JSON.stringify(savePromo(library, draft, true)));
  assert.deepEqual(reopened.promos, [draft]);
  assert.equal(newPromo("session:0", reopened.businessName).businessName, "Café Aurora");
  assert.equal(savePromo(reopened, { ...draft, businessName: "" }, true).businessName, "");
  assert.equal(firstPromoError(reopened.promos[0]), "offer");
  assert.equal(isReady({ ...draft, offer: "  " }), false);
  assert.equal(isReady({ ...draft, offer: "Dos por uno" }), true);
});

test("edits replace the draft and duplication preserves its design with its own identity", () => {
  const draft = newPromo("legacy-1", "Mercado", 10);
  const edited = { ...draft, title: "Martes de frutas", offer: "2×1", template: "editorial", color: "forest", updatedAt: 12 };
  const library = savePromo(savePromo(emptyLibrary, draft), edited);
  assert.deepEqual(library.promos, [edited]);
  const copy = duplicatePromo(edited, "session:0", 15);
  assert.notEqual(copy.id, edited.id);
  assert.equal(copy.updatedAt, 15);
  const both = savePromo(library, copy);
  assert.deepEqual(both.promos, [copy, edited]);
  assert.deepEqual(removePromo(both, edited.id).promos, [copy]);
});

test("photo imports are retained by any draft or copy that references them", () => {
  const photo = "93478521-ef05-4a37-a8da-2562d31da0dd.jpg";
  const promo = { ...newPromo("legacy-1", "Panadería"), photo };
  const copy = duplicatePromo(promo, "session:0");
  const library = readLibrary(JSON.stringify(savePromo(savePromo(emptyLibrary, promo), copy)));
  assert.deepEqual(photoNames(library), [photo]);
  assert.deepEqual(photoNames(removePromo(library, promo.id)), [photo]);
  assert.deepEqual(photoNames(removePromo(removePromo(library, promo.id), copy.id)), []);
  const replacement = "361b367a-e31e-4ccc-8a61-f370df2e06fd.jpg";
  const edited = savePromo(library, { ...copy, photo: replacement });
  assert.deepEqual(photoNames(edited).sort(), [photo, replacement].sort());
  assert.deepEqual(photoNames(savePromo(edited, { ...copy, photo: null })), [photo]);
});

test("dates preserve their calendar day and damaged files are not treated as an empty library", () => {
  assert.equal(formatExpiration("2027-01-01"), "01/01/2027");
  assert.equal(formatExpiration(null), "");
  assert.throws(() => readLibrary('{"version":2,"promos":[]}'));
  assert.throws(() => readLibrary("invalid"));
  assert.throws(() => readLibrary(JSON.stringify({ ...emptyLibrary, promos: [null] })));
});

test("separate sessions issue distinct IDs and skip occupied IDs after reopening", () => {
  const firstSession = createPromoIds("session-a");
  const first = newPromo(firstSession(emptyLibrary), "Negocio", 1);
  const reopened = readLibrary(JSON.stringify(savePromo(emptyLibrary, first)));
  const secondSession = createPromoIds("session-b");
  assert.equal(secondSession(reopened), "session-b:0");
  assert.equal(createPromoIds("session-a")(reopened), "session-a:1");
});

test("a valid old snapshot with repeated IDs retains the contents of every draft", () => {
  const old = newPromo("legacy", "Negocio", 1);
  const library = { ...emptyLibrary, promos: [old, { ...old, offer: "Dos por uno" }, { ...old, id: "legacy:1" }] };
  const reopened = readLibrary(JSON.stringify(library));
  assert.deepEqual(reopened.promos.map(({ id }) => id), ["legacy", "legacy:2", "legacy:1"]);
  assert.equal(reopened.promos[1].offer, "Dos por uno");
});

test("validation prioritizes missing required fields and preserves over-limit text in the draft", () => {
  const title = "🎉".repeat(limits.title) + "x";
  const draft = { ...newPromo("id", ""), title };
  assert.equal(countCharacters(title), limits.title + 1);
  assert.equal(firstPromoError(draft), "offer");
  const edited = { ...draft, offer: "Dos por uno" };
  assert.equal(firstPromoError(edited), "title");
  assert.equal(promoErrors(edited).title, "Reduce el texto a 64 caracteres.");
  assert.equal(readLibrary(JSON.stringify(savePromo(emptyLibrary, edited))).promos[0].title, title);
  assert.equal(isReady({ ...edited, title: "🎉".repeat(limits.title) }), true);
  assert.equal(firstPromoError({ ...edited, title: "Título", description: "x".repeat(145) }), "description");
});

test("preview and export data omit empty optional fields and preserve long text", () => {
  const promo = { ...newPromo("id", "  "), title: "W".repeat(64), offer: " Sale " };
  assert.deepEqual(promoCardData(promo), {
    title: promo.title, offer: "Sale", description: "", businessName: "", expirationLabel: "",
    template: "signature", color: "grape", photo: null,
  });
  const photo = "93478521-ef05-4a37-a8da-2562d31da0dd.jpg";
  const withPhoto = promoCardData({ ...promo, expiration: "2027-01-01", description: "W".repeat(144), photo });
  assert.equal(withPhoto.description.length, 144);
  assert.equal(withPhoto.expirationLabel, "01/01/2027");
  assert.equal(withPhoto.photo, photo);
});

test("autosave preserves ordering and coalesces queued snapshots to the latest revision", async () => {
  const written = [];
  const first = newPromo("id", "Negocio", 1);
  let release;
  const gate = new Promise((resolve) => { release = resolve; });
  const write = createLibraryWriter(async (value) => {
    const [{ title }] = readLibrary(value).promos;
    written.push(title);
    if (title === "A") await gate;
  });
  const save = (title) => write(savePromo(emptyLibrary, { ...first, title }));
  const pending = [save("A"), save("B"), save("C")];
  assert.deepEqual(written, ["A"]);
  release();
  await Promise.all(pending);
  assert.deepEqual(written, ["A", "C"]);
});

test("a storage failure can retry the full in-memory snapshot", async () => {
  const current = savePromo(emptyLibrary, { ...newPromo("id", "Negocio", 1), title: "Último cambio" });
  let shouldFail = true;
  let stored = null;
  const write = createLibraryWriter(async (value) => {
    if (shouldFail) throw new Error("Storage error");
    stored = value;
  });
  await assert.rejects(write(current), /Storage error/);
  assert.equal(stored, null);
  shouldFail = false;
  await write(current);
  assert.deepEqual(readLibrary(stored), current);
});
