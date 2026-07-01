Use this as the consultation / CTA section atom near the bottom of the page.

The board has a split layout: left editorial copy with section kicker + heading + paragraph, and a right panel with numbered consultation steps plus a summary card row.

Adopt this structure for any local-service homepage that needs a "how to get started" or "consultation flow" section. Change the step titles, descriptions, and summary card labels to match the business.

Each `.consult-step` has a numbered badge and a description block. The `.consultation-summary` row holds 3 compact summary cards.

Add hover transitions:
```css
.consult-step { transition: background-color 180ms cubic-bezier(0.16, 1, 0.3, 1), padding-left 320ms cubic-bezier(0.16, 1, 0.3, 1); }
.consult-step:hover { background-color: rgba(0, 0, 0, 0.02); padding-left: 6px; }
.summary-card { transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 320ms cubic-bezier(0.16, 1, 0.3, 1); }
.summary-card:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06); }
```
