import React, { useState, useEffect } from 'react';
import PazhamLifeLine from './PazhamLifeLine';
import RemainingLifeMeter from './RemainingLifeMeter';
import AmmaApproval from './AmmaApproval';
import PazhamPassport from './PazhamPassport';
import PazhamCourt from './PazhamCourt';
import BananaPersonality from './BananaPersonality';
import ScientificReport from './ScientificReport';
import ExtraInteractions from './ExtraInteractions';
import ShareReport from './ShareReport';
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from './SoundEffects';

export default function ResultPage({ analysis, onReset, onGraveEasterEgg }) {
  const [currentPage, setCurrentPage] = useState(1);

  // 8 Organized Parameter Pages
  const pages = [
    { id: 1, label: 'VERDICT', short: 'VERDICT', icon: '★', color: 'pastel-yellow' },
    { id: 2, label: 'LIFE LINE', short: 'LIFELINE', icon: '🌱', color: 'pastel-green' },
    { id: 3, label: 'AMMA RATING', short: 'AMMA', icon: '👩', color: 'pastel-pink' },
    { id: 4, label: 'PASSPORT', short: 'PASSPORT', icon: '📜', color: 'pastel-lavender' },
    { id: 5, label: 'COURT TRIAL', short: 'COURT', icon: '⚖️', color: 'pastel-peach' },
    { id: 6, label: 'PERSONALITY', short: 'TRAITS', icon: '✨', color: 'pastel-yellow' },
    { id: 7, label: 'SCIENTIFIC', short: 'STATS', icon: '🔬', color: 'pastel-green' },
    { id: 8, label: 'DESTINY', short: 'SHARE', icon: '🏆', color: 'pastel-peach' },
  ];

  const totalPages = pages.length;

  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    sound.playScanBeep();
    setCurrentPage(pageNumber);
  };

  // Keyboard arrow keys navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'd') {
        goToPage(Math.min(totalPages, currentPage + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        goToPage(Math.max(1, currentPage - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Soft pastel dynamic background transition
  useEffect(() => {
    const pastelBgs = {
      PACHA_PAZHAM: '#0D1711',
      ALMOST_THERE: '#17160D',
      PERFECT_PAZHAM: '#1A170F',
      OVERRIPE: '#1A140F',
      RETIREMENT_HOME: '#17100D',
    };
    const targetBg = pastelBgs[analysis?.category] || '#12100E';
    document.body.style.backgroundColor = targetBg;

    return () => {
      document.body.style.backgroundColor = '#12100E';
    };
  }, [analysis]);

  return (
    <div className="relative z-20 py-8 px-3 max-w-4xl mx-auto">

      {/* TOP COMPACT 8-BIT AI INSPECTION HUD */}
      <div className="pixel-card-pastel p-4 mb-6 flex flex-wrap items-center justify-between gap-3 font-pixel text-[9px]">
        <div className="flex items-center gap-2.5">
          <img
            src="/cursor-banana.png"
            alt="mini banana"
            className="w-4 h-6 object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
          <div>
            <span className="text-pastel-yellow font-bold">PAZHAM: {analysis?.passport?.name || 'SUBJECT'}</span>
            <span className="text-zinc-500 ml-2">[{analysis?.title || 'ANALYSED'}]</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-zinc-400">PARAMETER:</span>
          <span className="px-2 py-0.5 bg-dark-900 border border-pastel-yellow text-pastel-yellow font-bold">
            {currentPage} / {totalPages}
          </span>
        </div>
      </div>

      {/* PARAMETER STAGE SELECTOR TABS (8-Bit Stepped Buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none font-pixel text-[8px]">
        {pages.map((p) => {
          const isActive = currentPage === p.id;
          return (
            <button
              key={p.id}
              onClick={() => goToPage(p.id)}
              className={`flex-none px-3 py-2 border-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-pastel-yellow text-dark-950 border-black shadow-[2px_2px_0px_#000] scale-105 font-bold'
                  : 'bg-dark-900/90 text-zinc-400 border-dark-700 hover:border-pastel-yellow/60 hover:text-zinc-200'
              }`}
            >
              <span>{p.id}: {p.short}</span>
            </button>
          );
        })}
      </div>

      {/* MAIN PARAMETER VIEWPORT (COMPACT & FOCUSED AI TERMINAL FORMAT) */}
      <div className="relative min-h-[460px] flex flex-col justify-center">

        {/* PAGE 1: VERDICT & MASTER SCORE */}
        {currentPage === 1 && (
          <div className="page-flip-anim max-w-xl mx-auto w-full">
            <div className="pixel-card-pastel p-6 sm:p-8 text-center">
              <div className="inline-block px-3 py-1 bg-dark-900 border border-pastel-yellow font-pixel text-[8px] text-pastel-yellow mb-4 shadow-[2px_2px_0px_#000]">
                ★ STAGE 1 &bull; OFFICIAL AI VERDICT ★
              </div>

              <div className="flex items-center justify-center gap-3 my-2">
                <img
                  src="/cursor-banana.png"
                  alt="result banana"
                  className="w-8 h-10 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
                <h2 className="font-pixel text-xl sm:text-2xl text-pastel-yellow pixel-shadow tracking-wide">
                  {analysis?.title || 'PERFECT PAZHAM'}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3.5 my-6 font-pixel">
                <div className="p-4 bg-dark-900 border-2 border-dark-750 shadow-[2px_2px_0px_#000]">
                  <span className="text-[8px] text-zinc-400">SCORE</span>
                  <div className="mt-2 text-2xl font-bold text-pastel-yellow pixel-shadow">
                    {analysis?.score || 92.7}
                    <span className="text-[9px] text-zinc-500 ml-1">/100</span>
                  </div>
                </div>

                <div className="p-4 bg-dark-900 border-2 border-dark-750 shadow-[2px_2px_0px_#000]">
                  <span className="text-[8px] text-zinc-400">ESTIMATED LIFE</span>
                  <div className="mt-2 text-xl font-bold text-pastel-peach pixel-shadow">
                    {analysis?.remainingDays || '2-3'}
                    <span className="text-[9px] text-zinc-500 ml-1">DAYS</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-dark-900/90 border border-dark-700 text-center font-pixel text-[8px] text-zinc-300 leading-relaxed">
                CONFIDENCE: {analysis?.confidence || '96.4'}% &bull; KERALA COMPUTER VISION DEPT
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2: SIGNATURE PAZHAM LIFE LINE & REMAINING METER */}
        {currentPage === 2 && (
          <div className="page-flip-anim w-full">
            <div className="pixel-card-pastel-green p-5 sm:p-7">
              <div className="text-center mb-2 font-pixel text-[8px] text-pastel-green">
                ★ STAGE 2 &bull; THE PAZHAM LIFE LINE ★
              </div>
              <PazhamLifeLine analysis={analysis} onGraveClick={onGraveEasterEgg} />
              <RemainingLifeMeter analysis={analysis} />
            </div>
          </div>
        )}

        {/* PAGE 3: AMMA APPROVAL SYSTEM */}
        {currentPage === 3 && (
          <div className="page-flip-anim max-w-xl mx-auto w-full">
            <AmmaApproval analysis={analysis} />
          </div>
        )}

        {/* PAGE 4: PAZHAM PASSPORT */}
        {currentPage === 4 && (
          <div className="page-flip-anim max-w-md mx-auto w-full">
            <PazhamPassport analysis={analysis} />
          </div>
        )}

        {/* PAGE 5: THE PAZHAM COURT */}
        {currentPage === 5 && (
          <div className="page-flip-anim max-w-2xl mx-auto w-full">
            <PazhamCourt analysis={analysis} />
          </div>
        )}

        {/* PAGE 6: PERSONALITY & MOOD */}
        {currentPage === 6 && (
          <div className="page-flip-anim max-w-xl mx-auto w-full">
            <BananaPersonality analysis={analysis} />
          </div>
        )}

        {/* PAGE 7: SCIENTIFIC STATS */}
        {currentPage === 7 && (
          <div className="page-flip-anim max-w-2xl mx-auto w-full">
            <ScientificReport analysis={analysis} />
          </div>
        )}

        {/* PAGE 8: DESTINY & SHARE */}
        {currentPage === 8 && (
          <div className="page-flip-anim max-w-xl mx-auto w-full">
            <div className="pixel-card-pastel-peach p-6 text-center">
              <div className="font-pixel text-[8px] text-pastel-peach mb-4">
                ★ STAGE 8 &bull; FINAL DESTINY &amp; REPORT CARD ★
              </div>
              <ExtraInteractions analysis={analysis} />
              <ShareReport analysis={analysis} onReset={onReset} />
            </div>
          </div>
        )}

      </div>

      {/* BOTTOM 8-BIT CONTROLLER (PREV / NEXT NAVIGATION) */}
      <div className="mt-8 pixel-card-pastel p-4 flex items-center justify-between gap-4 font-pixel text-[9px]">
        {/* Previous Button */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`pixel-btn-pastel px-4 py-2.5 flex items-center gap-1.5 cursor-pointer ${
            currentPage === 1
              ? 'opacity-40 cursor-not-allowed bg-dark-800 text-zinc-500'
              : 'bg-dark-850 text-pastel-yellow hover:bg-dark-800'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>PREV</span>
        </button>

        {/* Page Step Dots */}
        <div className="flex items-center gap-1.5">
          {pages.map((p) => (
            <button
              key={p.id}
              onClick={() => goToPage(p.id)}
              className={`w-2.5 h-2.5 transition-all cursor-pointer ${
                currentPage === p.id
                  ? 'bg-pastel-yellow scale-125 shadow-[1px_1px_0px_#000]'
                  : 'bg-dark-700 hover:bg-zinc-500'
              }`}
              title={`Jump to Page ${p.id}: ${p.label}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`pixel-btn-pastel px-4 py-2.5 flex items-center gap-1.5 cursor-pointer ${
            currentPage === totalPages
              ? 'opacity-40 cursor-not-allowed bg-dark-800 text-zinc-500'
              : 'bg-pastel-yellow text-dark-950 font-bold'
          }`}
        >
          <span>NEXT</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
