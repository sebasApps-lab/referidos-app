"""Local tests for the verified release extraction step."""

import hashlib
import importlib.util
from pathlib import Path
import tempfile
import unittest
from zipfile import ZipFile, ZIP_DEFLATED


SOURCE = Path(__file__).with_name("prepare-release-artifact.py")
SPEC = importlib.util.spec_from_file_location("prepare_release_artifact", SOURCE)
VERIFY = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VERIFY)


class ReleaseArchiveTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name)
        self.output = self.root / "publish"

    def archive(self, name, files):
        target = self.root / name
        with ZipFile(target, "w", compression=ZIP_DEFLATED) as bundle:
            for path, contents in files.items():
                bundle.writestr(path, contents)
        return target

    def web_zip(self):
        return self.archive("release.zip", {
            "index.html": b"<!doctype html>",
            "assets/main.js": b"export const ready = true;",
            "assets/main.js.map": b"{}",
        })

    def verify(self, archive, expected=None, *, github_wrapper=False, checksum=None, size=None):
        data = (expected or archive).read_bytes()
        VERIFY.prepare_artifact(
            archive,
            self.output,
            checksum if checksum is not None else hashlib.sha256(data).hexdigest(),
            size if size is not None else len(data),
            github_wrapper=github_wrapper,
        )

    def test_verifies_and_extracts_storage_zip(self):
        archive = self.web_zip()
        self.verify(archive)
        self.assertEqual((self.output / "index.html").read_bytes(), b"<!doctype html>")
        self.assertEqual((self.output / "assets/main.js").read_bytes(), b"export const ready = true;")
        self.assertTrue((self.output / "assets/main.js.map").is_file())

    def test_verifies_single_github_wrapped_zip(self):
        inner = self.web_zip()
        outer = self.archive("github.zip", {"release.zip": inner.read_bytes()})
        self.verify(outer, inner, github_wrapper=True)
        self.assertTrue((self.output / "index.html").is_file())
        self.assertFalse((self.output / "release.zip").exists())

    def test_github_archive_can_be_the_registered_zip_without_wrapper(self):
        self.verify(self.web_zip(), github_wrapper=True)
        self.assertTrue((self.output / "index.html").is_file())

    def test_refuses_wrong_size_or_checksum_before_writing(self):
        archive = self.web_zip()
        for expectations in ({"size": 1}, {"checksum": "1" * 64}):
            with self.subTest(expectations=expectations):
                with self.assertRaisesRegex(VERIFY.ArtifactIntegrityError, "no coinciden"):
                    self.verify(archive, **expectations)
                self.assertFalse(self.output.exists())

    def test_refuses_ambiguous_wrapper(self):
        inner = self.web_zip()
        outer = self.archive("github.zip", {"release.zip": inner.read_bytes(), "other.txt": b"unexpected"})
        with self.assertRaisesRegex(VERIFY.ArtifactIntegrityError, "un solo ZIP"):
            self.verify(outer, inner, github_wrapper=True)
        self.assertFalse(self.output.exists())

    def test_refuses_case_conflicts_and_missing_index_without_partial_result(self):
        for name, files, reason in (
            ("collision.zip", {"index.html": b"yes", "Assets/a.js": b"a", "assets/b.js": b"b"}, "conflicto"),
            ("no-index.zip", {"assets/main.js": b"yes"}, "index.html"),
        ):
            with self.subTest(name=name):
                with self.assertRaisesRegex(VERIFY.ArtifactIntegrityError, reason):
                    self.verify(self.archive(name, files))
                self.assertFalse(self.output.exists())

    def test_does_not_replace_existing_output(self):
        archive = self.web_zip()
        self.output.mkdir()
        marker = self.output / "previous.txt"
        marker.write_bytes(b"previous")
        with self.assertRaisesRegex(VERIFY.ArtifactIntegrityError, "destino"):
            self.verify(archive)
        self.assertEqual(marker.read_bytes(), b"previous")


if __name__ == "__main__":
    unittest.main()
