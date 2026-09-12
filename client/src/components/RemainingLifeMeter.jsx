import React from 'react';
import { HelpCircle } from 'lucide-react';

export default function RemainingLifeMeter({ analysis }) {
  const remainingDays = analysis?.remainingDays || '2-3';
  const pos = analysis?.lifeLinePos || 55;
  const remainingPct = Math.max(5, 100 - pos);

  return (
    <div className="my-10 max-w-xl mx-auto text-center px-4">
      <div className="font-pixel text-[9px] tracking-widest text-zinc-400 uppercase mb-3">
        &hearts; REMAINING PAZHAM HP &bull; EDIBLE LIFE &hearts;
      </div>

      {/* 8-Bit Chunky Mario Life Meter */}
      <div className="relative flex items-center gap-3 my-4">
        <img
          src="/cursor-banana.png"
          alt="banana"
          className="w-5 h-7 object-contain flex-none"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Chunky Pixel Bar */}
        <div className="relative flex-1 h-5 bg-dark-900 border-2 border-banana-400 p-0.5 shadow-[2px_2px_0px_#000]">
          <div
            className="h-full bg-gradient-to-r from-banana-400 via-amber-500 to-red-500 transition-all duration-1000"
            style={{ width: `${remainingPct}%` }}
          />
        </div>

        <svg viewBox="0 0 64 64" className="w-5 h-5 flex-none fill-zinc-500">
          <path d="M18,58 L18,26 C18,13 46,13 46,26 L46,58 Z" />
        </svg>
      </div>

      {/* Main Estimate Text */}
      <div className="mt-3 font-pixel">
        <p className="text-xs text-banana-200">
          ESTIMATED REMAINING EDIBLE LIFE:
        </p>
        <div className="text-xl sm:text-2xl text-banana-400 mt-2 pixel-shadow">
          {remainingDays} {remainingDays.includes('TODAY') ? '' : 'DAYS'}
        </div>
      </div>

      {/* Playful Disclaimer */}
      <div className="group relative inline-flex items-center gap-1.5 mt-3 cursor-help text-[9px] font-pixel text-zinc-500 hover:text-zinc-300 transition-colors">
        <HelpCircle className="w-3 h-3" />
        <span className="underline decoration-dotted">
          Not a food-safety prediction. Grandma may disagree.
        </span>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pixel-card bg-dark-950 text-banana-300 text-[8px] font-pixel py-1.5 px-3 whitespace-nowrap pointer-events-none z-20">
          Based on absolutely no guarantee whatsoever.
        </div>
      </div>
    </div>
  );
}
