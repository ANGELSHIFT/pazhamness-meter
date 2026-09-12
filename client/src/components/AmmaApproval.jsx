import React, { useEffect, useState } from 'react';
import { UserCheck } from 'lucide-react';
import { sound } from './SoundEffects';

export default function AmmaApproval({ analysis }) {
  const amma = analysis?.ammaApproval || {
    verdict: 'Ithu ippozhum pacha aanu.',
    approvalRate: 34,
    reaction: 'Amma does not trust the AI.'
  };

  const [meterWidth, setMeterWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMeterWidth(amma.approvalRate);
    }, 400);
    return () => clearTimeout(timer);
  }, [amma.approvalRate]);

  return (
    <div className="max-w-xl mx-auto my-10 p-6 pixel-card bg-dark-900/90 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-6 border-b-2 border-dashed border-dark-700 pb-3">
        <div className="flex items-center gap-2 text-banana-300 font-pixel text-xs sm:text-sm">
          <UserCheck className="w-4 h-4 text-banana-400" />
          <span>AMMA APPROVAL SYSTEM</span>
        </div>
        <span className="text-[8px] font-pixel text-zinc-500 uppercase">
          KERALA BOSS GAUGE
        </span>
      </div>

      {/* 8-Bit Comparison Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-dark-850 border-2 border-dark-700">
          <div className="text-[8px] font-pixel text-zinc-400 uppercase">
            AI VERDICT
          </div>
          <div className="mt-2 font-pixel text-xs text-banana-100">
            {analysis?.title || 'PERFECT PAZHAM'}
          </div>
          <div className="text-[8px] text-zinc-500 font-pixel mt-1">
            CONFIDENCE: {analysis?.confidence || '96.2'}%
          </div>
        </div>

        <div className="p-4 bg-dark-850 border-2 border-banana-500/50">
          <div className="text-[8px] font-pixel text-banana-400 uppercase">
            AMMA VERDICT
          </div>
          <div className="mt-2 font-pixel text-xs text-banana-300">
            &ldquo;{amma.verdict}&rdquo;
          </div>
          <div className="text-[8px] text-amber-400 font-pixel mt-1">
            AUTHORITY: 100% SUPREME
          </div>
        </div>
      </div>

      {/* 8-Bit Concurrence Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[9px] font-pixel">
          <span className="text-zinc-400">AMMA CONCURRENCE RATING</span>
          <span className="text-sm font-bold text-banana-400">
            {meterWidth}%
          </span>
        </div>
        <div className="h-4 bg-dark-800 border-2 border-dark-600 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-600 via-banana-400 to-green-500 transition-all duration-1000 ease-out"
            style={{ width: `${meterWidth}%` }}
          />
        </div>
      </div>

      {/* Amma Reaction Subtitle */}
      <div className="mt-5 p-3 bg-dark-950 border border-dark-700 text-center font-pixel text-[9px] text-zinc-300 leading-relaxed">
        &ldquo;{amma.reaction}&rdquo;
      </div>
    </div>
  );
}
