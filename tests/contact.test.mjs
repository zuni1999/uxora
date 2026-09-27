import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.js';

const body = { name: 'Test Person', email: 'visitor@example.com', type: 'SAAS', budget: '5000', country: 'Pakistan', message: 'A project enquiry', website: '', submissionId: '12345678-1234-1234-1234-123456789012' };
function response() { return { code: 0, payload: null, setHeader() {}, status(code) { this.code = code; return this; }, json(payload) { this.payload = payload; return this; } }; }
const request = (data = body) => ({ method: 'POST', headers: { 'content-type': 'application/json' }, body: data });
test('contact validation and two-recipient delivery', async () => {
  const originalFetch = globalThis.fetch;
  const oldKey = process.env.RESEND_API_KEY;
  const oldFrom = process.env.CONTACT_FROM_EMAIL;
  let calls = [];
  try {
    process.env.RESEND_API_KEY = 'test-only';
    process.env.CONTACT_FROM_EMAIL = 'UXORA <contact@uxora.co>';
    globalThis.fetch = async (url, options) => { calls.push({ url, options }); return { ok: true }; };
    for (const invalid of [{ ...body, email: 'invalid' }, { ...body, budget: '50abc' }, { ...body, message: '' }, { ...body, website: 'spam' }]) {
      const res = response(); await handler(request(invalid), res); assert.equal(res.code, 400);
    }
    assert.equal(calls.length, 0);
    const res = response(); await handler(request(), res); assert.equal(res.code, 200);
    const emails = JSON.parse(calls[0].options.body);
    assert.equal(emails.length, 2);
    assert.ok(emails.every(email => email.html.includes('<!doctype html>') && email.html.includes(body.message)));
    assert.deepEqual(emails[0].to, ['tech.uxora@gmail.com']);
    assert.deepEqual(emails[1].to, ['visitor@example.com']);
    assert.equal(emails[0].reply_to, body.email);
    assert.equal(emails[1].reply_to, 'tech.uxora@gmail.com');
    assert.ok(emails.every(email => email.text.includes(body.message) && email.text.includes('$5000 USD')));
    await handler(request(), response());
    assert.equal(calls[0].options.headers['Idempotency-Key'], calls[1].options.headers['Idempotency-Key']);
    globalThis.fetch = async () => ({ ok: false });
    const failed = response(); await handler(request(), failed); assert.equal(failed.code, 502);
    delete process.env.RESEND_API_KEY;
    const unavailable = response(); await handler(request(), unavailable); assert.equal(unavailable.code, 503);
  } finally {
    globalThis.fetch = originalFetch;
    if (oldKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = oldKey;
    if (oldFrom === undefined) delete process.env.CONTACT_FROM_EMAIL; else process.env.CONTACT_FROM_EMAIL = oldFrom;
  }
});

test('HTML templates escape submitted content and preserve message lines', async () => {
  const { contactEmailHtml } = await import('../lib/contact-emails.js');
  for (const audience of ['team', 'visitor']) {
    const html = contactEmailHtml({ ...body, name: '<script>alert(1)</script>', message: '<img src=x onerror=alert(1)>\nSecond line' }, audience);
    assert.ok(!html.includes('<script>'));
    assert.ok(!html.includes('<img src=x'));
    assert.ok(html.includes('&lt;script&gt;'));
    assert.ok(html.includes('<br>Second line'));
    assert.ok(html.includes('$5000 USD'));
    assert.ok(html.includes(audience === 'team' ? 'Reply to enquiry' : 'Thanks for reaching out.'));
  }
});
