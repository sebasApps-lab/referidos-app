"""Verify a registered release ZIP and prepare a fresh publish directory."""

import argparse
import contextlib
import hashlib
import os
from pathlib import Path
import re
import stat
import tempfile
import unicodedata
from zipfile import BadZipFile, ZIP_DEFLATED, ZIP_STORED, ZipFile
import zlib


MAX_ARCHIVE_BYTES = 512 * 1024 * 1024
MAX_UNCOMPRESSED_BYTES = 1024 * 1024 * 1024
MAX_ENTRIES = 20_000
MAX_PATH_LENGTH = 512
CHUNK_SIZE = 1024 * 1024
RESERVED_NAME = re.compile(r"^(con|prn|aux|nul|com[1-9¹²³]|lpt[1-9¹²³])$", re.I)
UNPORTABLE_CHARS = re.compile(r'[\\:<>"|?*\x00-\x1f\x7f]')


class ArtifactIntegrityError(Exception):
    """A release archive failed verification or cannot be published safely."""


def archive_size(stream):
    return stream.seek(0, os.SEEK_END)


def archive_sha256(stream):
    stream.seek(0)
    digest = hashlib.sha256()
    for block in iter(lambda: stream.read(CHUNK_SIZE), b""):
        digest.update(block)
    stream.seek(0)
    return digest.hexdigest()


def validate_expectations(checksum, size):
    if not re.fullmatch(r"[a-fA-F0-9]{64}", checksum or ""):
        raise ArtifactIntegrityError("Falta el SHA-256 registrado del ZIP. Regenera el artefacto en Dev.")
    if isinstance(size, bool) or not isinstance(size, int) or not 0 < size <= MAX_ARCHIVE_BYTES:
        raise ArtifactIntegrityError("El tamaño ZIP registrado es inválido o supera el límite de preparación.")


def archive_matches(stream, checksum, size):
    return archive_size(stream) == size and archive_sha256(stream) == checksum.lower()


def valid_parts(name, directory):
    if directory:
        name = name[:-1]
    parts = name.split("/")
    if (
        len(name) > MAX_PATH_LENGTH
        or any(
            not part
            or part in {".", ".."}
            or part.endswith((".", " "))
            or UNPORTABLE_CHARS.search(part)
            or RESERVED_NAME.fullmatch(part.split(".", 1)[0])
            for part in parts
        )
    ):
        raise ArtifactIntegrityError("El ZIP contiene un nombre de ruta inválido para la publicación.")
    return tuple(parts)


def validate_entry(info):
    raw_name = info.orig_filename
    directory = raw_name.endswith("/")
    parts = valid_parts(raw_name, directory)
    file_type = stat.S_IFMT(info.external_attr >> 16) if info.create_system == 3 else 0
    if file_type not in {0, stat.S_IFDIR if directory else stat.S_IFREG}:
        raise ArtifactIntegrityError("El ZIP contiene enlaces o tipos de archivo no admitidos.")
    if info.flag_bits & 1 or info.compress_type not in {ZIP_STORED, ZIP_DEFLATED}:
        raise ArtifactIntegrityError("El ZIP contiene entradas cifradas o de compresión no admitida.")
    if directory and info.file_size:
        raise ArtifactIntegrityError("El ZIP contiene un directorio con contenido de archivo.")
    return parts, directory


def copy_exact(source, destination, expected):
    written = 0
    for block in iter(lambda: source.read(CHUNK_SIZE), b""):
        written += len(block)
        if written > expected:
            raise ArtifactIntegrityError("Una entrada del ZIP excede el tamaño declarado.")
        destination.write(block)
    if written != expected:
        raise ArtifactIntegrityError("Una entrada del ZIP está incompleta.")


@contextlib.contextmanager
def get_release_zip(stream, checksum, size, github_wrapper):
    observed = archive_size(stream)
    if observed > MAX_ARCHIVE_BYTES + (4 * 1024 * 1024 if github_wrapper else 0):
        raise ArtifactIntegrityError("El archivo descargado supera el límite de preparación.")

    if archive_matches(stream, checksum, size):
        yield stream
        return
    if not github_wrapper:
        raise ArtifactIntegrityError("Los bytes descargados no coinciden con el SHA-256 y tamaño registrados.")

    # GitHub stores the registered ZIP as the single payload inside its own ZIP.
    with ZipFile(stream) as wrapper, tempfile.TemporaryFile() as payload:
        entries = wrapper.infolist()
        if len(entries) != 1:
            raise ArtifactIntegrityError("Se esperaba un solo ZIP registrado dentro del artefacto de GitHub.")
        info = entries[0]
        parts, directory = validate_entry(info)
        if directory or len(parts) != 1 or not parts[0].lower().endswith(".zip") or info.file_size != size:
            raise ArtifactIntegrityError("El contenido de GitHub no coincide con el ZIP registrado.")
        with wrapper.open(info) as zipped:
            copy_exact(zipped, payload, size)
        if not archive_matches(payload, checksum, size):
            raise ArtifactIntegrityError("El ZIP de GitHub no coincide con el SHA-256 y tamaño registrados.")
        yield payload


def normalized_parts(parts):
    return tuple(unicodedata.normalize("NFC", part).casefold() for part in parts)


def plan_extraction(archive):
    entries = archive.infolist()
    if not entries or len(entries) > MAX_ENTRIES:
        raise ArtifactIntegrityError("La cantidad de entradas del ZIP es inválida.")

    paths = {}
    explicit = set()
    plan = []
    total_bytes = 0
    index_found = False
    for info in entries:
        parts, directory = validate_entry(info)
        normalized = normalized_parts(parts)
        total_bytes += info.file_size
        if total_bytes > MAX_UNCOMPRESSED_BYTES:
            raise ArtifactIntegrityError("El contenido descomprimido supera el límite de publicación.")
        if normalized in explicit:
            raise ArtifactIntegrityError("El ZIP contiene dos entradas con el mismo destino.")
        explicit.add(normalized)

        for end in range(1, len(parts) + 1):
            key = normalized[:end]
            expected = (parts[:end], directory or end < len(parts))
            previous = paths.setdefault(key, expected)
            if previous != expected:
                raise ArtifactIntegrityError("El ZIP contiene rutas que entran en conflicto.")
        if parts == ("index.html",) and not directory and info.file_size:
            index_found = True
        plan.append((info, parts, directory))

    if not index_found:
        raise ArtifactIntegrityError("El ZIP no contiene un index.html válido en la raíz.")
    return plan


def prepare_artifact(archive, output, checksum, size, *, github_wrapper=False):
    validate_expectations(checksum, size)
    archive = Path(archive)
    output = Path(output)
    if not archive.is_file() or archive.is_symlink():
        raise ArtifactIntegrityError("La entrada debe ser un archivo ZIP local.")
    if not output.parent.is_dir() or output.exists() or output.is_symlink():
        raise ArtifactIntegrityError("El destino debe ser un directorio nuevo dentro de un padre existente.")

    try:
        with archive.open("rb") as stream, get_release_zip(stream, checksum, size, github_wrapper) as verified:
            with ZipFile(verified) as package:
                plan = plan_extraction(package)
                with tempfile.TemporaryDirectory(prefix=".release-", dir=output.parent) as temporary:
                    stage = Path(temporary, "publish")
                    stage.mkdir()
                    for info, parts, directory in plan:
                        destination = stage.joinpath(*parts)
                        if directory:
                            destination.mkdir(parents=True, exist_ok=True)
                        else:
                            destination.parent.mkdir(parents=True, exist_ok=True)
                            with package.open(info) as member, destination.open("xb") as target:
                                copy_exact(member, target, info.file_size)
                    stage.rename(output)
    except (BadZipFile, EOFError, NotImplementedError, zlib.error) as err:
        raise ArtifactIntegrityError("No se pudo leer o verificar la estructura del ZIP.") from err


def main():
    cli = argparse.ArgumentParser(description=__doc__)
    cli.add_argument("--archive", type=Path, required=True)
    cli.add_argument("--output", type=Path, required=True)
    cli.add_argument("--checksum", required=True)
    cli.add_argument("--size", type=int, required=True)
    cli.add_argument("--github-wrapper", action="store_true")
    args = cli.parse_args()
    try:
        prepare_artifact(args.archive, args.output, args.checksum, args.size, github_wrapper=args.github_wrapper)
    except (ArtifactIntegrityError, OSError) as err:
        cli.exit(1, "release_artifact_invalid: " + str(err) + "\n")


if __name__ == "__main__":
    main()
