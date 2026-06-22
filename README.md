# Design Router Local LLM

Design Router gives coding agents a better starting point for UI work.

Most models can write HTML and CSS, but many of them drift into generic layouts:
big hero, three cards, vague copy, fake stats, and weak mobile states. Design
Router fixes the starting context. It turns a frontend brief into a compact
design packet with a relevant anchor, hard UI rules, proof-safety rules, source
snippets, and layout checks.

This repo is the open-source local-LLM version. It keeps the full canonical MCP
runtime, routing engine, packet renderer, source excerpt loader, validation
checks, shared UI atoms, and the routed goldenset library used by the server.
Non-public handoffs, local caches, old benchmark dumps, scratch scripts, and raw
transcript material are intentionally not included.

## What It Does

- Routes a frontend brief to the best available design anchor.
- Produces a markdown packet for a coding agent or local model.
- Pushes hard rules early so weak UI models see them before they start coding.
- Keeps image, proof, and claim rules explicit.
- Supports small-context models with `micro` and `compact` modes.
- Exposes the full local MCP server for LM Studio, OpenCode, and other local
  agents.

## Included Library

The public repo includes 22 routed packs:

- anchor packs for SaaS dashboards, combat sports, water service, live commerce,
  developer docs, luxury/editorial pages, product/spec pages, interactive
  instruments, finance terminals, garden care, legal/business pages, cabinetry,
  flooring, and related local-service surfaces;
- support banks for GA SMB page structures and the localhost full-site pattern
  bank captured on 2026-06-22;
- shared atoms for navigation, heroes, cards, forms, tabs, FAQs, pricing,
  stats, galleries, footers, and interaction states.

The server uses the same library from `goldensets/` during local development and
from `src/design_router_mcp/goldensets/` when packaged.

## Quick Start

```bash
python -m venv .venv
. .venv/bin/activate
pip install -e ".[dev]"
PYTHONPATH=src python -m design_router_mcp.cli --repo-root . validate
```

Create a packet:

```bash
PYTHONPATH=src python -m design_router_mcp.cli --repo-root . export \
  --surface website.local_service \
  --task "Build a serious martial arts gym homepage" \
  --output-dir /tmp/design-router-packet \
  --token-mode compact \
  --stack html_css
```

Then give `/tmp/design-router-packet/PACKET.md` to your coding agent.

## LM Studio

Point LM Studio's MCP config at the local server:

```json
{
  "mcpServers": {
    "design-router-live": {
      "command": "/absolute/path/to/.venv/bin/design-router-local-llm",
      "args": ["--repo-root", "/absolute/path/to/design-router-local-llm"]
    }
  }
}
```

The main tool is:

```text
resolve_design_context
```

The full MCP server also exposes:

```text
inspect_design_library
get_source_excerpt
export_opencode_bundle
route_alternatives
donor_starvation_audit
code_density_metrics
audit_source_hygiene
validate_design_router
```

For local models, start with `token_mode: "micro"` or `token_mode: "compact"`.
Use `code_profile: "code_first"` when the model needs more concrete HTML/CSS
patterns and less explanation.

## What To Watch Out For

Design Router is not a magic UI generator. It is a context router. The model
still has to build the page, and you still have to verify the result.

Before shipping generated UI, check:

- no fake reviews, fake stats, fake awards, or fake credentials;
- no copied business identity from an anchor pack;
- no external images unless the user supplied them;
- no emoji-as-icons;
- no horizontal overflow on mobile;
- no hidden focus rings;
- no console errors;
- loading, empty, error, hover, focus, and disabled states exist when relevant.

The shortest responsible loop is:

1. Resolve a packet.
2. Generate the page from that packet.
3. Open the page in a real browser.
4. Check desktop and mobile.
5. Fix what is actually broken.

## Why This Exists

This is for people running local or smaller models that are useful at code but
need stronger design rails. The packet gives them taste, constraints, source
shape, and stop signs before they start writing files.
