import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { sound } from './SoundEffects';

export default function Hero({ onStartUpload, onEasterEggClick }) {
  const [clickCount, setClickCount] = useState(0);

  const handleTitleClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    sound.playScanBeep();
    if (next >= 5) {
      setClickCount(0);
      onEasterEggClick?.('WHY ARE YOU CLICKING THE PAZHAM?');
    }
  };

  return (
    <section className="min-h-[88vh] flex flex-col items-center justify-center text-center px-4 py-16 relative z-10">
      {/* 8-BIT TOP ARCADE SCORE HEADER IN SOFT PASTEL */}
      <div className="flex justify-between items-center w-full max-w-xl mb-8 font-pixel text-[9px] sm:text-[10px] text-pastel-yellow pixel-shadow">
        <div className="text-pastel-green">1UP: 02540</div>
        <div className="text-pastel-peach animate-pulse">★ INSERT PAZHAM ★</div>
        <div className="text-pastel-yellow">HIGH: 99990</div>
      </div>

      {/* Soft Pastel Studio Radial Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-pastel-yellow/10 rounded-full blur-[140px] pointer-events-none" />

      {/* PIXELATED PASTEL PAZHAM Sliding in from RIGHT (Replaces old black background photo) */}
      <div className="mb-6 relative transition-transform duration-1000 ease-out animate-[slideRight_1.1s_cubic-bezier(0.16,1,0.3,1)_0.2s_both]">
        <div
          className="relative group interactive cursor-pointer"
          onClick={handleTitleClick}
          title="Click the pixel pazham!"
        >
          <img
            src="/pastel-pixel-banana.png"
            alt="Pixel Pastel Pazham"
            className="w-48 sm:w-60 md:w-72 object-contain drop-shadow-[0_15px_30px_rgba(254,240,138,0.25)] transition-transform duration-150 group-hover:scale-110 group-hover:-rotate-6"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-44 h-4 bg-pastel-yellow/15 blur-sm" />
        </div>
      </div>

      {/* PAZHAMNESS METER Title Sliding in from LEFT in Soft Pastel Pixel Typography */}
      <div
        className="cursor-pointer select-none transition-transform duration-1000 ease-out animate-[slideLeft_1.1s_cubic-bezier(0.16,1,0.3,1)_0.4s_both]"
        onClick={handleTitleClick}
        title="Ee title-il 5 times click cheythaal oru secret und..."
      >
        <h1 className="font-pixel text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-pastel-yellow via-pastel-peach to-pastel-yellowDark pixel-shadow tracking-wider leading-[1.25]">
          PAZHAMNESS<br />
          <span className="text-pastel-yellow">METER</span>
        </h1>
      </div>

      {/* Tagline & Subtitle with Cozy Pastel Aesthetic */}
      <div className="mt-6 space-y-2.5 max-w-xl mx-auto animate-[fadeIn_1.2s_ease_0.7s_both]">
        <p className="font-pixel text-[11px] sm:text-xs text-pastel-peach tracking-wide">
          &ldquo;EVERY PAZHAM HAS A STORY.&rdquo;
        </p>
        <p className="text-zinc-400 text-xs sm:text-sm font-mono">
          The world&rsquo;s most unnecessarily serious banana investigation system.
        </p>
        <p className="pt-2 text-pastel-cream text-xs sm:text-sm font-mono">
          Upload a banana. We will determine its fate.
        </p>
      </div>

      {/* Main Upload CTA Button (Soft Pastel 8-Bit Push Button) */}
      <div className="mt-8 animate-[fadeIn_1.2s_ease_0.9s_both]">
        <button
          onClick={() => {
            sound.playWhoosh();
            onStartUpload();
          }}
          className="interactive pixel-btn-pastel px-8 py-4 bg-pastel-yellow text-dark-950 text-[10px] sm:text-xs tracking-wider flex items-center gap-3 cursor-pointer shadow-[0_4px_16px_rgba(254,240,138,0.25)]"
        >
          <span className="font-bold">START INVESTIGATION</span>
          <img
            src="/cursor-banana.png"
            alt="banana icon"
            className="w-4 h-6 object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </button>
      </div>

      {/* Down Hint */}
      <div className="mt-12 flex flex-col items-center gap-1 font-pixel text-[8px] text-zinc-500 animate-bounce">
        <span>PRESS DOWN TO PLAY</span>
        <ArrowDown className="w-3 h-3 text-pastel-yellow/60" />
      </div>
    </section>
  );
}
