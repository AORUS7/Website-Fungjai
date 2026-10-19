import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/chat.ts';

const draft = 'ลองแบ่งงานเป็นช่วงสั้น ๆ และพักสายตาระหว่างช่วง';
const evidence = [1, 2, 3].map((n) => ({ title: `Evidence ${n}`, url: `https://example.org/evidence-${n}`, content: `Evidence excerpt ${n}` }));
const completion = (content) => ({ choices: [{ message: { content } }] });

async function run(steps, { hf = false } = {}) {
  const originalFetch = globalThis.fetch;
  const keys = ['HF_API_KEY', 'GROQ_API_KEY', 'TAVILY_API_KEY'];
  const previous = keys.map((key) => process.env[key]);
  delete process.env.HF_API_KEY;
  if (hf) process.env.HF_API_KEY = 'test-only';
  process.env.GROQ_API_KEY = 'test-only';
  process.env.TAVILY_API_KEY = 'test-only';
  const calls = [];
  globalThis.fetch = async (url, options) => {
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
      { role: 'user', content: 'ผู้ใช้เล่าว่ามีปัญหาเรื่องเพื่อน' },
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

test('a final answer without citations does not display unrelated search results', async () => {
  const result = await run([model(draft), search, model('เราอยู่ตรงนี้และพร้อมรับฟังนะคะ')]);
  assert.deepEqual(result.payload.sources, []);
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
