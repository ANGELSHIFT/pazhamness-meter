import React, { useEffect, useState } from 'react';
import { sound } from './SoundEffects';

export default function PazhamLifeLine({ analysis, onGraveClick }) {
  const targetPos = analysis?.lifeLinePos || 55;
  const [animatedPos, setAnimatedPos] = useState(2);
  const [activeStageKey, setActiveStageKey] = useState('perfect');

  const stages = [
    {
      key: 'birth',
      pos: 2,
      label: 'LVL 1: VAZHA',
      sublabel: 'Birth',
      color: '#4ADE80',
      tooltip: 'Where it all began. Spawned at Vazha!'
    },
    {
      key: 'pacha',
      pos: 15,
      label: 'LVL 2: PACHA',
      sublabel: 'Green',
      color: '#22C55E',
      tooltip: 'Still has unfinished business. Pacha aanu!'
    },
    {
      key: 'almost',
      pos: 36,
      label: 'LVL 3: ALMOST',
      sublabel: 'Turning Yellow',
      color: '#FACC15',
      tooltip: 'Transformation in progress. Almost ready for battle!'
    },
    {
      key: 'perfect',
      pos: 56,
      label: 'LVL 4: PERFECT',
      sublabel: 'Golden Era',
      color: '#FBBF24',
      tooltip: 'THE GOLDEN ERA. Prime Kerala breakfast companion!'
    },
    {
      key: 'overripe',
      pos: 78,
      label: 'LVL 5: OVERRIPE',
      sublabel: 'Spotted',
      color: '#F97316',
      tooltip: 'Things are getting serious. Pazham Pori candidate!'
    },
    {
      key: 'final',
      pos: 91,
      label: 'LVL 6: FINAL',
      sublabel: 'Dark Days',
      color: '#B45309',
      tooltip: 'Act responsibly. HP critically low!'
    },
    {
      key: 'rip',
      pos: 98,
      label: 'GAME OVER',
      sublabel: 'RIP',
      color: '#78350F',
      tooltip: 'Please respect the deceased. Born green, lived yellow, died brown.'
    }
  ];

  const getClosestStage = (pos) => {
    let closest = stages[0];
    let minDiff = 999;
    stages.forEach((s) => {
      const diff = Math.abs(s.pos - pos);
      if (diff < minDiff) {
        minDiff = diff;
        closest = s;
      }
    });
    return closest.key;
  };

  useEffect(() => {
    setAnimatedPos(2);
    const timeout = setTimeout(() => {
      setAnimatedPos(targetPos);
      setActiveStageKey(getClosestStage(targetPos));
    }, 350);

    return () => clearTimeout(timeout);
  }, [targetPos]);

  const markerColor =
    analysis?.category === 'PACHA_PAZHAM'
      ? '#4ADE80'
      : analysis?.category === 'ALMOST_THERE'
      ? '#FACC15'
      : analysis?.category === 'PERFECT_PAZHAM'
      ? '#FBBF24'
      : analysis?.category === 'OVERRIPE'
      ? '#F97316'
      : '#A16207';

  return (
    <div className="w-full my-12">
      {/* 8-Bit Title Header */}
      <div className="text-center mb-8">
        <div className="inline-block px-3 py-1 bg-dark-900 border-2 border-banana-400 font-pixel text-[9px] text-banana-300 mb-2 shadow-[2px_2px_0px_#000]">
          ★ SUPER MARIO STYLE LEVEL MAP ★
        </div>
        <h3 className="font-pixel text-xl sm:text-2xl text-banana-100 pixel-shadow tracking-wide">
          THE LIFE OF A PAZHAM
        </h3>
        <p className="font-pixel text-[9px] text-amber-400 mt-2">
          &ldquo;FROM VAZHA TO RIP: WORLD 1-1&rdquo;
        </p>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="overflow-x-auto pb-6 pt-12 px-2 scrollbar-none">
        <div className="min-w-[780px] md:min-w-full px-4">
          <div className="flex items-center justify-between gap-6">

            {/* LEFT END — VAZHA SPAWN POINT */}
            <div className="flex-none flex flex-col items-center text-center w-28 group">
              <div className="w-16 h-16 pixel-card-green bg-dark-900 flex items-center justify-center text-green-400 group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 64 64" className="w-10 h-10 fill-current">
                  <ellipse cx="32" cy="59" rx="16" ry="3" opacity="0.3" />
                  <path d="M32,58 L30,26 L34,26 Z" />
                  <path d="M32,32 C10,26 5,8 17,2 C22,15 28,24 33,31 Z" />
                  <path d="M32,32 C54,26 59,8 47,2 C42,15 36,24 31,31 Z" />
                  <path d="M31,28 C26,16 28,4 32,1 C36,4 38,16 33,28 Z" opacity="0.9" />
                </svg>
              </div>
              <div className="mt-2.5 font-pixel text-[9px] text-green-400 uppercase">
                SPAWN POINT
              </div>
              <div className="font-pixel text-[10px] text-banana-100 mt-1">
                VAZHA
              </div>
              <div className="font-pixel text-[8px] text-zinc-500 mt-1">
                WHERE IT BEGAN
              </div>
            </div>

            {/* THE HORIZONTAL PIXEL MUSIC PLAYER / LEVEL BAR */}
            <div className="relative flex-1 h-24 flex items-center mx-2">
              {/* Stepped Base Line */}
              <div className="absolute left-0 right-0 h-2 bg-dark-800 border border-dark-600" />

              {/* Pixel Illuminated Progression */}
              <div
                className="absolute left-0 h-2 bg-gradient-to-r from-green-400 via-banana-400 to-amber-500 transition-all duration-[1800ms] ease-out shadow-[0_0_10px_#FBBF24]"
                style={{ width: `${animatedPos}%` }}
              />

              {/* Stage Nodes (Chunky 8-Bit Blocks) */}
              {stages.map((stage) => {
                const isActive = activeStageKey === stage.key;
                return (
                  <div
                    key={stage.key}
                    style={{ left: `${stage.pos}%` }}
                    className="absolute -translate-x-1/2 flex flex-col items-center group cursor-pointer"
                  >
                    {/* Retro Level Block Node */}
                    <div
                      className={`w-5 h-5 border-2 transition-all duration-200 flex items-center justify-center font-pixel text-[8px] ${
                        isActive
                          ? 'scale-125 border-white bg-banana-400 text-dark-950 shadow-[3px_3px_0px_#000]'
                          : 'border-dark-600 bg-dark-900 text-zinc-500 group-hover:border-banana-400 group-hover:text-banana-200'
                      }`}
                    >
                      {isActive ? '★' : '•'}
                    </div>

                    {/* Stage Label Below */}
                    <div className="absolute top-7 flex flex-col items-center text-center whitespace-nowrap">
                      <span
                        className={`font-pixel text-[8px] transition-colors ${
                          isActive
                            ? 'text-banana-300 font-bold uppercase scale-105'
                            : 'text-zinc-500 group-hover:text-zinc-300'
                        }`}
                      >
                        {stage.label}
                      </span>
                    </div>

                    {/* Hover Tooltip (Retro Box) */}
                    <div className="absolute bottom-7 opacity-0 group-hover:opacity-100 transition-all duration-150 pointer-events-none z-30">
                      <div className="pixel-card bg-dark-950 text-banana-200 font-pixel text-[8px] py-1.5 px-3 whitespace-nowrap shadow-xl">
                        {stage.tooltip}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ANIMATED TRAVELING BANANA PIXEL SPRITE */}
              <div
                style={{
                  left: `${animatedPos}%`,
                  transition: 'left 1.8s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                className="absolute -translate-x-1/2 pointer-events-none z-20 flex flex-col items-center -top-9"
              >
                <div
                  className="p-1.5 bg-dark-950 border-2 shadow-[3px_3px_0px_#000] relative animate-pulse-glow"
                  style={{ borderColor: markerColor }}
                >
                  <img
                    src="/cursor-banana.png"
                    alt="Current banana sprite"
                    className="w-5 h-7 object-contain"
                    style={{
                      imageRendering: 'pixelated',
                      filter: `drop-shadow(0 0 6px ${markerColor})`,
                    }}
                  />
                </div>
                <div
                  className="mt-1 px-1.5 py-0.5 font-pixel text-[7px] text-dark-950 font-bold shadow-md whitespace-nowrap"
                  style={{ backgroundColor: markerColor }}
                >
                  HERE ({targetPos}%)
                </div>
              </div>
            </div>

            {/* RIGHT END — GAME OVER (Pazham Grave) */}
            <div
              onClick={() => {
                sound.playGavel();
                onGraveClick?.();
              }}
              className="interactive flex-none flex flex-col items-center text-center w-28 group cursor-pointer"
              title="Click cheythu pranamam ariyikku"
            >
              <div className="w-16 h-16 pixel-card bg-dark-900 border-zinc-600 flex items-center justify-center text-zinc-400 group-hover:scale-105 group-hover:border-banana-400 transition-all relative">
                {/* Floating Leaf */}
                <div className="absolute -top-2 -right-1 leaf-float-anim text-amber-500">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17,8 C8,10 5,16 6,20 C10,21 16,18 17,8 Z" />
                  </svg>
                </div>
                <svg viewBox="0 0 64 64" className="w-10 h-10 fill-current">
                  <ellipse cx="32" cy="59" rx="18" ry="3" opacity="0.3" />
                  <path d="M18,58 L18,26 C18,13 46,13 46,26 L46,58 Z" />
                  <rect x="29" y="24" width="6" height="14" fill="#0C0A07" />
                  <rect x="25" y="28" width="14" height="6" fill="#0C0A07" />
                </svg>
              </div>
              <div className="mt-2.5 font-pixel text-[9px] text-zinc-400 uppercase">
                GAME OVER
              </div>
              <div className="font-pixel text-[10px] text-zinc-300 mt-1">
                RIP PAZHAM
              </div>
              <div className="font-pixel text-[8px] text-zinc-500 mt-1 leading-tight">
                DIED BROWN
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
