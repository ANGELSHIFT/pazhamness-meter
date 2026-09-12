import React, { useState } from 'react';
import { Utensils } from 'lucide-react';
import { sound } from './SoundEffects';

export default function ExtraInteractions({ analysis }) {
  const [trustAnswer, setTrustAnswer] = useState(null);

  const handleTrust = (choice) => {
    setTrustAnswer(choice);
    if (choice === 'yes') {
      sound.playCelebrate();
    } else {
      sound.playGavel();
    }
  };

  const destiny = analysis?.destiny || 'EAT IT NOW';
  const mood = analysis?.mood || 'Royal & Victorious';

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-pixel">

        {/* 1. Would You Trust This Banana? */}
        <div className="pixel-card bg-dark-900 p-6 text-center flex flex-col justify-between">
          <div>
            <span className="text-[8px] uppercase tracking-wider text-zinc-500">
              BONUS STAGE
            </span>
            <h5 className="text-xs text-banana-200 mt-2">
              TRUST THIS PAZHAM?
            </h5>
          </div>

          <div className="my-5">
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleTrust('yes')}
                className={`pixel-btn px-4 py-2 text-[8px] cursor-pointer ${
                  trustAnswer === 'yes' ? 'bg-green-500 text-dark-950' : 'bg-dark-800 text-zinc-300'
                }`}
              >
                YES
              </button>
              <button
                onClick={() => handleTrust('no')}
                className={`pixel-btn px-4 py-2 text-[8px] cursor-pointer ${
                  trustAnswer === 'no' ? 'bg-red-500 text-dark-950' : 'bg-dark-800 text-zinc-300'
                }`}
              >
                NO
              </button>
            </div>

            <div className="min-h-[28px] mt-4 text-[8px] text-zinc-400 font-mono">
              {trustAnswer === 'yes' && 'Dhairyashali! Respect +100.'}
              {trustAnswer === 'no' && 'Nalla theerumanam. Amma agrees!'}
            </div>
          </div>
        </div>

        {/* 2. Banana Mood */}
        <div className="pixel-card bg-dark-900 p-6 text-center flex flex-col justify-between">
          <div>
            <span className="text-[8px] uppercase tracking-wider text-zinc-500">
              STATUS
            </span>
            <h5 className="text-xs text-banana-200 mt-2">
              BANANA MOOD
            </h5>
          </div>

          <div className="my-4 flex flex-col items-center">
            <div className="w-14 h-14 bg-dark-800 border-2 border-banana-400 flex items-center justify-center text-banana-400">
              <svg viewBox="0 0 64 64" className="w-9 h-9 fill-none stroke-current stroke-2">
                <circle cx="32" cy="32" r="24" strokeWidth="2.5" />
                <circle cx="23" cy="28" r="2.5" fill="currentColor" />
                <circle cx="41" cy="28" r="2.5" fill="currentColor" />
                {analysis?.category === 'PACHA_PAZHAM' && (
                  <line x1="22" y1="40" x2="42" y2="40" strokeLinecap="round" strokeWidth="2.5" />
                )}
                {analysis?.category === 'ALMOST_THERE' && (
                  <path d="M22,38 Q32,44 42,38" strokeLinecap="round" strokeWidth="2.5" />
                )}
                {analysis?.category === 'PERFECT_PAZHAM' && (
                  <path d="M20,36 Q32,48 44,36" strokeLinecap="round" strokeWidth="3" />
                )}
                {analysis?.category === 'OVERRIPE' && (
                  <path d="M22,44 Q32,36 42,44" strokeLinecap="round" strokeWidth="2.5" />
                )}
                {analysis?.category === 'RETIREMENT_HOME' && (
                  <line x1="22" y1="42" x2="42" y2="42" strokeLinecap="round" strokeWidth="3" />
                )}
              </svg>
            </div>
            <div className="mt-3 text-[9px] text-banana-300">
              {mood}
            </div>
          </div>
        </div>

        {/* 3. Recommended Destiny */}
        <div className="pixel-card bg-dark-900 p-6 text-center flex flex-col justify-between">
          <div>
            <span className="text-[8px] uppercase tracking-wider text-zinc-500">
              MISSION OBJECTIVE
            </span>
            <h5 className="text-xs text-banana-200 mt-2">
              RECOMMENDED DESTINY
            </h5>
          </div>

          <div className="my-5 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-banana-500 text-dark-950 border-2 border-black font-pixel text-[9px] tracking-wide uppercase">
              <Utensils className="w-3.5 h-3.5" />
              <span>{destiny}</span>
            </div>
            <p className="mt-3 text-[7px] text-zinc-500 font-pixel">
              OFFICIAL FATE ISSUED
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
