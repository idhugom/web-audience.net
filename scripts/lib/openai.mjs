// Minimal OpenAI Responses + Images client with retries and backoff.
const API = 'https://api.openai.com/v1';
const KEY = process.env.OPENAI_API_KEY;
if (!KEY) throw new Error('OPENAI_API_KEY is not set');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function request(path, body, { tries = 5, timeout = 240000 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt < tries; attempt++) {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), timeout);
    try {
      const res = await fetch(`${API}${path}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        signal: ac.signal,
      });
      clearTimeout(t);
      if (res.status === 429 || res.status >= 500) {
        const retryAfter = Number(res.headers.get('retry-after')) || 0;
        const wait = retryAfter ? retryAfter * 1000 : Math.min(60000, 2000 * 2 ** attempt);
        lastErr = new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
        await sleep(wait);
        continue;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 500)}`);
      }
      return await res.json();
    } catch (e) {
      clearTimeout(t);
      lastErr = e;
      if (attempt === tries - 1) break;
      await sleep(Math.min(60000, 2000 * 2 ** attempt));
    }
  }
  throw lastErr;
}

/** Call gpt-5.6-terra with structured JSON output. Returns parsed object + usage. */
export async function generateStructured({ system, user, schema, schemaName = 'article' }) {
  const data = await request('/responses', {
    model: 'gpt-5.6-terra',
    reasoning: { effort: 'high' },
    text: {
      verbosity: 'high',
      format: {
        type: 'json_schema',
        name: schemaName,
        strict: true,
        schema,
      },
    },
    input: [
      { role: 'developer', content: system },
      { role: 'user', content: user },
    ],
    max_output_tokens: 20000,
  });

  if (data.status === 'incomplete') {
    throw new Error(`incomplete: ${data.incomplete_details?.reason || 'unknown'}`);
  }
  const text =
    data.output_text ||
    data.output
      ?.flatMap((o) => (o.content || []).filter((c) => c.type === 'output_text').map((c) => c.text))
      .join('') ||
    '';
  if (!text) throw new Error('empty output');
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('invalid JSON output: ' + text.slice(0, 200));
  }
  return { parsed, usage: data.usage, id: data.id };
}

/** Generate an ultra-realistic image with gpt-image-2. Returns a Buffer (PNG). */
export async function generateImage({ prompt, size = '1536x1024', quality = 'medium' }) {
  const data = await request(
    '/images/generations',
    { model: 'gpt-image-2', prompt, size, quality, n: 1 },
    { timeout: 300000 },
  );
  const b64 = data.data?.[0]?.b64_json;
  if (!b64) throw new Error('no image returned');
  return Buffer.from(b64, 'base64');
}
