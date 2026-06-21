from __future__ import annotations

import json
import sqlite3
from dataclasses import dataclass
from pathlib import Path

from .schemas import PackManifest


@dataclass(frozen=True)
class PackIndexRecord:
    manifest: PackManifest
    pack_dir: Path
    manifest_path: Path
    manifest_mtime_ns: int

    @property
    def pack_id(self) -> str:
        return self.manifest.pack_id

    @property
    def role(self) -> str:
        return self.manifest.role


class RepositoryIndex:
    def __init__(self, repo_root: Path, records: list[PackIndexRecord]) -> None:
        self.repo_root = repo_root
        self.records = sorted(records, key=lambda r: (r.manifest.role, r.manifest.pack_id))
        self.by_id = {record.manifest.pack_id: record for record in self.records}

    @property
    def anchors(self) -> list[PackIndexRecord]:
        return [record for record in self.records if record.manifest.role == "anchor"]

    @property
    def support_banks(self) -> list[PackIndexRecord]:
        return [record for record in self.records if record.manifest.role == "support_bank"]

    def get(self, pack_id: str) -> PackIndexRecord:
        try:
            return self.by_id[pack_id]
        except KeyError as exc:
            raise KeyError(f"Unknown pack_id '{pack_id}'") from exc

    def to_summary(self) -> list[dict]:
        rows: list[dict] = []
        for record in self.records:
            manifest = record.manifest
            rows.append(
                {
                    "pack_id": manifest.pack_id,
                    "role": manifest.role,
                    "family": manifest.family,
                    "surfaces": manifest.surfaces,
                    "tones": manifest.tones,
                    "motif_tags": manifest.motif_tags,
                    "supports_tasks": manifest.supports_tasks,
                    "token_budget_hint": manifest.token_budget_hint,
                    "confidence_score": manifest.confidence_score,
                    "screenshot_count": len(manifest.screenshot_paths),
                    "example_count": len(manifest.example_ids),
                    "pack_dir": str(record.pack_dir),
                }
            )
        return rows


def find_goldensets_root(repo_root: Path) -> Path:
    candidates = [
        repo_root / "goldensets",
        repo_root / "src" / "design_router_mcp" / "goldensets",
        repo_root / "src" / "goldensets",
    ]
    for candidate in candidates:
        if candidate.is_dir():
            return candidate
    return candidates[0]


def discover_manifest_paths(repo_root: Path) -> list[Path]:
    root = find_goldensets_root(repo_root)
    if not root.exists():
        return []
    return sorted(path for path in root.rglob("manifest.json") if path.is_file())


def _read_record(path: Path) -> PackIndexRecord:
    text = path.read_text(encoding="utf-8")
    manifest = PackManifest.model_validate_json(text)
    return PackIndexRecord(
        manifest=manifest,
        pack_dir=path.parent,
        manifest_path=path,
        manifest_mtime_ns=path.stat().st_mtime_ns,
    )


def _cache_path(repo_root: Path) -> Path:
    return repo_root / ".design_router" / "index.sqlite"


def _load_from_sqlite(repo_root: Path, manifest_paths: list[Path]) -> RepositoryIndex | None:
    cache = _cache_path(repo_root)
    if not cache.exists():
        return None
    try:
        expected = {str(path.resolve()): path.stat().st_mtime_ns for path in manifest_paths}
        with sqlite3.connect(cache) as db:
            rows = db.execute("select manifest_path, manifest_mtime_ns, pack_dir, manifest_json from packs").fetchall()
        if len(rows) != len(expected):
            return None
        records: list[PackIndexRecord] = []
        for manifest_path, mtime, pack_dir, manifest_json in rows:
            if expected.get(manifest_path) != int(mtime):
                return None
            records.append(
                PackIndexRecord(
                    manifest=PackManifest.model_validate_json(manifest_json),
                    pack_dir=Path(pack_dir),
                    manifest_path=Path(manifest_path),
                    manifest_mtime_ns=int(mtime),
                )
            )
        return RepositoryIndex(repo_root=repo_root, records=records)
    except (OSError, sqlite3.Error, json.JSONDecodeError, ValueError):
        return None


def write_sqlite_index(index: RepositoryIndex) -> Path:
    cache = _cache_path(index.repo_root)
    cache.parent.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(cache) as db:
        db.execute(
            "create table if not exists packs (pack_id text primary key, role text, manifest_path text, manifest_mtime_ns integer, pack_dir text, manifest_json text)"
        )
        db.execute("delete from packs")
        for record in index.records:
            db.execute(
                "insert into packs values (?, ?, ?, ?, ?, ?)",
                (
                    record.manifest.pack_id,
                    record.manifest.role,
                    str(record.manifest_path.resolve()),
                    record.manifest_mtime_ns,
                    str(record.pack_dir.resolve()),
                    record.manifest.model_dump_json(),
                ),
            )
        db.commit()
    return cache


def build_repository_index(repo_root: Path | str, *, use_sqlite: bool = True, refresh: bool = False) -> RepositoryIndex:
    root = Path(repo_root).expanduser().resolve()
    manifest_paths = discover_manifest_paths(root)
    if use_sqlite and not refresh:
        cached = _load_from_sqlite(root, manifest_paths)
        if cached is not None:
            return cached
    records = [_read_record(path) for path in manifest_paths]
    index = RepositoryIndex(repo_root=root, records=records)
    if use_sqlite:
        write_sqlite_index(index)
    return index
