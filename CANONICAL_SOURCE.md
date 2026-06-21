# Canonical Source — Design Router

**`src/design_router_mcp/` is the one canonical tree.** It is the tree imported by tests, run by
the CLI, exposed by the MCP server, and packaged. All real changes go here.

| Tree | Status | Role |
|---|---|---|
| `src/design_router_mcp/` | **CANONICAL** | runtime + package (`pyproject.toml` builds from `src`), tests (`tests_rebuild/conftest.py` adds `src` to `sys.path`), CLI, MCP server |
| `src_rebuild/` | **REMOVED FROM PUBLIC SNAPSHOT** | legacy mirror from the local working tree; intentionally not published |
| `rebuild_package/design_router_mcp/` | **REMOVED FROM PUBLIC SNAPSHOT** | legacy mirror from the local working tree; intentionally not published |

## Public Snapshot Note
This repository intentionally excludes non-public handoffs, local caches, raw donor history, and
deprecated mirror trees. The clean public surface is `src/design_router_mcp/`, `goldensets/`, the
package metadata, docs, and smoke tests.

## Build / packaging
- Canonical build config: **`pyproject.toml`** (package-dir `{"" = "src"}`).
- No rebuild/mirror package is shipped in this public snapshot.

## Tool contract (current)
Real MCP tools (9): `resolve_design_context`, `inspect_design_library`, `get_source_excerpt`,
`export_opencode_bundle`, `route_alternatives`, `donor_starvation_audit`, `code_density_metrics`,
`audit_source_hygiene`, `validate_design_router`.

Deprecated / historical names (do not use): `design_context_resolve`, `list_design_packs`,
`get_pattern_summary`, `get_minimal_code`, `get_preview_images`.

## Run from the canonical tree
```bash
PYTHONPATH=src .venv/bin/python -m design_router_mcp.cli --repo-root . validate
PYTHONPATH=src .venv/bin/python -m pytest -q
```
