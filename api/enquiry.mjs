// Enquiry form handler for orienting.lu.
//
// Posts the contact form to Resend's REST API, which forwards it to Ting's inbox.
// Uses fetch directly rather than the Resend SDK so the site keeps its no-build-step,
// no-node_modules property. Nothing is stored here; the message is relayed and dropped.
//
// Environment variables (set in Vercel project settings):
//   RESEND_API_KEY  required
//   ENQUIRY_TO      optional, defaults to hi@orienting.lu
//   ENQUIRY_FROM    optional, defaults to Resend's shared sender (needs no DNS records).
//                   Switch to a verified orienting.lu sender after Resend's DNS
//                   records are added without breaking the existing iCloud setup.

const MAX_LENGTHS = {
  name: 200,
  email: 320,
  company: 200,
  situation: 40,
  markets: 300,
  message: 5000
};

const SITUATION_LABELS = {
  marketplace: 'Runs or supports a marketplace',
  seller: 'Sells products across Europe',
  between: 'Somewhere between the two',
  other: 'Something else'
};

const clean = (value, limit) =>
  typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, limit) : '';

const looksLikeEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return JSON.parse(req.body);

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const contentLength = Number(req.headers['content-length'] || 0);
  if (contentLength > 20000) {
    return res.status(413).json({ error: 'Request too large' });
  }

  const origin = req.headers.origin;
  const allowedOrigins = new Set([
    'https://orienting.lu',
    'https://www.orienting.lu',
    'https://orienting-lu.vercel.app'
  ]);
  if (origin && !allowedOrigins.has(origin)) {
    return res.status(403).json({ error: 'Origin not allowed' });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return res.status(400).json({ error: 'Malformed request body' });
  }

  // Honeypot. Bots fill it, people never see it. Answer 200 so they learn nothing.
  if (clean(body.website, 100) !== '') {
    return res.status(200).json({ ok: true });
  }

  const name = clean(body.name, MAX_LENGTHS.name);
  const email = clean(body.email, MAX_LENGTHS.email);
  const company = clean(body.company, MAX_LENGTHS.company);
  const situation = clean(body.situation, MAX_LENGTHS.situation);
  const markets = clean(body.markets, MAX_LENGTHS.markets);
  const message = typeof body.message === 'string' ? body.message.trim().slice(0, MAX_LENGTHS.message) : '';

  if (!name || !message || !looksLikeEmail(email)) {
    return res.status(400).json({ error: 'Please include your name, a valid email, and a message.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set; cannot relay enquiry.');
    return res.status(503).json({ error: 'The form is not configured yet.' });
  }

  const to = process.env.ENQUIRY_TO || 'hi@orienting.lu';
  const from = process.env.ENQUIRY_FROM || 'Orienting enquiries <onboarding@resend.dev>';

  const text = [
    `Name:      ${name}`,
    `Email:     ${email}`,
    `Company:   ${company || '(not given)'}`,
    `Situation: ${SITUATION_LABELS[situation] || '(not given)'}`,
    `Markets:   ${markets || '(not given)'}`,
    '',
    'Message:',
    message,
    '',
    '---',
    'Sent from the enquiry form on orienting.lu'
  ].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Orienting enquiry: ${name}${company ? ` (${company})` : ''}`,
        text
      })
    });

    if (!response.ok) {
      console.error('Resend rejected the enquiry:', response.status, await response.text());
      return res.status(502).json({ error: 'The message could not be delivered.' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Failed to relay enquiry:', error);
    return res.status(502).json({ error: 'The message could not be delivered.' });
  }
}
