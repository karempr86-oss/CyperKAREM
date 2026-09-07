const fetch = require('node-fetch');

export default async function handler(req, res) {
  // حط المفتاح هنا او في Environment Variables بتاع Vercel
  const ABUSEIPDB_KEY = process.dd37f6972c92a19b1150c468f6231a70efcd94946405909f361c19e4eafab3e3b81894cb5d917199;

  try {
    const response = await fetch('https://api.abuseipdb.com/api/v2/blacklist?confidenceMinimum=90&limit=20', {
      headers: { 'Key': ABUSEIPDB_KEY, 'Accept'dd37f6972c92a19b1150c468f6231a70efcd94946405909f361c19e4eafab3e3b81894cb5d917199' }
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
