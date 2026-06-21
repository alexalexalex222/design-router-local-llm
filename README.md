# Design Router Local LLM

Design Router gives coding agents a better starting point for UI work.

Most models can write HTML and CSS, but many of them drift into generic layouts:
big hero, three cards, vague copy, fake stats, and weak mobile states. Design
Router fixes the starting context. It turns a frontend brief into a compact
design packet with a relevant anchor, hard UI rules, proof-safety rules, source
snippets, and layout checks.

This repo is a clean public snapshot of the local-LLM version. It keeps the
runtime, the local MCP server, shared UI atoms, and synthetic public-safe design
packs. Non-public handoffs, old donor history, local caches, and raw transcript
material are intentionally not included.

## What It Does

- Routes a frontend brief to the best available design anchor.
- Produces a markdown packet for a coding agent or local model.
- Pushes hard rules early so weak UI models see them before they start coding.
- Keeps image, proof, and claim rules explicit.
- Supports small-context models with `micro` and `compact` modes.
- Exposes a local MCP server for LM Studio, OpenCode, and other local agents.

## Included Public Packs

- `signalstack_saas_analytics_ink_v1` — B2B SaaS / dashboard landing page.
- `iron_circuit_fight_academy_black_copper_v1` — combat-sports academy page.
- `clear_ridge_water_works_field_blue_v1` — rural water-service page.
- `freezebreeze_live_lab_ice_blue_v1` — live-commerce product education page.

All four are synthetic. They are meant to teach structure, taste, and guardrails
without publishing non-public donor material.

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
