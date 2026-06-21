Apply hover and focus responses to every interactive surface on the page. The minimum interaction density target is 8+ unique `:hover` rules in the shipped CSS.

Use the CSS classes below as starting patterns, then add element-specific hover rules only where they materially improve the page. Focus on the interactive surfaces that actually matter:

- `.service-panel` and any below-fold card → lift + shadow (translateY(-4px), expanded shadow)
- `.proof-card`, `.summary-card`, `.consult-step` → subtle lift or background shift
- Every button (`.btn`, `.btn-primary`, `.btn-secondary`) → magnetic lift + shadow (translateY(-3px))
- Every nav link and text link → underline reveal from left
- `.phone-pill` → border-color shift or background change
- Every row, list item, or table row → background-shift + indent on hover
- Logos, badges, and secondary elements → opacity shift

Do not ship a page where any clickable or tappable element has no hover response.

The interaction system is incomplete when the page lacks meaningful hover and focus responses on the primary interactive surfaces, not when it misses an arbitrary rule count.
