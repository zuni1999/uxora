import { createHash } from 'node:crypto';
import { contactEmailHtml } from '../lib/contact-emails.js';

const inbox = 'tech.uxora@gmail.com';
const types = ['SAAS', 'Web & App Design', 'Custom Software Development', 'AI Automation', 'Product Design', 'E-Commerce', 'Cloud Integration', 'Other'];

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  if (!req.headers['content-type']?.includes('application/json')) return res.status(415).json({ error: 'JSON required.' });
  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; } catch { return res.status(400).json({ error: 'Invalid request.' }); }
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Invalid request.' });
  if (body.website) return res.status(400).json({ error: 'Unable to submit this enquiry.' });
  const limits = { name: 120, email: 254, type: 80, budget: 100, country: 120, message: 5000 };
  const data = {};
  for (const [key, limit] of Object.entries(limits)) {
    if (typeof body[key] !== 'string' || body[key].length > limit) return res.status(400).json({ error: 'Please check your form details.' });
    data[key] = body[key].trim();
    if (key !== 'budget' && !data[key]) return res.status(400).json({ error: 'Please complete all required fields.' });
  }
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email) || /[\r\n]/.test(data.name + data.country) || !/^\d*$/.test(data.budget) || !types.includes(data.type)) return res.status(400).json({ error: 'Please check your email and project details.' });
  if (!/^[a-f0-9-]{36}$/i.test(body.submissionId ?? '')) return res.status(400).json({ error: 'Invalid submission. Please refresh and try again.' });
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM_EMAIL) return res.status(503).json({ error: 'Email sending is currently unavailable. Please email tech.uxora@gmail.com directly.' });
  const details = `Full name: ${data.name}\nEmail: ${data.email}\nProject type: ${data.type}\nBudget: ${data.budget ? `$${data.budget} USD` : 'Not specified'}\nCountry: ${data.country}\n\nMessage:\n${data.message}`;
  const from = process.env.CONTACT_FROM_EMAIL;
  const emails = [
    { html: contactEmailHtml(data, 'team'), from, to: [inbox], reply_to: data.email, subject: `Project enquiry — ${data.type}`, text: `New UXORA website enquiry\n\n${details}` },
    { html: contactEmailHtml(data, 'visitor'), from, to: [data.email], reply_to: inbox, subject: 'Your enquiry to UXORA', text: `Hi ${data.name},\n\nThank you for contacting UXORA. Here is a copy of your enquiry. Our team will review it and get back to you.\n\n${details}\n\nUXORA Team\n${inbox}` },
  ];
  try {
    const response = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `contact-${body.submissionId}-${createHash('sha256').update(JSON.stringify(emails)).digest('hex')}` },
      body: JSON.stringify(emails), signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return res.status(502).json({ error: 'We couldn’t send your enquiry. Please try again or email tech.uxora@gmail.com.' });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'We couldn’t confirm your submission. Please retry.' });
  }
}
