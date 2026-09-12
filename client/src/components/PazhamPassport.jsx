import React, { useEffect, useState } from 'react';
import { sound } from './SoundEffects';

export default function PazhamPassport({ analysis }) {
  const [stampActive, setStampActive] = useState(false);
  const passport = analysis?.passport || {
    passportNo: 'PZM-2026-8492',
    name: 'Banana #742',
    born: 'Vazha (Kerala)',
    currentLocation: 'Kitchen Counter',
    nationality: 'Mallu Pazham',
    currentAge: '7 days',
    status: 'PERFECT PAZHAM',
    score: '92.7 / 100',
    personality: 'THE GOLDEN CHILD'
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStampActive(true);
      sound.playStamp();
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <div className="relative pixel-card bg-dark-900 p-7 shadow-2xl overflow-hidden backdrop-blur-2xl">
        {/* Subtle Watermark Banana Background */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none select-none">
          <img
            src="/hero-banana.webp"
            alt="watermark"
            className="w-64 h-64 object-contain filter invert"
          />
        </div>

        {/* 8-Bit Passport Header */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-dark-700 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-dark-800 border-2 border-banana-400 flex items-center justify-center">
              <img
                src="/cursor-banana.png"
                alt="passport emblem"
                className="w-4 h-6 object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
            <div>
              <h4 className="font-pixel text-xs sm:text-sm text-banana-200">
                PAZHAM PASSPORT
              </h4>
              <p className="font-pixel text-[8px] text-zinc-500 mt-1">
                KERALA 8-BIT CITIZEN CARD
              </p>
            </div>
          </div>
          <div className="font-pixel text-[9px] text-banana-400">
            {passport.passportNo}
          </div>
        </div>

        {/* Passport Data Fields in 8-Bit Style */}
        <div className="space-y-3 font-pixel text-[9px]">
          <div className="flex justify-between border-b border-dark-800 pb-1.5">
            <span className="text-zinc-500 uppercase">NAME:</span>
            <span className="text-banana-100 font-bold">{passport.name}</span>
          </div>

          <div className="flex justify-between border-b border-dark-800 pb-1.5">
            <span className="text-zinc-500 uppercase">SPAWN POINT:</span>
            <span className="text-banana-200">{passport.born}</span>
          </div>

          <div className="flex justify-between border-b border-dark-800 pb-1.5">
            <span className="text-zinc-500 uppercase">LOCATION:</span>
            <span className="text-banana-200">{passport.currentLocation}</span>
          </div>

          <div className="flex justify-between border-b border-dark-800 pb-1.5">
            <span className="text-zinc-500 uppercase">NATIONALITY:</span>
            <span className="text-amber-400">{passport.nationality}</span>
          </div>

          <div className="flex justify-between border-b border-dark-800 pb-1.5">
            <span className="text-zinc-500 uppercase">AGE:</span>
            <span className="text-zinc-300">{passport.currentAge}</span>
          </div>

          <div className="flex justify-between border-b border-dark-800 pb-1.5">
            <span className="text-zinc-500 uppercase">STATUS:</span>
            <span className="text-banana-400 font-bold">{passport.status}</span>
          </div>

          <div className="flex justify-between border-b border-dark-800 pb-1.5">
            <span className="text-zinc-500 uppercase">PAZHAMNESS:</span>
            <span className="text-green-400 font-bold">{passport.score}</span>
          </div>

          <div className="flex justify-between pt-1">
            <span className="text-zinc-500 uppercase">TYPE:</span>
            <span className="text-amber-400 font-bold">{passport.personality}</span>
          </div>
        </div>

        {/* 8-Bit Stamp */}
        {stampActive && (
          <div
            onClick={() => sound.playStamp()}
            className="absolute top-16 right-6 stamp-anim interactive cursor-pointer select-none"
            title="Kerala Pazham Authority Official Seal"
          >
            <div className="w-24 h-24 border-4 border-dashed border-green-400 bg-green-950/70 flex flex-col items-center justify-center text-center text-green-300 shadow-[4px_4px_0px_#000] transform rotate-6">
              <span className="font-pixel text-[7px] tracking-widest uppercase">
                GOVT KERALA
              </span>
              <span className="font-pixel text-[9px] leading-tight my-1 text-white">
                PAZHAMNESS<br />VERIFIED
              </span>
              <span className="font-pixel text-[7px] text-green-400">
                2026 VALID
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
