import React, { useState } from 'react';
import { Volume2, VolumeX, FastForward } from 'lucide-react';

export default function BananaBorder() {
  const [speedMode, setSpeedMode] = useState('normal'); // 'normal', 'turbo', 'calm', 'hidden'

  // Bananas in a column (repeated twice for 100% seamless infinite vertical looping)
  const bananas = Array.from({ length: 12 });

  if (speedMode === 'hidden') {
    return (
      <button
        onClick={() => setSpeedMode('normal')}
        className="fixed bottom-4 left-4 z-40 px-3 py-1.5 rounded-full bg-dark-900/80 border border-banana-500/30 text-banana-400 text-xs font-mono backdrop-blur-md hover:border-banana-400 hover:text-banana-200 transition-all interactive"
        title="Dancing Bananas thirichu kondu varaan click cheyyu"
      >
        🍌 Dancing Pazhams: OFF (Show)
      </button>
    );
  }

  const getAnimClass = (type, direction) => {
    if (speedMode === 'turbo') {
      return direction === 'up' ? 'banana-scroll-up [animation-duration:8s]' : 'banana-scroll-down [animation-duration:8s]';
    }
    if (speedMode === 'calm') {
      return direction === 'up' ? 'banana-scroll-slow-up [animation-duration:32s]' : 'banana-scroll-slow-down [animation-duration:32s]';
    }
    // Normal
    if (type === 'outer') {
      return direction === 'up' ? 'banana-scroll-up' : 'banana-scroll-down';
    } else {
      return direction === 'up' ? 'banana-scroll-slow-up' : 'banana-scroll-slow-down';
    }
  };

  const renderColumn = (direction, type) => (
    <div className={`flex flex-col items-center gap-6 py-4 ${getAnimClass(type, direction)}`}>
      {bananas.concat(bananas).map((_, idx) => (
        <div
          key={idx}
          className="relative flex-none transition-transform hover:scale-125 duration-200"
        >
          <img
            src="/dancing-banana.gif"
            alt="Dancing Pazham"
            className="w-9 h-9 object-contain drop-shadow-[0_4px_10px_rgba(251,191,36,0.3)] filter brightness-105"
            loading="eager"
          />
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Outer Left Column */}
      <aside
        aria-label="Outer Left Dancing Bananas"
        className="fixed top-0 bottom-0 left-2 w-11 z-20 pointer-events-none overflow-hidden opacity-90 hidden lg:block"
      >
        {renderColumn('up', 'outer')}
      </aside>

      {/* Inner Left Column */}
      <aside
        aria-label="Inner Left Dancing Bananas"
        className="fixed top-0 bottom-0 left-16 w-11 z-20 pointer-events-none overflow-hidden opacity-60 hidden xl:block"
      >
        {renderColumn('down', 'inner')}
      </aside>

      {/* Inner Right Column */}
      <aside
        aria-label="Inner Right Dancing Bananas"
        className="fixed top-0 bottom-0 right-16 w-11 z-20 pointer-events-none overflow-hidden opacity-60 hidden xl:block"
      >
        {renderColumn('up', 'inner')}
      </aside>

      {/* Outer Right Column */}
      <aside
        aria-label="Outer Right Dancing Bananas"
        className="fixed top-0 bottom-0 right-2 w-11 z-20 pointer-events-none overflow-hidden opacity-90 hidden lg:block"
      >
        {renderColumn('down', 'outer')}
      </aside>

      {/* Speed & Stream Mode Controller Button */}
      <div className="fixed bottom-4 left-4 z-40 hidden md:flex items-center gap-2">
        <button
          onClick={() => {
            const modes = ['normal', 'turbo', 'calm', 'hidden'];
            const next = modes[(modes.indexOf(speedMode) + 1) % modes.length];
            setSpeedMode(next);
          }}
          className="px-3 py-1.5 rounded-full bg-dark-900/90 border border-banana-500/30 text-banana-300 text-xs font-mono backdrop-blur-md hover:border-banana-400 hover:text-white transition-all shadow-lg interactive flex items-center gap-1.5"
          title="Dancing Pazham streams mode switch"
        >
          <FastForward className="w-3.5 h-3.5 text-banana-400" />
          <span>Bananas: <strong className="text-banana-200 uppercase">{speedMode}</strong></span>
        </button>
      </div>
    </>
  );
}
