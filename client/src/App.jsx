import React, { useState } from 'react';
import BananaBlast from './components/BananaBlast';
import BananaBorder from './components/BananaBorder';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import UploadZone from './components/UploadZone';
import BananaScanner from './components/BananaScanner';
import ResultPage from './components/ResultPage';
import Footer from './components/Footer';
import { Volume2, VolumeX } from 'lucide-react';
import { sound } from './components/SoundEffects';

export default function App() {
  const [phase, setPhase] = useState('landing');
  const [rawData, setRawData] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  // Easter eggs & toasts
  const [toast, setToast] = useState(null);
  const [fallingBananas, setFallingBananas] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Trigger toast
  const showToast = (title, message = '') => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Easter egg: Falling pastel pixel bananas
  const triggerFallingBananas = (msg) => {
    showToast(msg || 'WHY ARE YOU CLICKING THE PAZHAM?');
    sound.playSquish();
    const newItems = Array.from({ length: 14 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.floor(Math.random() * 92) + '%',
      delay: (Math.random() * 0.8).toFixed(2) + 's',
      duration: (1.4 + Math.random() * 0.8).toFixed(2) + 's',
    }));
    setFallingBananas(newItems);
    setTimeout(() => setFallingBananas([]), 3000);
  };

  const handleImageSelected = async (data) => {
    setRawData(data);
    setPhase('investigating');

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          avgR: data.avgR,
          avgG: data.avgG,
          avgB: data.avgB,
          spotDensity: data.spotDensity,
          hue: data.hue,
          sat: data.sat,
          lum: data.lum,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.isValidBanana) {
          setAnalysis(result);
        } else {
          showToast(result.errorTitle, result.errorMessage);
          setPhase('upload');
        }
      } else {
        setFallbackAnalysis(data);
      }
    } catch (err) {
      console.warn('Backend offline, using intelligent engine:', err);
      setFallbackAnalysis(data);
    }
  };

  const setFallbackAnalysis = (data) => {
    const h = data.hue || 50;
    const spot = data.spotDensity || 12;

    let cat = 'PERFECT_PAZHAM';
    let title = 'PERFECT PAZHAM';
    let pos = 56;
    let days = '2-3';
    let score = 92.5;

    if (h >= 68 && h <= 155) {
      cat = 'PACHA_PAZHAM';
      title = 'PACHA PAZHAM';
      pos = 16;
      days = '7-10';
      score = 32.4;
    } else if (h >= 50 && h < 68) {
      cat = 'ALMOST_THERE';
      title = 'ALMOST THERE';
      pos = 38;
      days = '4-6';
      score = 72.8;
    } else if (spot >= 28 || h < 40) {
      cat = 'OVERRIPE';
      title = 'OVERRIPE';
      pos = 78;
      days = '1-2';
      score = 64.2;
    }

    setAnalysis({
      category: cat,
      title: title,
      score: score,
      lifeLinePos: pos,
      remainingDays: days,
      confidence: '95.8',
      passport: {
        passportNo: 'PZM-2026-9214',
        name: 'Banana #618',
        born: 'Vazha (Kerala)',
        currentLocation: 'Kitchen Counter',
        nationality: 'Mallu Pazham',
        currentAge: '6 days',
        status: title,
        score: `${score} / 100`,
        personality: 'THE GOLDEN CHILD',
      },
      ammaApproval: {
        verdict: 'Ithu ippozhum pacha aanu!',
        approvalRate: 48,
        reaction: 'Amma has reviewed the evidence.',
      },
      court: {
        caseNo: 'PZM-2026-384',
        prosecution: 'Prathi counter-il unnecessarily irunnu over-ripe aayi!',
        defence: 'The banana claims it still has potential for banana fry!',
        verdict: 'RELEASED ON BANANA BAIL',
        sentence: 'Court ordered prathikku 2 days probation.',
      },
      personality: {
        name: 'THE GOLDEN CHILD',
        desc: 'Peaked at the right moment. Universally loved. The family is proud!',
      },
      destiny: 'EAT IT NOW',
      mood: 'Royal & Victorious',
      scientificStats: {
        yellownessQuotient: 86,
        spotDensityRatio: spot,
        emotionalStability: 68,
        survivalProbability: 42,
        pazhamnessIndex: score,
      },
    });
  };

  const handleScanFinished = () => {
    setPhase('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setPhase('upload');
    setRawData(null);
    setAnalysis(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen pixel-grid-bg">
      {/* Custom Banana Cursor */}
      <CustomCursor />

      {/* 4-Column Continuous Dancing Banana Streams (Preserved Untouched) */}
      <BananaBorder />

      {/* Retro 8-bit Audio Toggle (Top Right) in Soft Pastel */}
      <div className="fixed top-4 right-4 z-40">
        <button
          onClick={() => {
            const enabled = sound.toggleSound();
            setSoundEnabled(enabled);
          }}
          className="interactive p-2.5 bg-dark-900 border-2 border-pastel-yellow text-pastel-yellow hover:text-white shadow-[2px_2px_0px_#000] transition-all"
          title={soundEnabled ? 'Mute 8-bit Sound' : 'Enable 8-bit Sound'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
        </button>
      </div>

      {/* Opening Banana Blast */}
      <BananaBlast />

      {/* Main Flow Views */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {phase === 'landing' && (
          <>
            <Hero
              onStartUpload={() => setPhase('upload')}
              onEasterEggClick={triggerFallingBananas}
            />
            <UploadZone
              onImageSelected={handleImageSelected}
              onErrorToast={(title, msg) => showToast(title, msg)}
            />
          </>
        )}

        {phase === 'upload' && (
          <div className="pt-12">
            <div className="text-center mb-6">
              <button
                onClick={() => setPhase('landing')}
                className="font-pixel text-[9px] text-pastel-yellow hover:text-pastel-peach underline decoration-dotted interactive"
              >
                &larr; BACK TO TITLE SCREEN
              </button>
            </div>
            <UploadZone
              onImageSelected={handleImageSelected}
              onErrorToast={(title, msg) => showToast(title, msg)}
            />
          </div>
        )}

        {phase === 'investigating' && rawData && (
          <BananaScanner
            rawData={rawData}
            onScanComplete={handleScanFinished}
          />
        )}

        {phase === 'result' && analysis && (
          <ResultPage
            analysis={analysis}
            onReset={handleReset}
            onGraveEasterEgg={() => showToast('Please respect the deceased. You will be remembered.')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Easter Egg: Falling Pastel Pixel Bananas */}
      {fallingBananas.map((item) => (
        <div
          key={item.id}
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
          className="fixed pointer-events-none z-50 falling-banana-anim"
        >
          <img
            src="/pastel-pixel-banana.png"
            alt="falling pastel pixel banana"
            className="w-12 h-16 object-contain filter drop-shadow-[0_4px_10px_rgba(254,240,138,0.5)]"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      ))}

      {/* 8-Bit Retro Soft Pastel Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-4 pixel-card-pastel bg-dark-950 shadow-[5px_5px_0px_#000] flex flex-col items-center text-center font-pixel animate-[fadeUp_0.3s_ease_both]">
          <div className="flex items-center gap-2">
            <img
              src="/cursor-banana.png"
              alt="toast banana"
              className="w-5 h-7 object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="text-xs text-pastel-yellow pixel-shadow">
              {toast.title}
            </span>
          </div>
          {toast.message && (
            <p className="text-[9px] text-pastel-cream mt-2 max-w-sm font-mono leading-normal">
              {toast.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
