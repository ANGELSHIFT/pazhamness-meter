import React, { useEffect, useState } from 'react';
import { sound } from './SoundEffects';

export default function BananaBlast({ onFinished }) {
  const [active, setActive] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    sound.playWhoosh();
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 1100);

    const endTimer = setTimeout(() => {
      setActive(false);
      onFinished?.();
    }, 1600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-dark-950/95 backdrop-blur-xl transition-opacity duration-500 ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Soft Pastel Spotlight */}
      <div className="absolute w-96 h-96 bg-pastel-yellow/15 blur-3xl pointer-events-none" />

      <div className="text-center relative z-10 blast-pop-anim flex flex-col items-center">
        <div className="relative mb-6">
          <img
            src="/pastel-pixel-banana.png"
            alt="Pastel Pixel Pazham Blast"
            className="w-44 sm:w-56 md:w-64 object-contain drop-shadow-[0_15px_35px_rgba(254,240,138,0.4)] transform -rotate-12"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div className="font-pixel text-[11px] tracking-widest text-pastel-yellow uppercase opacity-95 animate-pulse pixel-shadow">
          ★ PAZHAM PROTOCOL v2.0 READY ★
        </div>
      </div>
    </div>
  );
}
