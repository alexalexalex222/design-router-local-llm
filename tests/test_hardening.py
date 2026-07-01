"""Regression locks for router hardening. Several items from the hardening review
are ALREADY implemented in this fork (containment in schemas.py, token-budget
enforcement in the renderer, deterministic pack tie-breaks in router.py). These
tests pin that behavior so a future change cannot silently regress it."""
from pathlib import Path

import pytest
from pydantic import ValidationError

from design_router_mcp.router import DesignRouter
from design_router_mcp.schemas import DesignContextRequest, PackManifest

ROOT = Path(__file__).resolve().parents[1]


# B8 / B1 — path-traversal containment: a poisoned manifest cannot escape its pack.
def test_manifest_rejects_parent_traversal_source_dir():
    with pytest.raises(ValidationError):
        PackManifest(
            pack_id="evil",
            role="support_bank",
            family="app.tool",
            example_ids=["x"],
            source_dirs={"x": "../../../../etc/passwd"},
        )


def test_manifest_rejects_absolute_source_path():
    with pytest.raises(ValidationError):
        PackManifest(
            pack_id="evil2",
            role="anchor",
            family="app.tool",
            source_paths=["/etc/passwd"],
        )


def test_manifest_allows_contained_relative_paths():
    m = PackManifest(
        pack_id="ok",
        role="support_bank",
        family="app.tool",
        example_ids=["x"],
        source_paths=["examples/x.md"],
        source_dirs={"x": "examples/x/source"},
    )
    assert m.source_dirs["x"] == "examples/x/source"


# B5 — deterministic routing: identical request -> identical selection/order.
def test_routing_is_deterministic():
    router = DesignRouter.from_repo(ROOT, refresh_index=False)
    req = DesignContextRequest(
        surface="app.tool",
        task="a kanban board app shell with a sidebar and draggable cards",
        layout_mode="app",
        stack="html_css",
        tone=["restrained", "precise"],
    )
    first = router.route(req)
    second = router.route(req)
    assert first.anchor_pack.manifest.pack_id == second.anchor_pack.manifest.pack_id
    assert first.selected_example_ids == second.selected_example_ids
    assert first.support_bank_score.total == second.support_bank_score.total
