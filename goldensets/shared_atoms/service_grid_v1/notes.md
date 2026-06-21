Use this as the primary below-hero service section atom.

The grid shows 3 service lanes with numbered indices, kicker notes, descriptions, and a bottom metadata row. Each panel has a left accent bar and glass-card styling.

Adopt this structure directly for any local-service homepage. Change the service names, descriptions, and "Best fit" labels to match the business. Keep the 3-column grid, numbered indices, and accent bar.

Do not replace this with a generic three-equal-card row. The panel structure with `.panel-index`, `.panel-note`, and `.panel-meta` is the point.

Add a hover lift + shadow transition to each `.service-panel`:
```css
.service-panel { transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 320ms cubic-bezier(0.16, 1, 0.3, 1); }
.service-panel:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06); }
```
