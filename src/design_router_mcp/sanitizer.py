from __future__ import annotations

import re
from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class HygieneHit:
    kind: str
    value: str
    start: int
    end: int


PHONE_RE = re.compile(r"(?<![\w])(?:\+?1[\s.\-]?)?(?:\(?\d{3}\)?[\s.\-]?)\d{3}[\s.\-]?\d{4}(?![\w])")
EMAIL_RE = re.compile(r"\b[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}\b", re.IGNORECASE)
HTTP_URL_RE = re.compile(r"https?://[^\s\"')<>]+", re.IGNORECASE)
DOMAIN_RE = re.compile(r"\b(?:www\.)?[a-z0-9][a-z0-9\-]{1,62}\.(?:com|net|org|co|io|biz|info|us)\b", re.IGNORECASE)
MAILTO_RE = re.compile(r"mailto:[^\"'\s<>]+", re.IGNORECASE)
TEL_RE = re.compile(r"tel:[^\"'\s<>]+", re.IGNORECASE)
IMAGE_TAG_RE = re.compile(r"<\s*(?:img|picture|source)\b[^>]*>", re.IGNORECASE | re.DOTALL)
SRCSET_RE = re.compile(r"\s(?:src|srcset)\s*=\s*(['\"])[^'\"]*(?:https?://|data:image|\.jpg|\.jpeg|\.png|\.webp|\.gif)[^'\"]*\1", re.IGNORECASE)
CSS_RASTER_URL_RE = re.compile(r"url\(\s*(['\"]?)(?:https?://|data:image|[^)]*\.(?:jpg|jpeg|png|webp|gif))[^)]*\)", re.IGNORECASE)
STAR_RATING_RE = re.compile(r"(?:\b\d(?:\.\d)?\s*/\s*5\b|\b\d(?:\.\d)?\s*-\s*star\b|\b\d(?:\.\d)?\s*star\b|\bfive\s*star\b|⭐+)", re.IGNORECASE)
YEARS_CLAIM_RE = re.compile(r"\b(?:since\s+\d{4}|\d{1,3}\+?\s+(?:years?|yrs?)(?:\s+of\s+[a-z ]{2,28})?)\b", re.IGNORECASE)
LARGE_PROOF_RE = re.compile(r"\b\d+(?:\.\d+)?\s*k\+?\s+(?:projects?|jobs?|clients?|customers?|moves?|installs?|reviews?)\b", re.IGNORECASE)
AWARD_CLAIM_RE = re.compile(r"\b(?:A\+\s*BBB|BBB|award[-\s]?winning|certified|#\s*1|number\s+one|best[-\s]?rated|top[-\s]?rated|trusted\s+experts?)\b", re.IGNORECASE)
TESTIMONIAL_RE = re.compile(r"\b(?:testimonial|testimonials|review\s+quote|review\s+quotes|reviewer|verified\s+reviews?)\b", re.IGNORECASE)
REVIEW_AUTHOR_RE = re.compile(r"(?:--|—)\s*[A-Z][A-Za-z .'-]{1,40},\s*[A-Z][A-Za-z .'-]{1,40}")

KNOWN_BRAND_TOKENS: tuple[str, ...] = ()

SCAN_PATTERNS: tuple[tuple[str, re.Pattern[str]], ...] = (
    ("tel_link", TEL_RE),
    ("mailto_link", MAILTO_RE),
    ("email", EMAIL_RE),
    ("phone", PHONE_RE),
    ("external_url", HTTP_URL_RE),
    ("domain", DOMAIN_RE),
    ("image_tag", IMAGE_TAG_RE),
    ("image_src", SRCSET_RE),
    ("css_raster_url", CSS_RASTER_URL_RE),
    ("star_rating", STAR_RATING_RE),
    ("years_claim", YEARS_CLAIM_RE),
    ("large_proof_claim", LARGE_PROOF_RE),
    ("award_claim", AWARD_CLAIM_RE),
    ("testimonial", TESTIMONIAL_RE),
    ("review_author", REVIEW_AUTHOR_RE),
)


def _brand_pattern() -> re.Pattern[str]:
    if not KNOWN_BRAND_TOKENS:
        return re.compile(r"(?!x)x")
    escaped = [re.escape(token) for token in KNOWN_BRAND_TOKENS]
    return re.compile(r"\b(?:" + "|".join(escaped) + r")\b", re.IGNORECASE)


BRAND_RE = _brand_pattern()


def scan_source_hygiene(text: str) -> list[HygieneHit]:
    """Return source hygiene hits that should not be handed to local models raw."""

    hits: list[HygieneHit] = []
    for kind, pattern in SCAN_PATTERNS:
        for match in pattern.finditer(text):
            hits.append(HygieneHit(kind=kind, value=match.group(0)[:160], start=match.start(), end=match.end()))
    for match in BRAND_RE.finditer(text):
        hits.append(HygieneHit(kind="brand_identity", value=match.group(0)[:160], start=match.start(), end=match.end()))
    hits.sort(key=lambda hit: (hit.start, hit.end, hit.kind))
    deduped: list[HygieneHit] = []
    seen: set[tuple[str, int, int]] = set()
    for hit in hits:
        key = (hit.kind, hit.start, hit.end)
        if key in seen:
            continue
        seen.add(key)
        deduped.append(hit)
    return deduped


def hygiene_hits_to_dicts(hits: list[HygieneHit], *, limit: int = 20) -> list[dict[str, object]]:
    return [asdict(hit) for hit in hits[:limit]]


def sanitize_source_text(text: str) -> str:
    """Neutralize donor identity, proof claims, and raster/external assets.

    The sanitizer intentionally uses placeholders rather than invented replacement
    copy so packets stay useful without modeling unsafe claims.
    """

    if not text:
        return ""
    sanitized = text
    sanitized = re.sub(r"<\s*picture\b[^>]*>.*?<\s*/\s*picture\s*>", "<!-- SVG/CSS visual required; raster source removed -->", sanitized, flags=re.IGNORECASE | re.DOTALL)
    sanitized = IMAGE_TAG_RE.sub("<!-- SVG/CSS visual required; raster source removed -->", sanitized)
    sanitized = SRCSET_RE.sub("", sanitized)
    sanitized = CSS_RASTER_URL_RE.sub("none", sanitized)
    sanitized = TEL_RE.sub("[PHONE]", sanitized)
    sanitized = MAILTO_RE.sub("[EMAIL]", sanitized)
    sanitized = EMAIL_RE.sub("[EMAIL]", sanitized)
    sanitized = PHONE_RE.sub("[PHONE]", sanitized)
    sanitized = HTTP_URL_RE.sub("[URL]", sanitized)
    sanitized = DOMAIN_RE.sub("[URL]", sanitized)
    sanitized = BRAND_RE.sub("[BUSINESS_NAME]", sanitized)
    sanitized = REVIEW_AUTHOR_RE.sub("[VERIFY_FROM_BRIEF]", sanitized)
    sanitized = STAR_RATING_RE.sub("[VERIFY_FROM_BRIEF]", sanitized)
    sanitized = YEARS_CLAIM_RE.sub("[VERIFY_FROM_BRIEF]", sanitized)
    sanitized = LARGE_PROOF_RE.sub("[VERIFY_FROM_BRIEF]", sanitized)
    sanitized = AWARD_CLAIM_RE.sub("[VERIFY_FROM_BRIEF]", sanitized)
    sanitized = TESTIMONIAL_RE.sub("[VERIFY_FROM_BRIEF]", sanitized)
    return sanitized
