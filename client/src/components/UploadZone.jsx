import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { sound } from './SoundEffects';

export default function UploadZone({ onImageSelected, onErrorToast }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const validateAndProcess = (file) => {
    if (!file) return;

    if (!acceptedTypes.includes(file.type)) {
      sound.playSquish();
      onErrorToast('ITHU PAZHAM ALLA 😭', 'Please upload an actual image file (JPG, PNG, or WEBP).');
      return;
    }

    setIsProcessing(true);
    sound.playScanBeep();

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        analyzeImageCanvas(img, dataUrl);
      };
      img.onerror = () => {
        setIsProcessing(false);
        onErrorToast('ITHU PAZHAM ALLA 😭', 'Corrupt or unreadable image file.');
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const analyzeImageCanvas = (img, dataUrl) => {
    try {
      const canvas = document.createElement('canvas');
      const size = 64;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, size, size);

      const imgData = ctx.getImageData(0, 0, size, size).data;
      let rSum = 0, gSum = 0, bSum = 0;
      let totalPixels = 0;
      let darkPixels = 0;
      let greenPixels = 0;
      let yellowPixels = 0;

      const luminances = [];

      for (let i = 0; i < imgData.length; i += 4) {
        const r = imgData[i];
        const g = imgData[i + 1];
        const b = imgData[i + 2];
        const a = imgData[i + 3];

        if (a < 20) continue;

        rSum += r;
        gSum += g;
        bSum += b;
        totalPixels++;

        const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        luminances.push(lum);

        const rn = r / 255, gn = g / 255, bn = b / 255;
        const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max !== min) {
          const d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch (max) {
            case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
            case gn: h = (bn - rn) / d + 2; break;
            case bn: h = (rn - gn) / d + 4; break;
          }
          h *= 60;
        }

        if (h >= 65 && h <= 155 && s > 0.15) {
          greenPixels++;
        } else if (h >= 40 && h < 65 && s > 0.25 && l > 0.3) {
          yellowPixels++;
        }
      }

      const count = Math.max(1, totalPixels);
      const avgR = Math.round(rSum / count);
      const avgG = Math.round(gSum / count);
      const avgB = Math.round(bSum / count);

      const avgLum = luminances.reduce((a, b) => a + b, 0) / (luminances.length || 1);
      const spotThreshold = avgLum - 35;
      darkPixels = luminances.filter(l => l < spotThreshold).length;

      const spotDensity = Math.min(90, Math.max(3, Math.round((darkPixels / count) * 100)));

      const rn = avgR / 255, gn = avgG / 255, bn = avgB / 255;
      const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
      let h = 0, s = 0, l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
          case gn: h = (bn - rn) / d + 2; break;
          case bn: h = (rn - gn) / d + 4; break;
        }
        h *= 60;
      }

      const isSuspiciousCold = (h >= 185 && h <= 300 && s > 0.22);
      const isPureWhiteGrey = (s < 0.08 && l > 0.88);

      if (isSuspiciousCold || isPureWhiteGrey) {
        setIsProcessing(false);
        sound.playSquish();
        onErrorToast(
          'ITHU PAZHAM ALLA 😭',
          'Nammude AI nokkiyaal ithu oru banana aayi thonnunnilla! Please upload an actual banana image.'
        );
        return;
      }

      const rawAnalysis = {
        avgR,
        avgG,
        avgB,
        hue: h,
        sat: s,
        lum: l,
        spotDensity,
        greenRatio: (greenPixels / count).toFixed(2),
        yellowRatio: (yellowPixels / count).toFixed(2),
        imgDataUrl: dataUrl
      };

      setIsProcessing(false);
      onImageSelected(rawAnalysis);
    } catch (err) {
      console.error('Canvas analysis error:', err);
      setIsProcessing(false);
      onImageSelected({
        avgR: 220,
        avgG: 190,
        avgB: 50,
        spotDensity: 12,
        imgDataUrl: dataUrl
      });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <section id="upload-section" className="max-w-2xl mx-auto px-4 py-12 relative z-20">
      {/* Pixel Card Container */}
      <div className="relative pixel-card bg-dark-900/90 p-8 sm:p-10 backdrop-blur-xl">

        {/* 8-BIT MARIO HUD HEADER */}
        <div className="flex justify-between items-center pb-4 mb-6 border-b-2 border-dashed border-banana-500/40 font-pixel text-[10px] text-banana-400">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 bg-red-500 animate-pulse" />
            <span>WORLD 1-1</span>
          </div>
          <div className="text-zinc-400">COINS &times; 99</div>
          <div className="text-green-400">STAGE: UPLOAD</div>
        </div>

        {/* MINION & "POWER... GLORY... BANANAAAAAA!" DIALOGUE */}
        <div className="text-center mb-8 flex flex-col items-center">
          {/* Minion Bob Image (Kept Untouched as Requested) */}
          <div
            className="relative mb-3 group cursor-pointer"
            onClick={() => sound.playCelebrate()}
            title="Click to hear Bob celebrate!"
          >
            <img
              src="/minion_banana_speech.png"
              alt="Minion Bob shouting Banana"
              className="w-36 sm:w-44 object-contain drop-shadow-[0_15px_30px_rgba(251,191,36,0.4)] transition-transform duration-200 group-hover:scale-110"
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-3 bg-banana-500/30 rounded-none blur-sm" />
          </div>

          {/* Dialogue: POWER... GLORY... BANANAAAAAA! */}
          <div className="relative inline-block mt-1">
            <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-banana-300 pixel-shadow tracking-wider leading-relaxed">
              &ldquo;POWER... GLORY... BANANAAAAAA!&rdquo;
            </h2>
            <div className="font-pixel text-[9px] text-amber-400 mt-2 tracking-widest uppercase">
              ★ KING BOB HAS SPOKEN &bull; DROP THE SACRED FRUIT ★
            </div>
          </div>
        </div>

        {/* PHOTO UPLOADER - CLEAN PUNCHY "DROP THE PHOTO" WITH MARIO PIXEL VIBE */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`interactive relative cursor-pointer border-4 border-dashed transition-all duration-150 p-8 sm:p-14 text-center flex flex-col items-center justify-center ${
            isDragging
              ? 'border-banana-300 bg-banana-500/20 scale-[1.01]'
              : 'border-dark-600 hover:border-banana-400 bg-dark-850/80 hover:bg-dark-800'
          }`}
          style={{ imageRendering: 'pixelated' }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                validateAndProcess(e.target.files[0]);
              }
            }}
            className="hidden"
          />

          <div className="w-16 h-16 bg-dark-800 border-2 border-banana-400 flex items-center justify-center text-banana-400 mb-4 shadow-[3px_3px_0px_#000]">
            <UploadCloud className="w-8 h-8" />
          </div>

          {/* EXACT TEXT: "Drop the photo" */}
          <h3 className="font-pixel text-lg sm:text-2xl text-banana-100 tracking-wide pixel-shadow">
            DROP THE PHOTO
          </h3>
          <p className="font-pixel text-[10px] text-zinc-400 mt-3">
            [ OR CLICK TO CHOOSE FILE ]
          </p>

          <div className="mt-7">
            <button
              type="button"
              className="pixel-btn px-6 py-3 bg-banana-500 text-dark-950 flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              <span>SELECT PAZHAM</span>
            </button>
          </div>

          {isProcessing && (
            <div className="absolute inset-0 bg-dark-950/90 flex flex-col items-center justify-center gap-3 backdrop-blur-sm z-10">
              <div className="w-8 h-8 border-4 border-banana-400 border-t-transparent animate-spin" />
              <p className="font-pixel text-[10px] text-banana-300 animate-pulse">
                SCANNING PIXELS...
              </p>
            </div>
          )}
        </div>

        {/* 8-bit Footer Note */}
        <div className="mt-6 text-center font-pixel text-[8px] text-zinc-500 tracking-wider">
          SUPPORTED: JPG &bull; PNG &bull; WEBP &bull; ZERO NON-PAZHAMS
        </div>
      </div>
    </section>
  );
}
