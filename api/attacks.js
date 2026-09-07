const fetch = require('node-fetch');

export default async function handler(req, res) {
  // مهم: حط المفتاح في Vercel Environment Variables
  const ABUSEIPDB_KEY = process.env.ABUSEIPDB_KEY;

  if (!ABUSEIPDB_KEY) {
    return res.status(500).json({ error: "API Key not found" });
  }

  try {
    // بنجيب توب 20 IP الاكثر ابلاغا عنه بثقة 90%
    const response = await fetch('https://api.abuseipdb.com/api/v2/blacklist?confidenceMinimum=90&limit=20', {
      method: 'GET',
      headers: {
        'Key': ABUSEIPDB_KEY,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    
    // بنرجع الداتا للفرونت
    res.status(200).json(data.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch attacks" });
  }
}
