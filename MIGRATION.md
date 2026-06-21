# Migration Notes

## Drop-in modules

Keep imports like these:

```python
from design_router_mcp.schemas import DesignContextRequest
from design_router_mcp.router import DesignRouter
from design_router_mcp.render_context import build_context_packet
from design_router_mcp.pack_loader import load_repository_packs
```

The rebuild still supports them. New code should prefer:

```python
from design_router_mcp.service import resolve_design_context
```

## Request schema

The original fields are preserved. Optional additions:

- `token_mode`: `library_audit`, `micro`, `compact`, `standard`, `expanded`, `full_selected`
- `local_model_profile`: `tiny_16k`, `balanced_32k`, `strong_64k`, `moe_128k`, `manual`
- `route_profile` now defaults to `data_driven_v2`
- `packet_profile` now defaults to `compact_v2`

Old values such as `hybrid_survivor_v1` and `current_source_first_v1` still validate.

## Routing rules

Hardcoded routing tables are replaced by JSON. Rule lookup order:

1. `DESIGN_ROUTER_RULES`
2. `<repo>/design_router_rules.json`
3. `<repo>/routing_rules.json`
4. `<repo>/goldensets/routing_rules.json`
5. packaged `defaults/routing_rules.default.json`

## Indexing

The router indexes only manifests at startup. The SQLite cache is stored at:

```text
<repo>/.design_router/index.sqlite
```

Source files are not loaded until after route selection.

## MCP tools

Removed as first-class MCP tools:

- `inventory_website_corpus`
- `list_design_packs`
- `list_examples`
- `get_pattern_summary`
- `get_minimal_code`
- `get_preview_images`
- `get_prompt_recipe`
- `expand_packet`

They collapse into:

- `inspect_design_library`
- `get_source_excerpt`
- `resolve_design_context`

Expansion is just another `resolve_design_context` call with a larger `token_mode`.
