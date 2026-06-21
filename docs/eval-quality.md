# Page Quality Eval

The router and its `tests_rebuild/` suite verify *routing and packet contracts* — that a brief
resolves to a sensible anchor and the packet carries the right rules. Nothing scored the thing
that actually ships: the **generated page**. This harness closes that gap.

It scores a finished HTML page against the same hard rules the packet enforces, and ties each
page back to what the router chose for it.

## What it measures

**Hard-rule policy** (any violation = FAIL):
- raster `<img>/<picture>/<source>` count (packet allows raster only when user-supplied)
- raster CSS `url(...)` assets, and external asset/link refs
- emoji in visible copy (no emoji-as-icons)
- repeated-SVG groups (one decorative SVG reused across sections)
- horizontal overflow at any of 6 viewports
- console / page errors

**Richness signals** (not pass/fail, for A/B and triage): inline-SVG count, section count and
ids, generic `.card` uses, structure markers (timeline/process/proof/grid/stats…), domain-term
hits.

**Fabricated-proof candidates** are reported with surrounding context for human review and are
*not* auto-failed — phrases like "no awards, no invented reviews" legitimately contain the words.
The harness never fabricates a verdict on taste; it flags, you (or a stronger model) judge.

**Route metadata** (when a brief is supplied): anchor, score, vertical, and donor-starvation
status, via the Python CLI — so page quality is read next to route quality.

## Layers

- `quality_scan.js` — `staticScan(html)` (pure string analysis, always runs) and
  `browserScan(htmlPath)` (Playwright across 6 viewports: 1512/1440/1280/1024/768/390).
  If the browser can't launch, `browserScan` returns `{available:false}` so the eval never
  hard-blocks — the static layer still scores.
- `run_quality_eval.js` — discovers/loads pages, runs both layers, writes a per-run
  `results.json` + `report.md` under `evals/reports/<timestamp>/`.

No dependencies beyond `playwright` (already installed) and Node built-ins.

## Usage

```bash
# Auto-scan every generated/*/index.html (full 6-viewport browser pass)
node evals/run_quality_eval.js

# Fast static-only pass (no browser; good for CI)
node evals/run_quality_eval.js --no-browser

# Specific pages, saving 6-viewport screenshots to the report dir
node evals/run_quality_eval.js --shots --pages path/to/index.html another/index.html

# Config-driven: route + A/B (routed vs unrouted baseline) for a brief set
node evals/run_quality_eval.js --config evals/briefs/example.json
```

### Config entry shape

```json
[
  {
    "label": "coffee_ood",
    "html": "generated/coffee-roaster-routed/index.html",
    "brief": "evals/briefs/coffee.request.json",
    "baselineHtml": "generated/coffee-roaster-unrouted/index.html",
    "domainTerms": ["roast", "single origin", "espresso", "brew"]
  }
]
```

With `baselineHtml`, the report adds an A/B table of routed-minus-baseline deltas (raster
images, inline SVG, sections, generic `.card`, domain terms, structure markers). This is the
"does the packet actually help" experiment, reproducible per brief.

## Interpreting a run

`report.md` leads with `N pass / M fail` and a per-page table; failing pages list their exact
violations; A/B blocks show deltas and the route the packet came from. `results.json` has the
full per-viewport detail. The policy layer is deterministic; the richness/claim layers are
inputs to judgment, not a score to optimize blindly.
