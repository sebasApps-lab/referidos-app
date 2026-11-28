import assert from "node:assert/strict";
import { test } from "node:test";
import { loadComponentMap, matchesAnyGlob, parseChangedFilesWithStatus } from "./shared.mjs";

test("preserves accented documentation paths without Git quoting", () => {
  const path = "Documentación para mí/16-cierre-atomico-y-recuperacion-ops.md";
  const changes = parseChangedFilesWithStatus(["A", path, ""].join("\0"));
  assert.deepEqual(changes, [{ path, status: "A" }]);
  assert.equal(matchesAnyGlob(changes[0].path, loadComponentMap().docOnlyGlobs), true);
});

test("retains rename, copy, and type-change semantics with NUL-separated paths", () => {
  const changes = parseChangedFilesWithStatus([
    "R100", "old\tfile.md", "new\nfile.md", "C100", "source.js", "copy.js", "T", "mode.js", "",
  ].join("\0"));
  assert.deepEqual(changes, [
    { path: "old\tfile.md", status: "D" }, { path: "new\nfile.md", status: "A" },
    { path: "copy.js", status: "A" }, { path: "mode.js", status: "M" },
  ]);
  assert.throws(() => parseChangedFilesWithStatus("R100\0old.md\0"), /Missing Git rename/);
});
