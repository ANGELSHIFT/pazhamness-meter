import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const targetPos = useRef({ x: -100, y: -100 });
  const animFrame = useRef(null);

  useEffect(() => {
    // Detect touch / mobile
    const checkTouch = () => {
      if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
        setIsTouchDevice(true);
      }
    };
    checkTouch();

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive') ||
        target.closest('input') ||
        target.closest('label')
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive') ||
        target.closest('input') ||
        target.closest('label')
      ) {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Smooth lerp loop
    const updateCursor = () => {
      setPos((prev) => {
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;
        return {
          x: prev.x + dx * 0.45,
          y: prev.y + dy * 0.45,
        };
      });
      animFrame.current = requestAnimationFrame(updateCursor);
    };
    animFrame.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animFrame.current);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      className="fixed pointer-events-none z-[99999] transition-transform duration-75"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-35%, -35%)',
      }}
    >
      <div className={`relative transition-all duration-150 ${isHovered ? 'cursor-wiggle scale-125' : 'scale-100'}`}>
        <img
          src="/cursor-banana.png"
          alt="banana cursor"
          className="w-7 h-9 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
        />
        {isHovered && (
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-banana-400 rounded-full animate-ping" />
        )}
      </div>
    </div>
  );
}
