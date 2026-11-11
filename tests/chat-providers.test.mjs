import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createChatProviderRouter } from '../server/chat-providers.mjs';
const messages = [{ role: 'user', content: 'Test question' }];
const success = () => Response.json({ choices: [{ message: { content: 'Test answer' } }] });
const all = { GROQ_API_KEY: 'test-g', GEMINI_API_KEY: 'test-m', OPENROUTER_API_KEY: 'test-o', HF_API_KEY: 'test-h' };

function fixture(env = all, options = {}, replies = []) {
  const calls = [];
  const router = createChatProviderRouter(env, { cooldowns: new Map(), ...options,
    fetchImpl: async (url, request) => {
      calls.push({ url, body: JSON.parse(request.body) });
      const reply = replies.shift();
      return reply ? await reply(url, request) : success();
    },
  });
  return { router, calls };
}

test('default order skips failed providers and stays on the successful provider for later stages', async () => {
  const { router, calls } = fixture(all, {}, [
    () => Response.json({ error: 'quota' }, { status: 429 }),
    () => Response.json({ error: 'credits' }, { status: 402 }),
  ]);
  assert.equal((await router.complete(messages)).provider, 'OpenRouter');
  assert.equal((await router.complete(messages)).provider, 'OpenRouter');
  assert.deepEqual(calls.map((c) => new URL(c.url).hostname), ['api.groq.com', 'generativelanguage.googleapis.com', 'openrouter.ai', 'openrouter.ai']);
  assert.equal(calls[2].body.model, 'openrouter/free');
});

test('missing keys are skipped and an empty configuration is reported', async () => {
  assert.equal(fixture({}).router.hasProviders, false);
  const { router, calls } = fixture({ GEMINI_API_KEY: 'test' });
  assert.equal(router.hasProviders, true);
  assert.equal((await router.complete(messages)).provider, 'Gemini');
  assert.equal(calls.length, 1);
});

test('all providers failing does not loop or return an invented answer', async () => {
  const replies = Array.from({ length: 4 }, () => () => Response.json({ error: 'quota' }, { status: 429 }));
  const { router, calls } = fixture(all, {}, replies);
  const result = await router.complete(messages);
  assert.equal(result.response.status, 429);
  assert.equal(result.data.choices, undefined);
  await router.complete(messages);
  assert.equal(calls.length, 4);
});

test('a network failure advances to the next configured provider', async () => {
  const { router } = fixture(all, {}, [() => { throw new TypeError('offline'); }]);
  assert.equal((await router.complete(messages)).provider, 'Gemini');
});

test('unreadable success and empty output can fail over', async () => {
  const { router } = fixture(all, {}, [
    () => new Response('not json'),
    () => Response.json({ choices: [{ message: { content: '' } }] }),
  ]);
  assert.equal((await router.complete(messages)).provider, 'OpenRouter');
});

test('explicit content filtering is not bypassed by changing providers', async () => {
  const { router, calls } = fixture(all, {}, [() => Response.json({ choices: [{ finish_reason: 'content_filter', message: { content: null } }] })]);
  const result = await router.complete(messages);
  assert.equal(result.provider, 'Groq');
  assert.equal(calls.length, 1);
});

test('ordinary invalid requests do not retry all providers', async () => {
  const { router, calls } = fixture(all, {}, [() => Response.json({ error: 'Invalid request' }, { status: 400 })]);
  assert.equal((await router.complete(messages)).response.status, 400);
  assert.equal(calls.length, 1);
});

test('configured order and provider-specific parameters are respected', async () => {
  const { router, calls } = fixture({ ...all, AI_PROVIDER_ORDER: 'gemini,groq,unknown' });
  await router.complete(messages);
  assert.ok(calls[0].url.includes('googleapis'));
  assert.equal(calls[0].body.model, 'gemini-3.5-flash-lite');
  assert.equal(calls[0].body.reasoning_effort, undefined);
  assert.equal(calls[0].body.max_completion_tokens, undefined);
});

test('Retry-After cooldown skips a failed provider on the next warm-instance request, then expires', async () => {
  const cooldowns = new Map();
  let clock = 1000;
  const options = { cooldowns, now: () => clock };
  const first = fixture(all, options, [() => Response.json({ error: 'quota' }, { status: 429, headers: { 'retry-after': '120' } })]);
  await first.router.complete(messages);
  const second = fixture(all, options);
  assert.equal((await second.router.complete(messages)).provider, 'Gemini');
  clock += 121_000;
  const third = fixture(all, options);
  assert.equal((await third.router.complete(messages)).provider, 'Groq');
});

test('timeouts advance without waiting forever', async () => {
  const { router, calls } = fixture(all, { attemptTimeoutMs: 10 }, [(_url, request) => new Promise((_resolve, reject) => {
    request.signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
  })]);
  assert.equal((await router.complete(messages)).provider, 'Gemini');
  assert.equal(calls.length, 2);
});

test('an expired request budget does not start further provider requests', async () => {
  let time = 0;
  const { router, calls } = fixture(all, { now: () => time, budgetMs: 10 }, [() => {
    time = 11;
    return Response.json({ error: 'busy' }, { status: 503 });
  }]);
  assert.equal((await router.complete(messages)).response.status, 504);
  assert.equal(calls.length, 1);
});

test('each chat stage can bound output tokens across providers', async () => {
  const groq = fixture({ GROQ_API_KEY: 'test' });
  await groq.router.complete(messages, { maxTokens: 1024 });
  assert.equal(groq.calls[0].body.max_completion_tokens, 1024);
  const gemini = fixture({ GEMINI_API_KEY: 'test' });
  await gemini.router.complete(messages, { maxTokens: 1536 });
  assert.equal(gemini.calls[0].body.max_tokens, 1536);
});


test('GPT-OSS gets complete plain-text history as data without replaying assistant envelopes', async () => {
  const conversation = [
    { role: 'system', content: 'Keep citations and answer the latest question.' },
    { role: 'assistant', content: 'Welcome to the reading planner.' },
    { role: 'user', content: 'I have two chapters to read.' },
    { role: 'assistant', content: 'How much time do you have?' },
    { role: 'user', content: 'One hour. Suggest a schedule.' },
  ];
  const { router, calls } = fixture({ GROQ_API_KEY: 'test' }, {}, [(url, request) => {
    const body = JSON.parse(request.body);
    if (body.messages.some((message) => message.role === 'assistant')) {
      return Response.json({ error: 'Invalid assistant envelope' }, { status: 400 });
    }
    return success();
  }]);
  const result = await router.complete(conversation);
  assert.equal(result.response.status, 200);
  assert.deepEqual(calls[0].body.messages[0], conversation[0]);
  const replay = JSON.parse(calls[0].body.messages[1].content.split('Conversation data (JSON):\n')[1]);
  assert.deepEqual(replay, conversation.slice(1));
  assert.equal(calls[0].body.include_reasoning, false);
});

test('conversation adaptation leaves other providers and user-only GPT-OSS requests intact', async () => {
  const { providerMessages } = await import('../server/chat-providers.mjs');
  const history = [{ role: 'user', content: 'Question' }, { role: 'assistant', content: 'Answer' }, ...messages];
  assert.equal(providerMessages('gemini', 'gemini-model', history), history);
  assert.equal(providerMessages('groq', 'llama-3.1-8b-instant', history), history);
  assert.equal(providerMessages('groq', 'openai/gpt-oss-20b', messages), messages);
});
