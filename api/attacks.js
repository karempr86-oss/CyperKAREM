const fetch = require('node-fetch');

export default async function handler(req, res) {
  // حط المفتاح هنا او في Environment Variables بتاع Vercel
  const ABUSEIPDB_KEY = process.env.ABUSEIPDB_KEY;

  try {
    const response = await fetch('https://api.abuseipdb.com/api/v2/blacklist?confidenceMinimum=90&limit=20', {
      headers: { 'Key': ABUSEIPDB_KEY, 'Accept': 'application/json' }
    });
    const data = await response.json();
    res.status(200).json(data.data);
  } catch (error) {
    // لو الAPI فشل نرجع داتا وهمية
    res.status(200).json([
      {ipAddress: "185.220.101.45", countryCode: "RU"},
      {ipAddress: "91.219.236.18", countryCode: "CN"},
      {ipAddress: "45.142.212.93", countryCode: "US"},
    ]);
  }
}
