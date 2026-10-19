import { createHash } from 'node:crypto';

// Best-effort cooldowns for this warm server instance, not a shared quota database.
const warmCooldowns = new Map();
const DEFAULT_ORDER = ['groq', 'gemini', 'openrouter', 'hf'];

export function createChatProviderRouter(env, {
  fetchImpl = (...args) => fetch(...args), now = Date.now,
  cooldowns = warmCooldowns, attemptTimeoutMs = 10_000, budgetMs = 35_000,
} = {}) {
  const definitions = {
    groq: { name: 'Groq', key: env.GROQ_API_KEY, model: env.GROQ_MODEL || 'openai/gpt-oss-20b', url: 'https://api.groq.com/openai/v1/chat/completions' },
    gemini: { name: 'Gemini', key: env.GEMINI_API_KEY, model: env.GEMINI_MODEL || 'gemini-3.5-flash-lite', url: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions' },
    // Explicitly free models; no automatic paid-model fallback.
    openrouter: { name: 'OpenRouter', key: env.OPENROUTER_API_KEY, model: 'openrouter/free', url: 'https://openrouter.ai/api/v1/chat/completions' },
    hf: { name: 'HF', key: env.HF_API_KEY, model: env.HF_MODEL || 'meta-llama/Llama-3.1-8B-Instruct', url: 'https://router.huggingface.co/v1/chat/completions' },
  };
  const requestedOrder = (env.AI_PROVIDER_ORDER || '').toLowerCase().split(',').map((value) => value.trim());
  const providers = [...new Set([...requestedOrder, ...DEFAULT_ORDER])]
    .filter((id) => definitions[id]?.key?.trim())
    .map((id) => ({ id, ...definitions[id], cooldownKey: createHash('sha256').update(`${id}:${definitions[id].model}:${definitions[id].key}`).digest('hex') }));
  let index = 0;
  let activeProvider = providers[0]?.name || 'none';
  let lastFailure;
  const deadline = now() + budgetMs;
  const failure = (status, message, provider = activeProvider) => ({
    response: new Response(null, { status }), data: { error: message }, provider,
  });

  function pause(provider, response) {
    const retry = response.headers?.get('retry-after');
    const seconds = retry ? Number(retry) : NaN;
    const retryMs = Number.isFinite(seconds) ? seconds * 1000 : retry ? Date.parse(retry) - now() : NaN;
    const duration = Number.isFinite(retryMs) && retryMs > 0 ? Math.min(retryMs, 3_600_000)
      : response.status === 429 ? 60_000
      : [401, 402, 403, 404].includes(response.status) ? 300_000 : 10_000;
    // Store only expiry/status, never prompts, answers, or raw credentials.
    cooldowns.set(provider.cooldownKey, { until: now() + duration, status: response.status });
  }

  async function complete(messages) {
    while (index < providers.length) {
      const provider = providers[index];
      activeProvider = provider.name;
      const cooldown = cooldowns.get(provider.cooldownKey);
      if (cooldown?.until > now()) {
        lastFailure = failure(cooldown.status, 'Chat provider is temporarily unavailable', provider.name);
        index++;
        continue;
      }
      cooldowns.delete(provider.cooldownKey);
      const remaining = deadline - now();
      if (remaining <= 0) return failure(504, 'Chat provider request timed out');
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), Math.min(attemptTimeoutMs, remaining));
      let result;
      try {
        const body = { model: provider.model, messages, temperature: 0.2 };
        if (provider.id === 'groq') {
          body.max_completion_tokens = 2048;
          if (provider.model.startsWith('openai/gpt-oss')) body.reasoning_effort = 'low';
        } else {
          body.max_tokens = 2048;
        }
        const response = await fetchImpl(provider.url, {
          method: 'POST', signal: controller.signal,
          headers: { Authorization: `Bearer ${provider.key}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        let data;
        try { data = await response.json(); }
        catch { data = { error: 'Chat provider returned an unreadable response' }; }
        const text = data?.choices?.[0]?.message?.content;
        const filtered = data?.choices?.[0]?.finish_reason === 'content_filter';
        // Do not route around an explicit content-filter refusal.
        if (response.ok && (filtered || (typeof text === 'string' && text.trim()))) {
          return { response, data, provider: provider.name };
        }
        const message = typeof data?.error === 'string' ? data.error : data?.error?.message;
        if (!response.ok && ![401, 402, 403, 404, 408, 429].includes(response.status) && response.status < 500 &&
            !(typeof message === 'string' && /no remaining credits|insufficient credits/i.test(message))) {
          return { response, data, provider: provider.name };
        }
        result = response.ok ? failure(502, 'Chat provider returned no reply', provider.name)
          : { response, data, provider: provider.name };
      } catch {
        result = failure(controller.signal.aborted ? 504 : 503, 'Chat provider is unavailable', provider.name);
      } finally {
        clearTimeout(timer);
      }
      pause(provider, result.response);
      lastFailure = result;
      console.info('Chat provider fallback', { provider: provider.name, status: result.response.status });
      index++;
    }
    return lastFailure || failure(503, 'No chat provider is configured');
  }
  return { hasProviders: providers.length > 0, complete, get provider() { return activeProvider; } };
}
