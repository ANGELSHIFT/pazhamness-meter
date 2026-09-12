import React from 'react';
import { Microscope } from 'lucide-react';

export default function ScientificReport({ analysis }) {
  const stats = analysis?.scientificStats || {
    yellownessQuotient: 82,
    spotDensityRatio: 27,
    emotionalStability: 63,
    survivalProbability: 31,
    pazhamnessIndex: 92.7
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="pixel-card bg-dark-900 p-7 sm:p-8 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b-2 border-dashed border-dark-700 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Microscope className="w-5 h-5 text-banana-400" />
            <h4 className="font-pixel text-xs sm:text-sm text-banana-200">
              OFFICIAL SCIENTIFIC STATS
            </h4>
          </div>
          <span className="font-pixel text-[8px] text-zinc-500 uppercase">
            8-BIT LABS
          </span>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-pixel">
          <div className="p-4 bg-dark-800 border-2 border-dark-700 flex flex-col justify-between">
            <span className="text-[8px] text-zinc-400">YELLOWNESS</span>
            <div className="mt-2 text-2xl font-bold text-banana-300 pixel-shadow">
              {stats.yellownessQuotient}%
            </div>
          </div>

          <div className="p-4 bg-dark-800 border-2 border-dark-700 flex flex-col justify-between">
            <span className="text-[8px] text-zinc-400">SPOT DENSITY</span>
            <div className="mt-2 text-2xl font-bold text-amber-500 pixel-shadow">
              {stats.spotDensityRatio}%
            </div>
          </div>

          <div className="p-4 bg-dark-800 border-2 border-dark-700 flex flex-col justify-between">
            <span className="text-[8px] text-zinc-400">EMOTIONAL STABILITY</span>
            <div className="mt-2 text-2xl font-bold text-blue-400 pixel-shadow">
              {stats.emotionalStability}%
            </div>
          </div>

          <div className="p-4 bg-dark-800 border-2 border-dark-700 flex flex-col justify-between">
            <span className="text-[8px] text-zinc-400">SURVIVAL CHANCE</span>
            <div className="mt-2 text-2xl font-bold text-green-400 pixel-shadow">
              {stats.survivalProbability}%
            </div>
          </div>
        </div>

        {/* Master Index */}
        <div className="mt-5 p-4 bg-dark-850 border-2 border-banana-500/60 flex items-center justify-between font-pixel">
          <div>
            <div className="text-[9px] text-banana-400 uppercase">
              PAZHAMNESS INDEX
            </div>
            <div className="text-[7px] text-zinc-500 mt-1">
              SCIENTIFIC OPTICAL SPECTRUM
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-banana-200 pixel-shadow">
            {stats.pazhamnessIndex}
          </div>
        </div>

        <p className="text-center font-pixel text-[8px] text-zinc-500 mt-5">
          COMPLETELY UNNECESSARY SCIENTIFIC MEASUREMENT.
        </p>
      </div>
    </div>
  );
}
