import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { weddingAudio } from '../utils/audio';

interface EnvelopeViewProps {
  onOpen: () => void;
  isOpen: boolean;
  initialsGroom?: string;
  initialsBride?: string;
}

export const EnvelopeView: React.FC<EnvelopeViewProps> = ({
  onOpen,
  isOpen,
  initialsGroom = 'R',
  initialsBride = 'R',
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (isOpening || isOpen) return;

    setIsOpening(true);
    weddingAudio.playWaxSealCrack();
    weddingAudio.startMusic();

    // Trigger golden sparks burst from the wax seal center
    const clientX = 'clientX' in e ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : window.innerWidth / 2);
    const clientY = 'clientY' in e ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : window.innerHeight / 2);

    const x = clientX / window.innerWidth;
    const y = clientY / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 70,
      startVelocity: 35,
      origin: { x, y },
      colors: ['#FFE082', '#FFD54F', '#FFA000', '#FF8F00', '#FFFFFF', '#D81B60'],
      ticks: 120,
      gravity: 0.8,
      scalar: 0.9,
    });

    // Animate envelope opening transition
    setTimeout(() => {
      onOpen();
      setIsOpening(false);
    }, 950);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ease-in-out ${
        isOpen
          ? 'opacity-0 pointer-events-none scale-105'
          : 'opacity-100 pointer-events-auto scale-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #2b0b17 0%, #15050c 100%)',
      }}
    >
      {/* Outer iPad/Device Presentation Frame */}
      <div className="relative w-full max-w-lg h-[92vh] max-h-[820px] mx-3 sm:mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 sm:border-8 border-[#3b1222] flex flex-col justify-between select-none">
        
        {/* Envelope Body / Background Texture */}
        <div className="absolute inset-0 bg-envelope-damask shadow-inner">
          {/* Subtle ornate Damask Leaf Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(#ffd700 1.2px, transparent 1.2px), radial-gradient(#ffffff 0.8px, transparent 0.8px)`,
              backgroundSize: '24px 24px',
              backgroundPosition: '0 0, 12px 12px'
            }}
          />
        </div>

        {/* Top Envelope Flap (Triangle folding downwards) */}
        <div
          className={`absolute top-0 left-0 right-0 h-1/2 z-20 origin-top transition-transform duration-1000 ease-in-out ${
            isOpening ? '-translate-y-full -rotate-x-90 opacity-60' : 'translate-y-0'
          }`}
          style={{
            perspective: '1000px',
            filter: 'drop-shadow(0 12px 16px rgba(0, 0, 0, 0.45))',
          }}
        >
          <svg viewBox="0 0 500 280" className="w-full h-full" preserveAspectRatio="none">
            {/* Top flap folded down */}
            <path
              d="M0 0 L500 0 L250 280 Z"
              fill="#c21045"
            />
            {/* Golden embroidered edge border */}
            <path
              d="M0 0 L250 280 L500 0"
              stroke="#eab308"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M10 2 L250 270 L490 2"
              stroke="#fef08a"
              strokeWidth="1.5"
              strokeDasharray="5 3"
              fill="none"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Left Envelope Flap Seam */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1/2 z-10 transition-transform duration-1000 ease-in-out pointer-events-none ${
            isOpening ? '-translate-x-full opacity-60' : 'translate-x-0'
          }`}
        >
          <svg viewBox="0 0 250 560" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 0 L250 280 L0 560 Z" fill="#b00d3d" opacity="0.6" />
            <path d="M0 0 L250 280 L0 560" stroke="#ca8a04" strokeWidth="2.5" fill="none" opacity="0.5" />
          </svg>
        </div>

        {/* Right Envelope Flap Seam */}
        <div
          className={`absolute right-0 top-0 bottom-0 w-1/2 z-10 transition-transform duration-1000 ease-in-out pointer-events-none ${
            isOpening ? 'translate-x-full opacity-60' : 'translate-x-0'
          }`}
        >
          <svg viewBox="0 0 250 560" className="w-full h-full" preserveAspectRatio="none">
            <path d="M250 0 L0 280 L250 560 Z" fill="#b00d3d" opacity="0.6" />
            <path d="M250 0 L0 280 L250 560" stroke="#ca8a04" strokeWidth="2.5" fill="none" opacity="0.5" />
          </svg>
        </div>

        {/* Bottom Envelope Flap (Triangle folding upwards) */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1/2 z-10 origin-bottom transition-transform duration-1000 ease-in-out pointer-events-none ${
            isOpening ? 'translate-y-full opacity-60' : 'translate-y-0'
          }`}
        >
          <svg viewBox="0 0 500 280" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0 280 L250 0 L500 280 Z" fill="#aa0c3b" opacity="0.75" />
            <path d="M0 280 L250 0 L500 280" stroke="#ca8a04" strokeWidth="3" fill="none" />
          </svg>
        </div>

        {/* Central Monogram Wax Seal matching the reference video */}
        <div className="relative z-30 flex-1 flex flex-col items-center justify-center p-4">
          <button
            onClick={handleSealClick}
            onTouchEnd={handleSealClick}
            type="button"
            className={`group relative flex items-center justify-center focus:outline-none cursor-pointer transition-transform active:scale-95 duration-200 ${
              isOpening ? 'scale-125 rotate-12 opacity-80' : 'hover:scale-105'
            }`}
            title="Tap on wax seal to open the invitation"
            aria-label="Open wedding invitation"
          >
            {/* Subtle outer gold aura shimmer */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-400/30 via-yellow-200/40 to-amber-500/30 blur-lg animate-pulse" />

            {/* 3D Wax Seal Body - Cream Blush Wax with Irregular Molten Edge */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-[#fff7ed] via-[#fce7d2] to-[#edd0b4] border-[3px] border-[#df9b28] wax-seal-shadow flex items-center justify-center">
              
              {/* Molten edge ripples */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-[#b45309]/50" />
              <div className="absolute inset-3 rounded-full border-[1.5px] border-[#c28e35]" />

              {/* Monogram Seal Engraving (e.g., R & R) */}
              <div className="relative flex items-center justify-center text-center select-none">
                <span className="font-script text-4xl sm:text-5xl text-[#9f1239] drop-shadow-sm font-bold tracking-tight">
                  {initialsGroom}
                  <span className="text-2xl sm:text-3xl text-[#b45309] font-serif-luxury mx-0.5">
                    &amp;
                  </span>
                  {initialsBride}
                </span>
              </div>

              {/* Specular wax shine highlight */}
              <div className="absolute top-2 left-6 w-12 h-6 rounded-full bg-white/40 blur-[1px] rotate-[-25deg] pointer-events-none" />
            </div>
          </button>
        </div>

        {/* Bottom Prompt Text matching the video */}
        <div className="relative z-30 pb-10 sm:pb-12 text-center flex flex-col items-center justify-center">
          <div className="animate-tap-prompt flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/25 backdrop-blur-sm border border-amber-300/30">
            <span className="text-amber-300 text-xs">✦</span>
            <span className="font-sans-clean font-semibold tracking-[0.2em] text-[11px] sm:text-xs text-[#fff1c2] uppercase">
              TAP ON SEAL · TO OPEN THE INVITATION
            </span>
            <span className="text-amber-300 text-xs">✦</span>
          </div>
        </div>

      </div>
    </div>
  );
};
