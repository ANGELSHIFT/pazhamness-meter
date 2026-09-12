import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-dark-800 py-12 px-4 text-center text-zinc-500 relative z-20">
      <div className="max-w-md mx-auto space-y-3">
        <p className="font-display italic text-sm text-zinc-400">
          &ldquo;Made with questionable science, unnecessary ambition, and one very suspicious banana.&rdquo;
        </p>

        <div className="flex items-center justify-center gap-2 pt-2">
          <img
            src="/cursor-banana.png"
            alt="footer banana"
            className="w-4 h-6 object-contain"
          />
          <span className="font-display font-black text-lg tracking-wider text-banana-200">
            PAZHAMNESS METER
          </span>
        </div>

        <p className="font-display italic text-xs text-banana-400/80">
          &ldquo;Every Pazham Has A Story.&rdquo;
        </p>

        <div className="pt-4 text-[10px] font-mono text-zinc-600">
          Kerala Banana Vision Dept &bull; State Fruit Affairs Tribunal &bull; All Rights Reserved 2026
        </div>
      </div>
    </footer>
  );
}
