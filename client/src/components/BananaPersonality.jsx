import React from 'react';
import { Sparkles } from 'lucide-react';

export default function BananaPersonality({ analysis }) {
  const personality = analysis?.personality || {
    name: 'THE GOLDEN CHILD',
    desc: 'Kudumbathinte aishwaryam! Peaked at the exact right moment. Universally adored. Everyone wants a piece.'
  };

  return (
    <div className="max-w-xl mx-auto my-10 px-4 text-center">
      <div className="pixel-card bg-dark-900 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="font-pixel text-[8px] tracking-widest text-zinc-500 uppercase mb-3">
          ★ CHARACTER PROFILE ★
        </div>
        <div className="inline-flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-4 h-4 text-banana-400" />
          <h4 className="font-pixel text-base sm:text-lg text-banana-200 pixel-shadow">
            {personality.name}
          </h4>
          <Sparkles className="w-4 h-4 text-banana-400" />
        </div>
        <p className="font-pixel text-[10px] text-zinc-300 max-w-md mx-auto leading-relaxed">
          &ldquo;{personality.desc}&rdquo;
        </p>
      </div>
    </div>
  );
}
