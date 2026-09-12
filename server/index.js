const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { analyzeBananaData } = require('./vision');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// In-memory court history archive
const courtTrials = [
  {
    id: 'TRIAL-901',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    bananaName: 'Banana #742',
    category: 'OVERRIPE',
    verdict: 'GUILTY OF BEING TOO RIPE',
    sentence: 'Sentenced to compulsory Pazham Pori duty in hot coconut oil!'
  },
  {
    id: 'TRIAL-902',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    bananaName: 'Banana #519',
    category: 'PERFECT_PAZHAM',
    verdict: 'NOT GUILTY OF OVER-RIPENING',
    sentence: 'Acquitted! Sentenced to immediate pairing with puttu!'
  },
  {
    id: 'TRIAL-903',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    bananaName: 'Banana #304',
    category: 'PACHA_PAZHAM',
    verdict: 'RELEASED ON BANANA BAIL',
    sentence: 'Court ordered prathikku 4 days probation on kitchen table.'
  }
];

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    message: 'Pazhamness Meter AI Engine is active and waiting for suspicious bananas.',
    timestamp: new Date().toISOString()
  });
});

// Vision Analysis API
app.post('/api/analyze', (req, res) => {
  try {
    const { avgR, avgG, avgB, spotDensity, hue, sat, lum } = req.body;

    const analysis = analyzeBananaData({
      avgR: Number(avgR || 200),
      avgG: Number(avgG || 180),
      avgB: Number(avgB || 50),
      spotDensity: Number(spotDensity || 10),
      hue: hue !== undefined ? Number(hue) : null,
      sat: sat !== undefined ? Number(sat) : null,
      lum: lum !== undefined ? Number(lum) : null
    });

    if (analysis.isValidBanana) {
      courtTrials.unshift({
        id: 'TRIAL-' + Math.floor(1000 + Math.random() * 9000),
        timestamp: new Date().toISOString(),
        bananaName: analysis.passport.name,
        category: analysis.category,
        verdict: analysis.court.verdict,
        sentence: analysis.court.sentence
      });
      if (courtTrials.length > 20) courtTrials.pop();
    }

    res.json(analysis);
  } catch (err) {
    console.error('Error analyzing banana:', err);
    res.status(500).json({
      isValidBanana: false,
      errorTitle: 'SERVERIL PAZHAM STUCK AAYI 😭',
      errorMessage: 'Internal server error while analyzing banana pixels.'
    });
  }
});

// Court history
app.get('/api/court-cases', (req, res) => {
  res.json(courtTrials);
});

// Passport verification
app.post('/api/passport/verify', (req, res) => {
  const { passportNo } = req.body;
  res.json({
    verified: true,
    seal: 'SEAL-OF-KERALA-PAZHAM-AUTHORITY-2026',
    signature: 'Amma Verified & Approved',
    passportNo: passportNo || 'PZM-2026-UNKNOWN'
  });
});

// Serve frontend static build if available
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[PAZHAM-ENGINE] Server running smoothly on http://localhost:${PORT}`);
});
