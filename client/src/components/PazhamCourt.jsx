import React, { useState } from 'react';
import { Scale, Gavel, FileText } from 'lucide-react';
import { sound } from './SoundEffects';

export default function PazhamCourt({ analysis }) {
  const [gavelBanged, setGavelBanged] = useState(false);
  const court = analysis?.court || {
    caseNo: 'PZM-2026-481',
    prosecution: 'Lord Court! Ee pazham counter-il kidannu unnecessarily over-ripe aayi! Counter breakfast plan thakarthu!',
    defence: 'My client claims he still has potential! Pazham pori aakkan pattum, or at least banana shake!',
    verdict: 'GUILTY OF BEING TOO RIPE',
    sentence: 'Sentenced to compulsory Pazham Pori duty in hot coconut oil!'
  };

  const handleBangGavel = () => {
    sound.playGavel();
    setGavelBanged(true);
    setTimeout(() => setGavelBanged(false), 800);
  };

  return (
    <div className="max-w-2xl mx-auto my-12 px-4">
      <div className="pixel-card bg-dark-900 p-7 sm:p-8 backdrop-blur-2xl relative overflow-hidden">
        {/* Court Header */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-dark-700 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-dark-800 border-2 border-amber-500 flex items-center justify-center text-amber-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-pixel text-sm sm:text-base text-banana-200">
                THE PAZHAM COURT
              </h4>
              <p className="font-pixel text-[8px] text-zinc-400 mt-1">
                TRIAL: THE PEOPLE VS. PAZHAM ({court.caseNo})
              </p>
            </div>
          </div>

          {/* 8-bit Clickable Gavel */}
          <button
            onClick={handleBangGavel}
            className={`pixel-btn px-3 py-2 bg-amber-600 text-dark-950 flex items-center gap-1.5 cursor-pointer ${
              gavelBanged ? 'gavel-strike-anim bg-amber-400' : ''
            }`}
            title="Bang the Gavel!"
          >
            <Gavel className="w-4 h-4" />
            <span className="text-[8px]">ORDER!</span>
          </button>
        </div>

        {/* Evidence Badges */}
        <div className="mb-6 font-pixel">
          <div className="text-[8px] text-zinc-500 mb-2 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            <span>EXHIBIT EVIDENCE:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-[8px]">
            <span className="px-2.5 py-1.5 bg-dark-800 border border-dark-600 text-banana-300">
              YELLOW: {analysis?.scientificStats?.yellownessQuotient || 82}%
            </span>
            <span className="px-2.5 py-1.5 bg-dark-800 border border-dark-600 text-amber-400">
              SPOTS: {analysis?.scientificStats?.spotDensityRatio || 24}%
            </span>
            <span className="px-2.5 py-1.5 bg-dark-800 border border-dark-600 text-green-400">
              LIFE: {analysis?.remainingDays || '2-3'} DAYS
            </span>
            <span className="px-2.5 py-1.5 bg-dark-800 border border-dark-600 text-banana-400">
              SCORE: {analysis?.score || 92.7}
            </span>
          </div>
        </div>

        {/* 8-Bit Prosecution & Defence Arguments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 font-pixel">
          <div className="p-4 bg-dark-850 border-2 border-red-500/40">
            <div className="text-[8px] uppercase text-red-400 font-bold mb-2">
              PROSECUTION:
            </div>
            <p className="text-[9px] text-zinc-300 leading-relaxed font-mono">
              &ldquo;{court.prosecution}&rdquo;
            </p>
          </div>

          <div className="p-4 bg-dark-850 border-2 border-green-500/40">
            <div className="text-[8px] uppercase text-green-400 font-bold mb-2">
              DEFENCE:
            </div>
            <p className="text-[9px] text-zinc-300 leading-relaxed font-mono">
              &ldquo;{court.defence}&rdquo;
            </p>
          </div>
        </div>

        {/* Verdict Box */}
        <div className="p-5 bg-dark-950 border-2 border-banana-400 text-center font-pixel shadow-[4px_4px_0px_#000]">
          <div className="text-[8px] uppercase tracking-widest text-banana-400 mb-2">
            ★ JUDICIAL VERDICT ★
          </div>
          <div className="text-base sm:text-lg text-banana-100 pixel-shadow">
            {court.verdict}
          </div>
          <div className="mt-3 text-[9px] text-zinc-400 max-w-md mx-auto font-mono">
            {court.sentence}
          </div>
        </div>
      </div>
    </div>
  );
}
