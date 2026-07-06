export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(process.env.VITE_GOOGLE_SHEET_URL as string, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: process.env.VITE_GOOGLE_SHEET_URL,
        ...req.body,
      }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('log-order proxy failed:', error);
    return res.status(500).json({ status: 'error', message: 'Proxy failed' });
  }
}