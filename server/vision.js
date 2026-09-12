// Vision analysis and Manglish intelligence engine for Pazhamness Meter
// All comments, dialogue and verdicts in authentic Manglish

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s, l };
}

function analyzeBananaData({ avgR, avgG, avgB, spotDensity = 12, hue = null, sat = null, lum = null }) {
  // Compute HSL if not provided
  let h = hue, s = sat, l = lum;
  if (h === null || s === null || l === null) {
    const hsl = rgbToHsl(avgR, avgG, avgB);
    h = hsl.h; s = hsl.s; l = hsl.l;
  }

  // Check if image is NOT a banana (e.g., strong blue, violet, cold magenta, pure washed out grey)
  const isSuspiciousColdColor = (h >= 180 && h <= 300 && s > 0.22);
  const isPureGrayscale = (s < 0.08 && (l > 0.88 || l < 0.1));
  const isNeonMagenta = (h > 310 && s > 0.5);

  if (isSuspiciousColdColor || isPureGrayscale || isNeonMagenta) {
    return {
      isValidBanana: false,
      errorTitle: 'ITHU PAZHAM ALLA 😭',
      errorMessage: 'Kandu padichappol ithu oru banana aayi thonnunnilla! Please upload an actual banana photograph.'
    };
  }

  // Determine Ripeness Category based on Color Ratios
  let category = 'PERFECT_PAZHAM';
  let lifeLinePos = 55;
  let remainingDays = '2-3';
  let score = 92.5;

  if (h >= 68 && h <= 155 && s > 0.18) {
    // High green pixels -> PACHA PAZHAM
    category = 'PACHA_PAZHAM';
    lifeLinePos = 14 + Math.round(Math.random() * 8);
    remainingDays = '7-10';
    score = (25 + Math.random() * 20).toFixed(1);
  } else if (h >= 50 && h < 68 && s > 0.28 && l > 0.38) {
    // Yellow-green transition -> ALMOST THERE
    category = 'ALMOST_THERE';
    lifeLinePos = 35 + Math.round(Math.random() * 8);
    remainingDays = '4-6';
    score = (65 + Math.random() * 15).toFixed(1);
  } else if (h >= 38 && h < 55 && s > 0.35 && l >= 0.35 && spotDensity < 28) {
    // Mostly bright yellow -> PERFECT PAZHAM
    category = 'PERFECT_PAZHAM';
    lifeLinePos = 54 + Math.round(Math.random() * 8);
    remainingDays = '2-3';
    score = (88 + Math.random() * 10).toFixed(1);
  } else if ((h >= 22 && h < 45) || spotDensity >= 28 || (l >= 0.22 && l < 0.38)) {
    // Yellow + moderate brown spots -> OVERRIPE
    category = 'OVERRIPE';
    lifeLinePos = 76 + Math.round(Math.random() * 8);
    remainingDays = '1-2';
    score = (55 + Math.random() * 20).toFixed(1);
  } else {
    // High brown/dark -> EXTREMELY OVERRIPE / RETIREMENT
    category = 'RETIREMENT_HOME';
    lifeLinePos = 92 + Math.round(Math.random() * 5);
    remainingDays = '0 (TODAY!)';
    score = (18 + Math.random() * 15).toFixed(1);
  }

  // Category specific Manglish metadata
  const metaMap = {
    PACHA_PAZHAM: {
      title: 'PACHA PAZHAM',
      badge: 'NOT READY YET',
      bgTheme: 'green',
      hexAccent: '#4ADE80',
      glowColor: 'rgba(74, 222, 128, 0.4)',
      personality: {
        name: 'THE LAZY RIPENER',
        desc: 'Oru dhithiyum illa. Urangi ezhunnettu mathi ripen aavan. Refuses to hurry up for anyone.'
      },
      amma: {
        verdict: 'Ithu ippozhum pacha aanu!',
        approvalRate: 88,
        reaction: 'Amma agrees with the machine. "Innu kazhikkenda, vekkeda avide!"'
      },
      court: {
        verdict: 'RELEASED ON BANANA BAIL',
        prosecution: 'Lord Court! Ee pazham counter-il kidannu thithiyillaathae irikkunnu. Zero sweetness detected!',
        defence: 'Prathi innocent aanu! Just 3-4 days sunlight kittiyal prime aakum!',
        sentence: 'Court ordered prathikku 4 days probation on kitchen table.'
      },
      destiny: 'WAIT PATIENTLY',
      mood: 'Concerned & Firm'
    },
    ALMOST_THERE: {
      title: 'ALMOST THERE',
      badge: 'GETTING READY',
      bgTheme: 'yellowGreen',
      hexAccent: '#FACC15',
      glowColor: 'rgba(250, 204, 21, 0.4)',
      personality: {
        name: 'THE DRAMA QUEEN',
        desc: 'Oru divasam kond pacha maari yellow aayi. Every hour oru puthiya drama aanu. So close to greatness!'
      },
      amma: {
        verdict: 'Innu venda, naale nokkam.',
        approvalRate: 64,
        reaction: 'Amma has reviewed the evidence and decided to wait till morning.'
      },
      court: {
        verdict: 'CASE ADJOURNED',
        prosecution: 'Prathi half-ripe aayi aalukale confuse cheyyunnu! Is it sweet or is it dry?',
        defence: 'The transformation is currently in progress, Your Honor! Give it 24 hours!',
        sentence: 'Hearing postponed until tomorrow\'s breakfast inspection.'
      },
      destiny: 'HOLD YOUR HORSES',
      mood: 'Excited & Anticipating'
    },
    PERFECT_PAZHAM: {
      title: 'PERFECT PAZHAM',
      badge: 'PEAK RIPENESS',
      bgTheme: 'bananaYellow',
      hexAccent: '#FBBF24',
      glowColor: 'rgba(251, 191, 36, 0.5)',
      personality: {
        name: 'THE GOLDEN CHILD',
        desc: 'Kudumbathinte aishwaryam! Peaked at the exact right moment. Universally adored. Everyone wants a piece.'
      },
      amma: {
        verdict: 'Kollam, nalla pazham... pakshe innu thanne kazhicho!',
        approvalRate: 94,
        reaction: 'Amma agrees with the machine! "Ippol thanne kazhicho, illenkil cheenju pokum!"'
      },
      court: {
        verdict: 'NOT GUILTY OF OVER-RIPENING',
        prosecution: 'No charges can be sustained. Prathi is in immaculate golden condition.',
        defence: 'We request immediate discharge with national honors!',
        sentence: 'Acquitted! Sentenced to immediate pairing with puttu or direct consumption!'
      },
      destiny: 'EAT IT NOW',
      mood: 'Royal & Victorious'
    },
    OVERRIPE: {
      title: 'OVERRIPE PAZHAM',
      badge: 'URGENT ATTENTION',
      bgTheme: 'amberBrown',
      hexAccent: '#F97316',
      glowColor: 'rgba(249, 115, 22, 0.45)',
      personality: {
        name: 'THE SURVIVOR',
        desc: 'Kitchen counter-il ethrayo thavana thalli maatti. Ethrayo cyclones kandu. Still surviving with pride and spots!'
      },
      amma: {
        verdict: 'Ithu innu thanne pazham pori aakkanam!',
        approvalRate: 42,
        reaction: 'AI has been respectfully superseded. Amma already lit the kadai for pazham pori.'
      },
      court: {
        verdict: 'GUILTY OF BEING TOO RIPE',
        prosecution: 'Prathi crossed the golden threshold! Spot density dangerously high!',
        defence: 'My client is exceptionally sweet inside! Do not judge by outer spots!',
        sentence: 'Sentenced to compulsory Pazham Pori duty in hot coconut oil!'
      },
      destiny: 'PAZHAM PORI TIME',
      mood: 'Warm & Dramatic'
    },
    RETIREMENT_HOME: {
      title: 'PAZHAM RETIREMENT HOME',
      badge: 'ARCHAEOLOGICAL FIND',
      bgTheme: 'darkBrown',
      hexAccent: '#A16207',
      glowColor: 'rgba(161, 98, 7, 0.4)',
      personality: {
        name: 'THE BANANA THAT REFUSES TO DIE',
        desc: 'Should have retired 4 days ago. Still on the counter. Nobody has the courage to throw it away. Pure legend.'
      },
      amma: {
        verdict: 'Ithu ini onnum cheyyan pattilla, kalayenda varum.',
        approvalRate: 18,
        reaction: 'Amma shook her head. Even Pazham Pori department refused jurisdiction.'
      },
      court: {
        verdict: 'GUILTY WITH NO PAROLE',
        prosecution: 'The specimen has entered archaeological fossil territory. Absolute dereliction of duty!',
        defence: 'The defence rests in peaceful silence.',
        sentence: 'Immediate retirement with state respects at the organic compost pit.'
      },
      destiny: 'KITCHEN ARCHAEOLOGY',
      mood: 'Philosophical & Tired'
    }
  };

  const meta = metaMap[category];
  const passportId = 'PZM-2026-' + Math.floor(1000 + Math.random() * 9000);
  const serialNo = 'Banana #' + Math.floor(100 + Math.random() * 900);
  const estimatedAge = Math.floor(4 + (lifeLinePos / 100) * 16) + ' days';

  return {
    isValidBanana: true,
    category,
    title: meta.title,
    badge: meta.badge,
    bgTheme: meta.bgTheme,
    hexAccent: meta.hexAccent,
    glowColor: meta.glowColor,
    score: parseFloat(score),
    lifeLinePos,
    remainingDays,
    confidence: (94.0 + Math.random() * 5.5).toFixed(1),
    passport: {
      passportNo: passportId,
      name: serialNo,
      born: 'Vazha (Kerala)',
      currentLocation: 'Kitchen Counter',
      nationality: 'Mallu Pazham',
      currentAge: estimatedAge,
      status: meta.badge,
      score: score + ' / 100',
      personality: meta.personality.name
    },
    ammaApproval: {
      verdict: meta.amma.verdict,
      approvalRate: meta.amma.approvalRate,
      reaction: meta.amma.reaction
    },
    court: {
      caseNo: 'PZM-2026-' + Math.floor(200 + Math.random() * 800),
      prosecution: meta.court.prosecution,
      defence: meta.court.defence,
      verdict: meta.court.verdict,
      sentence: meta.court.sentence
    },
    personality: meta.personality,
    destiny: meta.destiny,
    mood: meta.mood,
    scientificStats: {
      yellownessQuotient: Math.min(99, Math.max(5, Math.round(100 - Math.abs(h - 52) * 1.5))),
      spotDensityRatio: Math.min(95, Math.max(4, spotDensity)),
      emotionalStability: Math.round(30 + Math.random() * 60),
      survivalProbability: Math.max(3, Math.round(100 - lifeLinePos * 0.95)),
      pazhamnessIndex: parseFloat(score)
    }
  };
}

module.exports = { analyzeBananaData };
