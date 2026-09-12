import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Share2, RotateCcw, Check } from 'lucide-react';
import { sound } from './SoundEffects';

export default function ShareReport({ analysis, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    sound.playCelebrate();
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#FBBF24', '#F59E0B', '#4ADE80', '#D97706'],
      });
    } catch (e) {}

    const text = `🍌 PAZHAMNESS METER 8-BIT REPORT\n` +
      `Status: ${analysis?.title || 'PERFECT PAZHAM'}\n` +
      `Pazhamness Score: ${analysis?.score || 92.7} / 100\n` +
      `Remaining Life: ${analysis?.remainingDays || '2-3'} Days\n` +
      `Personality: ${analysis?.personality?.name || 'THE GOLDEN CHILD'}\n` +
      `Court Verdict: ${analysis?.court?.verdict || 'NOT GUILTY'}\n` +
      `Amma Verdict: "${analysis?.ammaApproval?.verdict || 'Kollam'}"\n` +
      `https://pazhamness.meter.internal`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="my-14 text-center px-4 font-pixel">
      <div className="flex flex-wrap items-center justify-center gap-5">
        {/* 8-bit Share Button */}
        <button
          onClick={handleShare}
          className="interactive pixel-btn px-6 py-3.5 bg-dark-850 text-banana-200 text-[10px] flex items-center gap-2 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-green-300">REPORT COPIED!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-banana-400" />
              <span>SHARE REPORT</span>
            </>
          )}
        </button>

        {/* 8-bit Reset Button */}
        <button
          onClick={() => {
            sound.playWhoosh();
            onReset();
          }}
          className="interactive pixel-btn px-7 py-3.5 bg-banana-500 text-dark-950 text-[10px] flex items-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RETRY / NEW PAZHAM</span>
          <img
            src="/cursor-banana.png"
            alt="banana icon"
            className="w-4 h-5 object-contain ml-1"
          />
        </button>
      </div>

      <p className="text-[8px] text-zinc-500 mt-5">
        &bull; GAME DATA SAVED TO BANANA ARCHIVE &bull;
      </p>
    </div>
  );
}
