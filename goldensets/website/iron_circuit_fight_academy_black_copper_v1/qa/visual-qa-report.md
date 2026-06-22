# Visual QA — iron_circuit_fight_academy_black_copper_v1

## Verdict
pass — static + visual

## Evidence
- Render engine: playwright/chromium 147.0.7727.15 (headless), 7 viewports
- Screenshots: `screenshots/*.png` (one per viewport)
- Machine-readable proof: `qa/browser-proof.json`
- Source URL rendered: `source_snapshot/index.html` (file://, fully offline)

## Per-viewport render results
| Viewport | Horizontal overflow | Console errors | External requests | Status |
|---|---|---|---|---|
| desktop-1512 (1512×900) | no overflow | 0 | 0 | pass |
| desktop-1440 (1440×900) | no overflow | 0 | 0 | pass |
| desktop-1280 (1280×800) | no overflow | 0 | 0 | pass |
| tablet-1024 (1024×768) | no overflow | 0 | 0 | pass |
| tablet-768 (768×1024) | no overflow | 0 | 0 | pass |
| mobile-390 (390×844) | no overflow | 0 | 0 | pass |
| mobile-360 (360×780) | no overflow | 0 | 0 | pass |

## Source hygiene + policy (deterministic)
| Check | Result |
|---|---|
| `<img>` tags | 0 |
| external src/href URLs | 0 |
| CSS raster url() | 0 |
| emoji glyphs | 0 |
| lorem ipsum | 0 |
| `<h1>` count | 1 |
| fabricated-claim hits | none |
| a11y structure present | True |
| external browser requests | 0 |
| request failures | 0 |
| blank render viewports | 0 |
| tiny screenshots | 0 |

## Open issues
- None.
