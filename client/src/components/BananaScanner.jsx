import React, { useEffect, useState, useRef } from 'react';
import { Search, Activity, Cpu } from 'lucide-react';
import { sound } from './SoundEffects';

const dialogueLines = [
  "Ee banana kollam... emm nokkatte...",
  "Onnu zoom cheyyatte...",
  "Colour suspicious aanu...",
  "Ithu pacha aano atho ente kanninte prashnam aano?",
  "Kurachu spots undallo...",
  "Evidence collect cheyyunnu...",
  "Scientific investigation nadakkunnu...",
  "Bananaod chodikkan pattiyirunnenkil nannayene...",
  "Texture kandittu oru idea kittundu...",
  "Ee pazham oru character aanu...",
  "Final verdict edukkan pokunnu...",
  "OK... I KNOW."
];

export default function BananaScanner({ rawData, onScanComplete }) {
  const [currentLine, setCurrentLine] = useState('');
  const [dialogueIdx, setDialogueIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  const [gauges, setGauges] = useState({
    yellow: 0,
    spot: 0,
    sus: 0,
    bana: 0
  });

  const totalDuration = 6000;
  const startTimeRef = useRef(Date.now());

  // Typewriter effect
  useEffect(() => {
    if (dialogueIdx >= dialogueLines.length) return;

    const fullText = dialogueLines[dialogueIdx];
    let charIdx = 0;
    setCurrentLine('');
    sound.playScanBeep();

    const typeInterval = setInterval(() => {
      charIdx++;
      setCurrentLine(fullText.slice(0, charIdx));
      if (charIdx >= fullText.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setDialogueIdx((prev) => prev + 1);
        }, 240);
      }
    }, 28);

    return () => clearInterval(typeInterval);
  }, [dialogueIdx]);

  // Progress and pixel gauges animation
  useEffect(() => {
    const targetYellow = Math.round(Math.min(98, Math.max(10, 100 - Math.abs((rawData.hue || 50) - 50) * 1.5)));
    const targetSpot = rawData.spotDensity || 14;
    const targetSus = Math.round(45 + Math.random() * 45);
    const targetBana = Math.round(85 + Math.random() * 14);

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, Math.round((elapsed / totalDuration) * 100));
      setProgress(pct);

      const ratio = pct / 100;
      setGauges({
        yellow: Math.round(targetYellow * ratio),
        spot: Math.round(targetSpot * ratio),
        sus: Math.round(targetSus * ratio),
        bana: Math.round(targetBana * ratio),
      });

      if (pct >= 100) {
        clearInterval(timer);
        sound.playCelebrate();
        setTimeout(() => {
          onScanComplete();
        }, 500);
      }
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Pixel Framed Banana Photo */}
        <div className="relative pixel-card bg-dark-900 aspect-square overflow-hidden">
          <img
            src={rawData.imgDataUrl}
            alt="Uploaded Pazham"
            className="w-full h-full object-cover filter contrast-105"
            style={{ imageRendering: 'pixelated' }}
          />

          {/* 8-bit Scanner Laser Line */}
          <div className="absolute left-0 right-0 h-1.5 bg-banana-300 shadow-[0_0_12px_#FBBF24] scan-beam-anim" />

          {/* Floating Magnifier */}
          <div className="absolute w-12 h-12 text-banana-400 mag-float-anim drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] pointer-events-none">
            <Search className="w-full h-full" />
          </div>

          {/* Top HUD */}
          <div className="absolute top-2 left-2 right-2 flex justify-between items-center px-3 py-1 bg-dark-950/90 border border-banana-500 font-pixel text-[9px] text-banana-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-red-500 animate-ping" />
              SCAN MODE: ACTIVE
            </span>
            <span>{progress}%</span>
          </div>
        </div>

        {/* 8-bit Dialogue Bubble & Gauges */}
        <div className="flex flex-col gap-5">
          {/* Retro RPG Style Speech Box */}
          <div className="relative pixel-card bg-dark-900 p-5">
            <div className="font-pixel text-[9px] text-banana-400 mb-2.5 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>OFFICER DIALOGUE [MANGLISH]:</span>
            </div>
            <div className="min-h-[70px] flex items-center">
              <p className="font-pixel text-xs sm:text-sm text-banana-100 leading-relaxed">
                &ldquo;{currentLine}&rdquo;
                <span className="inline-block w-2.5 h-3 bg-banana-400 ml-1.5 animate-pulse" />
              </p>
            </div>
          </div>

          {/* Pixelated Chunky Health Gauges */}
          <div className="pixel-card bg-dark-900 p-5 font-pixel text-[9px] space-y-4">
            <div>
              <div className="flex justify-between mb-1 text-zinc-400">
                <span>YELLOW POWER</span>
                <span className="text-banana-300">{gauges.yellow}%</span>
              </div>
              <div className="h-3 bg-dark-800 border border-dark-600 p-0.5">
                <div
                  className="h-full bg-banana-400 transition-all duration-100"
                  style={{ width: `${gauges.yellow}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-zinc-400">
                <span>SPOT DENSITY</span>
                <span className="text-amber-500">{gauges.spot}%</span>
              </div>
              <div className="h-3 bg-dark-800 border border-dark-600 p-0.5">
                <div
                  className="h-full bg-amber-600 transition-all duration-100"
                  style={{ width: `${gauges.spot}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-zinc-400">
                <span>SUSPICION (AMMA)</span>
                <span className="text-red-400">{gauges.sus}%</span>
              </div>
              <div className="h-3 bg-dark-800 border border-dark-600 p-0.5">
                <div
                  className="h-full bg-red-500 transition-all duration-100"
                  style={{ width: `${gauges.sus}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1 text-zinc-400">
                <span>BANANAEITY CONFIDENCE</span>
                <span className="text-green-400">{gauges.bana}%</span>
              </div>
              <div className="h-3 bg-dark-800 border border-dark-600 p-0.5">
                <div
                  className="h-full bg-green-500 transition-all duration-100"
                  style={{ width: `${gauges.bana}%` }}
                />
              </div>
            </div>
          </div>

          {/* Master Progress Bar */}
          <div className="space-y-1.5 font-pixel text-[9px]">
            <div className="flex justify-between text-zinc-400">
              <span>LOADING VERDICT...</span>
              <span className="text-banana-400">{progress}%</span>
            </div>
            <div className="h-4 bg-dark-800 border-2 border-banana-500 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-green-500 via-banana-400 to-amber-500 transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
