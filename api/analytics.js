export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const sheetsUrl = process.env.SHEETS_WEBHOOK_URL;

  if (!sheetsUrl) {
    return res.status(200).json({ ok: true, stored: 'local_only' });
  }

  try {
    await fetch(sheetsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    return res.status(200).json({ ok: true });
  } catch(err) {
    return res.status(200).json({ ok: false, note: 'sheets unavailable' });
  }
}
