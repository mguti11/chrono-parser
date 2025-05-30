import * as chrono from 'chrono-node';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { transcript } = req.body;

  if (!transcript || typeof transcript !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid transcript' });
  }

  try {
    const parsedDate = chrono.parseDate(transcript);
    if (!parsedDate) {
      return res.status(404).json({ error: 'No valid date found in transcript' });
    }

    return res.status(200).json({ appointment_time: parsedDate.toISOString() });
  } catch (err) {
    console.error('Chrono error:', err);
    return res.status(500).json({ error: { code: 500, message: 'A server error has occurred' } });
  }
}
