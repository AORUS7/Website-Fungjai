// Require an explicit semantic review plus verbatim evidence from every cited source.
// Search results and model output are untrusted; malformed reviews fail closed.
export function verifiedEvidence(reviewText, reply, excerpts) {
  try {
    const review = JSON.parse(reviewText);
    if (review.supported !== true || review.allClaimsCovered !== true || !Array.isArray(review.evidence)) return false;
    const cited = new Set([...reply.matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1])));
    if (!cited.size || review.evidence.length !== cited.size) return false;
    const checked = new Set();
    for (const item of review.evidence) {
      if (!Number.isInteger(item.source) || !cited.has(item.source) || checked.has(item.source)) return false;
      if (typeof item.quote !== 'string' || item.quote.trim().length < 20) return false;
      if (!excerpts[item.source - 1]?.includes(item.quote)) return false;
      checked.add(item.source);
    }
    return checked.size === cited.size;
  } catch {
    return false;
  }
}
