import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createLibraryWriter, duplicatePromo, emptyLibrary, formatExpiration, isReady,
  newPromo, photoNames, readLibrary, removePromo, requiredFields, savePromo,
} from "../src/features/promos-beta/promoLibrary.ts";

test("first opening offers an empty library and incomplete drafts survive reopening", () => {
  const library = readLibrary(null);
  assert.deepEqual(library.promos, []);
  const draft = { ...newPromo(""), title: "Oferta del día", businessName: "Café Aurora" };
  const reopened = readLibrary(JSON.stringify(savePromo(library, draft, true)));
  assert.deepEqual(reopened.promos, [draft]);
  assert.equal(newPromo(reopened.businessName).businessName, "Café Aurora");
  assert.equal(savePromo(reopened, { ...draft, businessName: "" }, true).businessName, "");
  assert.deepEqual(requiredFields(reopened.promos[0]), { title: false, offer: true });
  assert.equal(isReady({ ...draft, offer: "  " }), false);
  assert.equal(isReady({ ...draft, offer: "Dos por uno" }), true);
});

test("edits replace the draft and duplication preserves its design with its own identity", () => {
  const draft = newPromo("Mercado", 10);
  const edited = { ...draft, title: "Martes de frutas", offer: "2×1", template: "editorial", color: "forest", updatedAt: 12 };
  const library = savePromo(savePromo(emptyLibrary, draft), edited);
  assert.deepEqual(library.promos, [edited]);
  const copy = duplicatePromo(edited, 15);
  assert.notEqual(copy.id, edited.id);
  assert.equal(copy.updatedAt, 15);
  const both = savePromo(library, copy);
  assert.deepEqual(both.promos, [copy, edited]);
  assert.deepEqual(removePromo(both, edited.id).promos, [copy]);
});

test("photo imports are retained by any draft or copy that references them", () => {
  const photo = "93478521-ef05-4a37-a8da-2562d31da0dd.jpg";
  const promo = { ...newPromo("Panadería"), photo };
  const copy = duplicatePromo(promo);
  const library = readLibrary(JSON.stringify(savePromo(savePromo(emptyLibrary, promo), copy)));
  assert.deepEqual(photoNames(library), [photo]);
  assert.deepEqual(photoNames(removePromo(library, promo.id)), [photo]);
  assert.deepEqual(photoNames(removePromo(removePromo(library, promo.id), copy.id)), []);
});

test("dates preserve their calendar day and damaged files are not treated as an empty library", () => {
  assert.equal(formatExpiration("2027-01-01"), "01/01/2027");
  assert.equal(formatExpiration(null), "");
  assert.throws(() => readLibrary('{"version":2,"promos":[]}'));
  assert.throws(() => readLibrary("invalid"));
  assert.throws(() => readLibrary(JSON.stringify({ ...emptyLibrary, promos: [null] })));
});

test("autosave serializes changes and recovers after a failed write", async () => {
  const written = [];
  const first = newPromo("Negocio", 1);
  const write = createLibraryWriter(async (value) => {
    const [{ title }] = readLibrary(value).promos;
    written.push(title);
    if (title === "B") throw new Error("Storage error");
  });
  const save = (title) => write(savePromo(emptyLibrary, { ...first, title }));
  const results = await Promise.allSettled([save("A"), save("B"), save("C")]);
  assert.deepEqual(results.map(({ status }) => status), ["fulfilled", "rejected", "fulfilled"]);
  assert.deepEqual(written, ["A", "B", "C"]);
});
