"""Deterministic relevance selection for first-party reference atoms.

The shared-atom library is large (foundation tokens + many full components). A
weak local model should not be handed all of them at once, nor an arbitrary
alphabetical slice. This module scores each atom's ``meta.json``-derived metadata
against the request (surface / inferred ux_roles / tone / tags+motifs) and returns
a stable, mode-scaled selection.

Rules:
- ``foundation_design_tokens_v1`` is ALWAYS included first (the token contract every
  other component reads from).
- Meta atoms are ranked by a deterministic score; ties break on ``atom_id``.
- Legacy atoms (no ``meta.json``) are selectable only as lower-priority fallback,
  after every positively-scored meta atom.
- No randomness anywhere: same inputs -> same ordered output.
"""

from __future__ import annotations

from .schemas import AtomSnippet

FOUNDATION_ATOM_ID = "foundation_design_tokens_v1"

# Per-mode count of atoms surfaced in the Reusable Component Library (includes the
# always-on foundation atom). Tuned so a weak model sees the token contract plus a
# handful of full components at compact, scaling up for larger budgets.
_MODE_ATOM_BUDGET = {
    "library_audit": 0,
    "micro": 2,        # foundation + 1 reference
    "compact": 5,      # foundation + ~4 relevant components
    "standard": 9,
    "expanded": 14,
    "full_selected": 20,
}

# Scoring weights (deterministic integers).
_W_SURFACE_EXACT = 6
_W_SURFACE_WILDCARD = 2
_W_UX_ROLE = 8
_W_TAG = 3
_W_TONE = 2
_W_META_BASE = 1       # any meta atom gets a small floor so it outranks legacy
_W_LEGACY_BASE = 0     # legacy (no-meta) atoms are pure fallback


def atom_budget_for_mode(mode: str) -> int:
    return _MODE_ATOM_BUDGET.get(str(mode), _MODE_ATOM_BUDGET["compact"])


def _surface_score(atom: AtomSnippet, surface: str) -> int:
    if not atom.surfaces:
        return 0
    surface = (surface or "").lower()
    family = surface.split(".", 1)[0] if surface else ""
    best = 0
    for raw in atom.surfaces:
        s = raw.lower()
        if not s:
            continue
        if s == surface:
            best = max(best, _W_SURFACE_EXACT)
        elif s.endswith(".*") and family and s.startswith(family):
            best = max(best, _W_SURFACE_WILDCARD)
        elif s == f"{family}.*":
            best = max(best, _W_SURFACE_WILDCARD)
    return best


def score_atom(
    atom: AtomSnippet,
    *,
    surface: str,
    request_roles: set[str],
    tone: set[str],
    tag_terms: set[str],
) -> int:
    """Deterministic relevance score for a single atom against the request."""
    if not atom.has_meta:
        # Legacy atoms carry no metadata; they only ever serve as fallback filler.
        return _W_LEGACY_BASE
    score = _W_META_BASE
    score += _surface_score(atom, surface)
    roles = {r.lower() for r in atom.ux_roles}
    score += _W_UX_ROLE * len(roles.intersection({r.lower() for r in request_roles}))
    atom_tags = {t.lower() for t in atom.tags}
    if atom.category:
        atom_tags.add(atom.category.lower())
    score += _W_TAG * len(atom_tags.intersection({t.lower() for t in tag_terms}))
    atom_tone = {t.lower() for t in atom.tone}
    score += _W_TONE * len(atom_tone.intersection({t.lower() for t in tone}))
    return score


def select_shared_atoms(
    atoms: list[AtomSnippet],
    *,
    mode: str,
    surface: str,
    request_roles: set[str],
    tone: set[str] | list[str] | None = None,
    tag_terms: set[str] | list[str] | None = None,
) -> list[AtomSnippet]:
    """Return a stable, mode-scaled, relevance-ordered atom selection.

    ``foundation_design_tokens_v1`` is always first when present. The remainder are
    the highest-scoring atoms (meta atoms outrank legacy fallback) up to the
    mode budget. Deterministic: identical inputs yield identical ordering.
    """
    limit = atom_budget_for_mode(mode)
    if limit <= 0 or not atoms:
        return []
    tone_set = {t.lower() for t in (tone or [])}
    tag_set = {t.lower() for t in (tag_terms or [])}
    role_set = {r.lower() for r in (request_roles or set())}

    foundation = next((a for a in atoms if a.atom_id == FOUNDATION_ATOM_ID), None)
    rest = [a for a in atoms if a.atom_id != FOUNDATION_ATOM_ID]

    scored = [
        (
            score_atom(a, surface=surface, request_roles=role_set, tone=tone_set, tag_terms=tag_set),
            a,
        )
        for a in rest
    ]
    # Stable: highest score first, then alphabetical atom_id. has_meta floor keeps
    # legacy atoms below any meta atom; meta atoms with zero topical overlap still
    # sort above legacy via the meta base score.
    scored.sort(key=lambda item: (-item[0], item[1].atom_id))

    selected: list[AtomSnippet] = []
    if foundation is not None:
        selected.append(foundation)
    for _, atom in scored:
        if len(selected) >= limit:
            break
        selected.append(atom)
    return selected
