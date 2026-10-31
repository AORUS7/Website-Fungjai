import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/chat.ts';
import { immediateSupportReply } from '../src/lib/chat-support.mjs';

const draft = 'ลองแบ่งงานเป็นช่วงสั้น ๆ และพักสายตาระหว่างช่วง';
const evidence = [1, 2, 3].map((n) => ({ title: `Evidence ${n}`, url: `https://example.org/evidence-${n}`, content: `Evidence excerpt ${n}: supporting passage for the test claim.` }));
let keyCounter = 0;
const completion = (content) => ({ choices: [{ message: { content } }] });

async function run(steps, { hf = false, text = 'ผู้ใช้เล่าว่ามีปัญหาเรื่องเพื่อน', unconfigured = false, history = [], gemini = false, openrouter = false, groq = true, order = 'hf,groq,gemini,openrouter' } = {}) {
  const originalFetch = globalThis.fetch;
  const keys = ['HF_API_KEY', 'GROQ_API_KEY', 'TAVILY_API_KEY', 'GEMINI_API_KEY', 'OPENROUTER_API_KEY', 'AI_PROVIDER_ORDER'];
  const previous = keys.map((key) => process.env[key]);
  keys.forEach((key) => delete process.env[key]);
  const fakeKey = `test-only-${++keyCounter}`;
  if (hf) process.env.HF_API_KEY = fakeKey;
  if (groq) process.env.GROQ_API_KEY = fakeKey;
  if (gemini) process.env.GEMINI_API_KEY = fakeKey;
  if (openrouter) process.env.OPENROUTER_API_KEY = fakeKey;
  process.env.TAVILY_API_KEY = fakeKey;
  process.env.AI_PROVIDER_ORDER = order;
  if (unconfigured) keys.forEach((key) => delete process.env[key]);
  const calls = [];
  globalThis.fetch = async (url, options) => {
    const body = JSON.parse(options.body);
    const isReview = body.messages?.[0]?.content.includes('คุณเป็นผู้ตรวจหลักฐาน');
    const explicitReview = steps[calls.length]?.review;
    if (isReview && !explicitReview) {
      const { answer } = JSON.parse(body.messages[1].content);
      const ids = [...new Set([...answer.matchAll(/\[(\d+)\]/g)].map((m) => Number(m[1])))];
      return { ok: true, status: 200, json: async () => completion(JSON.stringify({
        supported: true, allClaimsCovered: true,
        evidence: ids.map((source) => ({ source, quote: evidence[source - 1].content })),
      })) };
    }
    const step = steps[calls.length];
    assert.ok(step, `Unexpected extra request: ${url}`);
    const call = { url, body: JSON.parse(options.body) };
    calls.push(call);
    assert.ok(url.includes(step.service), `${url} should be ${step.service}`);
    return { ok: (step.status || 200) < 400, status: step.status || 200, json: async () => step.data };
  };
  const res = { code: 0, payload: null, status(code) { this.code = code; return this; }, json(payload) { this.payload = payload; return this; } };
  try {
    await handler({ method: 'POST', body: { messages: [
      { role: 'assistant', content: 'คำตอบเก่าที่อ้างอิง [9]' },
      ...history,
      { role: 'user', content: text },
    ] } }, res);
    assert.equal(calls.length, steps.length);
    return { calls, ...res };
  } finally {
    globalThis.fetch = originalFetch;
    keys.forEach((key, i) => previous[i] === undefined ? delete process.env[key] : process.env[key] = previous[i]);
  }
}
const model = (text) => ({ service: 'groq', data: completion(text) });
const search = { service: 'tavily', data: { results: evidence } };

test('search follows the AI draft, then returns only citations used in its final answer', async () => {
  const result = await run([model(draft), search, model('ลองแบ่งงานและพักระหว่างช่วง [3]')]);
  assert.equal(result.code, 200);
  assert.equal(result.calls[1].body.query, draft);
  assert.notEqual(result.calls[1].body.query, 'ผู้ใช้เล่าว่ามีปัญหาเรื่องเพื่อน');
  assert.ok(result.calls[2].body.messages[0].content.includes('Evidence excerpt 3'));
  assert.ok(result.calls[2].body.messages.at(-1).content.includes(draft));
  assert.equal(result.payload.reply, 'ลองแบ่งงานและพักระหว่างช่วง [1]');
  assert.deepEqual(result.payload.sources, [{ title: evidence[2].title, url: evidence[2].url }]);
});

test('renumbers gaps and repeated citations without changing their evidence', async () => {
  const result = await run([model(draft), search, model('คำแนะนำ ก [3] และ ข [1] แล้ว ก อีกครั้ง [3]')]);
  assert.equal(result.payload.reply, 'คำแนะนำ ก [2] และ ข [1] แล้ว ก อีกครั้ง [2]');
  assert.deepEqual(result.payload.sources.map((s) => s.url), [evidence[0].url, evidence[2].url]);
});

test('never appends arbitrary sources when both attempts omit citations', async () => {
  const result = await run([model(draft), search, model('ลองแบ่งเวลาเรียนเพื่อช่วยให้มีสมาธิ'), model('ลองแบ่งเวลาเรียนเพื่อช่วยให้มีสมาธิ')]);
  assert.equal(result.code, 502);
  assert.equal(result.payload.code, 'CHAT_CITATIONS_MISSING');
  assert.equal(result.payload.sources, undefined);
  assert.equal(result.payload.reply, undefined);
});

test('selects sources from the repaired final answer rather than the invalid original', async () => {
  const result = await run([model(draft), search, model('คำแนะนำ [9]'), model('คำแนะนำที่ตรวจแล้ว [2]')]);
  assert.equal(result.code, 200);
  assert.equal(result.payload.reply, 'คำแนะนำที่ตรวจแล้ว [1]');
  assert.deepEqual(result.payload.sources.map((s) => s.url), [evidence[1].url]);
});

test('rejects citations that remain invalid after the bounded repair', async () => {
  const result = await run([model(draft), search, model('คำแนะนำ [9]'), model('คำแนะนำ [8]')]);
  assert.equal(result.code, 502);
  assert.equal(result.payload.sources, undefined);
});

test('retains the HF credit fallback for both drafting and final grounding', async () => {
  const result = await run([
    { service: 'huggingface', status: 402, data: { error: 'No remaining credits' } },
    model(draft), search, model('คำแนะนำ [1]'),
  ], { hf: true });
  assert.equal(result.code, 200);
  assert.equal(result.calls.filter((call) => call.url.includes('huggingface')).length, 1);
});

test('a failed draft keeps the existing rate-limit response and never searches user text', async () => {
  const result = await run([{ service: 'groq', status: 429, data: { error: 'Busy' } }]);
  assert.equal(result.code, 429);
  assert.equal(result.payload.code, 'CHAT_RATE_LIMITED');
});

test('an empty draft stops before retrieval', async () => {
  const result = await run([model('  ')]);
  assert.equal(result.code, 502);
});

test('search failure does not publish the unchecked AI draft', async () => {
  const result = await run([model(draft), { service: 'tavily', status: 503, data: { error: 'Unavailable' } }]);
  assert.equal(result.code, 502);
  assert.equal(result.payload.reply, undefined);
});


test('repairs missing citations on a follow-up like the study advice in the screenshot', async () => {
  const uncited = '1. แบ่งเวลาเรียนเป็นช่วงสั้น ใช้ Pomodoro 25 นาที พัก 5 นาที ช่วยให้มีสมาธิ\n2. ทำรายการงานและตั้งเป้าหมายเล็ก ๆ\n3. หาเวลาพักผ่อนและออกกำลังกาย';
  const result = await run([model(draft), search, model(uncited), model('ลองแบ่งเวลาเรียนเป็นช่วงสั้นและพักระหว่างช่วง [2]')]);
  assert.equal(result.code, 200);
  assert.ok(result.calls[3].body.messages.at(-1).content.includes('หากไม่มีเลขอ้างอิง'));
  assert.equal(result.payload.reply, 'ลองแบ่งเวลาเรียนเป็นช่วงสั้นและพักระหว่างช่วง [1]');
  assert.deepEqual(result.payload.sources.map((s) => s.url), [evidence[1].url]);
});

test('old assistant citation numbers are removed from both draft and grounding history', async () => {
  const result = await run([model(draft), search, model('คำแนะนำ [1]')]);
  for (const call of [result.calls[0], result.calls[2]]) {
    const previous = call.body.messages.find((m) => m.role === 'assistant');
    assert.ok(previous);
    assert.ok(!previous.content.includes('[9]'));
  }
});


test('simple greetings, thanks, acknowledgements and listening do not call AI or search', async () => {
  for (const text of ['สวัสดี', 'สวัสดีค่ะ 🤍', 'หวัดดีครับ', 'hello!', 'ขอบคุณมากค่ะ', 'ขอบคุณที่รับฟังนะคะ', 'โอเคครับ', 'ฝันดีนะ', 'อยากระบายค่ะ', 'มีคนฟังไหม', 'วันนี้เหนื่อย']) {
    const result = await run([], { text, unconfigured: true });
    assert.equal(result.code, 200, text);
    assert.deepEqual(result.payload.sources, [], text);
    assert.ok(!/\[\d+\]|https?:|Pomodoro|4.?7.?8/.test(result.payload.reply), text);
    assert.ok(result.payload.reply.length < 160, text);
    assert.equal(result.calls.length, 0, text);
  }
});

test('a greeting combined with an advice request still requires evidence', async () => {
  const result = await run([model(draft), search, model('ลองแบ่งงานเป็นช่วงสั้น ๆ [2]')], {
    text: 'สวัสดี เครียดเรื่องเรียน ทำยังไงดี',
  });
  assert.equal(result.code, 200);
  assert.equal(result.calls.length, 3);
  assert.deepEqual(result.payload.sources.map((s) => s.url), [evidence[1].url]);
});

test('thanks combined with a factual question cannot bypass citation validation', async () => {
  const result = await run([model(draft), search, model('คำแนะนำที่ไม่มีอ้างอิง'), model('คำแนะนำที่ยังไม่มีอ้างอิง')], {
    text: 'ขอบคุณค่ะ การหายใจแบบ 4-7-8 ช่วยอะไร',
  });
  assert.equal(result.code, 502);
  assert.equal(result.payload.code, 'CHAT_CITATIONS_MISSING');
});


test('self-harm requests receive immediate safety support without API credentials or retrieval', async () => {
  for (const text of ['ขอวิธีฆ่าตัวตายค่ะ', 'อยากตาย', 'ไม่อยากอยู่แล้ว', 'อยากทำร้ายตัวเอง', 'อยากทําร้ายตัวเอง', 'I want to kill myself']) {
    const result = await run([], { text, unconfigured: true });
    assert.equal(result.code, 200, text);
    assert.deepEqual(result.payload.sources, []);
    assert.ok(result.payload.reply.includes('ปลอดภัย'));
    assert.ok(result.payload.reply.includes('ห้องฉุกเฉิน'));
    assert.ok(!/การเชื่อมต่อ|CHAT_|https?:|\[\d+\]/.test(result.payload.reply));
    assert.equal(result.calls.length, 0);
  }
});

test('a vague follow-up to a self-harm request retains safety context', async () => {
  const history = [{ role: 'user', content: 'ขอวิธีฆ่าตัวตายค่ะ' }, { role: 'assistant', content: 'ตอนนี้คุณปลอดภัยไหมคะ' }];
  const result = await run([], { text: 'บอกได้ไหมคะ', history, unconfigured: true });
  assert.equal(result.code, 200);
  assert.ok(result.payload.reply.includes('จะไม่บอกวิธีทำร้ายตัวเอง'));
});

test('the client-shared support handler is usable without network access', () => {
  const reply = immediateSupportReply([{ role: 'user', content: 'ขอวิธีฆ่าตัวตายค่ะ' }]);
  assert.ok(reply.includes('คนที่ไว้ใจได้'));
  assert.ok(reply.includes('อยู่คนเดียวไหม'));
});

test('sadness like both screenshot messages receives listening without provider calls', async () => {
  for (const text of ['เศร้าค่ะ', 'เศร้ามาก', 'เครียดมาก', 'เหงาค่ะ', 'ท้อมาก']) {
    const result = await run([], { text, unconfigured: true });
    assert.equal(result.code, 200);
    assert.deepEqual(result.payload.sources, []);
    assert.ok(!/ขีดจำกัด|ใช้งานแชตจำนวนมาก|การเชื่อมต่อ/.test(result.payload.reply));
    assert.equal(result.calls.length, 0);
  }
});

test('past self-harm context does not force unrelated factual questions into the fallback', async () => {
  const result = await run([model(draft), search, model('คำแนะนำ [1]')], {
    text: 'ควรแบ่งเวลาเรียนอย่างไร', history: [{ role: 'user', content: 'อยากตาย' }],
  });
  assert.equal(result.code, 200);
  assert.equal(result.calls.length, 3);
});

test('HF rate limiting falls back once to the configured alternative', async () => {
  const result = await run([
    { service: 'huggingface', status: 429, data: { error: 'Rate limited' } },
    model(draft), search, model('คำแนะนำ [1]'),
  ], { hf: true });
  assert.equal(result.code, 200);
  assert.equal(result.calls.filter((call) => call.url.includes('huggingface')).length, 1);
});

test('rate limiting during citation repair preserves the actual error code', async () => {
  const result = await run([model(draft), search, model('คำแนะนำยังไม่มีอ้างอิง'),
    { service: 'groq', status: 429, data: { error: 'Rate limited' } },
  ]);
  assert.equal(result.code, 429);
  assert.equal(result.payload.code, 'CHAT_RATE_LIMITED');
});


test('Groq quota failure switches to Gemini and preserves final citation mapping', async () => {
  const result = await run([
    { service: 'groq', status: 429, data: { error: 'Rate limited' } },
    { service: 'googleapis', data: completion(draft) }, search,
    { service: 'googleapis', data: completion('คำแนะนำ [3]') },
  ], { gemini: true, order: 'groq,gemini' });
  assert.equal(result.code, 200);
  assert.equal(result.payload.reply, 'คำแนะนำ [1]');
  assert.deepEqual(result.payload.sources.map((s) => s.url), [evidence[2].url]);
  assert.equal(result.calls.filter((c) => c.url.includes('groq')).length, 1);
});

test('OpenRouter alone is a valid configuration and always uses the free route', async () => {
  const result = await run([
    { service: 'openrouter', data: completion(draft) }, search,
    { service: 'openrouter', data: completion('คำแนะนำ [1]') },
  ], { groq: false, openrouter: true });
  assert.equal(result.code, 200);
  for (const call of result.calls.filter((c) => c.url.includes('openrouter'))) assert.equal(call.body.model, 'openrouter/free');
});

test('failing over during final generation uses the same source context', async () => {
  const result = await run([
    model(draft), search,
    { service: 'groq', status: 429, data: { error: 'Rate limited' } },
    { service: 'googleapis', data: completion('คำแนะนำ [2]') },
  ], { gemini: true, order: 'groq,gemini' });
  assert.equal(result.code, 200);
  assert.deepEqual(result.calls[2].body.messages, result.calls[3].body.messages);
  assert.deepEqual(result.payload.sources.map((s) => s.url), [evidence[1].url]);
});


test('rejects the screenshot mismatch even when all citation numbers are valid', async () => {
  const unrelated = [
    { title: 'เกมแต่งตัวที่สามารถปรับแต่งตัวละครได้อย่างอิสระ', url: 'https://example.org/game', content: 'เกมนี้มีตัวละครและชุดให้เลือก สามารถปรับแต่งตัวละครได้อย่างอิสระ' },
    { title: '10 เกร็ดความรู้เกี่ยวกับ RF ONLINE NEXT', url: 'https://example.org/rf', content: 'RF ONLINE NEXT เป็นเกมที่มีระบบตัวละครและภารกิจสำหรับผู้เล่น' },
    { title: 'เกสต์เฮาส์ในสกีรีม', url: 'https://example.org/stay', content: 'รายชื่อที่พักและเกสต์เฮาส์สำหรับนักท่องเที่ยว พร้อมข้อมูลราคาและจองห้องพัก' },
  ];
  const result = await run([model(draft), { service: 'tavily', data: { results: unrelated } },
    model('พื้นที่สงบช่วยให้ร่างกายและจิตใจพักผ่อน [2]'),
    { ...model(JSON.stringify({ supported: false, allClaimsCovered: false, evidence: [] })), review: true },
  ]);
  assert.equal(result.code, 422);
  assert.equal(result.payload.reply, undefined);
  assert.equal(result.payload.sources, undefined);
});

test('rejects a review that fabricates a supporting passage', async () => {
  const result = await run([model(draft), search, model('คำแนะนำ [1]'),
    { ...model(JSON.stringify({ supported: true, allClaimsCovered: true,
      evidence: [{ source: 1, quote: 'This supporting quote does not exist in the retrieved excerpt.' }] })), review: true },
  ]);
  assert.equal(result.code, 422);
});

test('empty excerpts cannot be cited based on a title alone', async () => {
  const result = await run([model(draft), { service: 'tavily', data: { results: [
    { title: 'Stress relief', url: 'https://example.org/stress', content: '' },
  ] } }]);
  assert.equal(result.code, 422);
});

test('evidence validation fails closed for missing claims, malformed output and incomplete coverage', async () => {
  const { verifiedEvidence } = await import('../server/chat-evidence.mjs');
  const quote = evidence[0].content;
  const valid = { supported: true, allClaimsCovered: true, evidence: [{ source: 1, quote }] };
  assert.equal(verifiedEvidence(JSON.stringify(valid), 'คำแนะนำ [1]', [quote]), true);
  for (const review of [
    { ...valid, allClaimsCovered: false },
    { ...valid, supported: 'true' },
    { ...valid, evidence: [] },
    { ...valid, evidence: [{ source: 2, quote }] },
    { ...valid, evidence: [{ source: 1, quote: 'short' }] },
    { ...valid, evidence: [{ source: 1, quote }, { source: 1, quote }] },
  ]) assert.equal(verifiedEvidence(JSON.stringify(review), 'คำแนะนำ [1]', [quote]), false);
  assert.equal(verifiedEvidence('not JSON', 'คำแนะนำ [1]', [quote]), false);
  assert.equal(verifiedEvidence(JSON.stringify(valid), 'คำแนะนำ [1] และ [2]', [quote, quote]), false);
});
