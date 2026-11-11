const MAX_QUERY_LENGTH = 350;

// Drafting and retrieval are separate: a friendly paragraph is not a search query.
// Keep legacy plain-text responses usable if a provider ignores the JSON format.
export function parseSearchPlan(content) {
  if (typeof content !== 'string' || !content.trim()) return null;
  let draft = content.trim();
  let searchQuery = '';
  const json = draft.replace(/^```(?:json)?\s*\n([\s\S]*?)\n```$/i, '$1');
  try {
    const plan = JSON.parse(json);
    if (typeof plan?.draft !== 'string' || !plan.draft.trim()) return null;
    draft = plan.draft.trim();
    if (typeof plan.searchQuery === 'string') searchQuery = plan.searchQuery.trim();
  } catch {
    // Malformed structured output must not become a search query.
    if (/^[{[]/.test(json)) return null;
  }
  const compact = (searchQuery || draft).replace(/\[\d+\]/g, '')
    .replace(/https?:\/\/\S+/g, '').replace(/\s+/g, ' ').trim();
  // Tavily recommends queries below 400 characters; also bound ignored formats.
  const query = [...compact].slice(0, MAX_QUERY_LENGTH).join('').trim();
  return query ? { draft, query } : null;
}
