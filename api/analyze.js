const { analyzeBananaData } = require('../server/vision');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { avgR, avgG, avgB, spotDensity, hue, sat, lum } = req.body || {};
    const analysis = analyzeBananaData({
      avgR: Number(avgR || 200),
      avgG: Number(avgG || 180),
      avgB: Number(avgB || 50),
      spotDensity: Number(spotDensity || 10),
      hue: hue !== undefined ? Number(hue) : null,
      sat: sat !== undefined ? Number(sat) : null,
      lum: lum !== undefined ? Number(lum) : null
    });
    return res.status(200).json(analysis);
  } catch (err) {
    return res.status(500).json({ isValidBanana: false, errorTitle: 'SERVERIL PAZHAM STUCK AAYI', errorMessage: err.message });
  }
};
