import React, { useEffect, useRef, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { weddingAudio } from '../utils/audio';

interface ScratchCardProps {
  label: string; // revealed text, e.g. "24", "DEC", "2026"
  subLabel?: string;
  isAllRevealed?: boolean;
  onRevealed?: () => void;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  label,
  subLabel,
  isAllRevealed = false,
  onRevealed,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const isScratchingRef = useRef(false);
  const lastChimeTime = useRef(0);

  // Initialize canvas with realistic gold foil scratch surface
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // 1. Draw Gold Foil Base Gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#e5be6b');
    grad.addColorStop(0.25, '#c9933b');
    grad.addColorStop(0.5, '#fceda2');
    grad.addColorStop(0.75, '#b8862d');
    grad.addColorStop(1, '#dfa938');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Add subtle gold stippling texture
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 300; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const r = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. Delicate inner border
    ctx.strokeStyle = 'rgba(120, 60, 10, 0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    // 4. "scratch" Calligraphy / Typography in center
    ctx.fillStyle = '#613e0e';
    ctx.font = 'italic 500 15px "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('scratch', width / 2, height / 2 - 2);

    // Small heart motif above text
    ctx.font = '10px sans-serif';
    ctx.fillText('♥', width / 2, height / 2 + 15);
  }, []);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  // Handle Reveal triggered externally (e.g. Reveal All button)
  useEffect(() => {
    if (isAllRevealed && !isRevealed) {
      triggerFullReveal();
    }
  }, [isAllRevealed]);

  const triggerFullReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setIsRevealed(true);
    weddingAudio.playScratchChime();

    // Trigger subtle sparkle confetti around card
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 22,
        spread: 45,
        origin: { x, y },
        colors: ['#D4AF37', '#F3E5AB', '#991B1B', '#F59E0B'],
        scalar: 0.7,
        disableForReducedMotion: true,
      });
    }

    onRevealed?.();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let transparentPixels = 0;
      const totalPixels = data.length / 4;

      // Sample every 4th pixel for performance
      for (let i = 3; i < data.length; i += 16) {
        if (data[i] === 0) {
          transparentPixels++;
        }
      }

      const ratio = transparentPixels / (totalPixels / 4);
      if (ratio > 0.42) {
        triggerFullReveal();
      }
    } catch {
      // Ignore security/CORS edge cases
    }
  };

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();

    // Soft audio chime throttled
    const now = Date.now();
    if (now - lastChimeTime.current > 180) {
      weddingAudio.playScratchChime();
      lastChimeTime.current = now;
    }

    checkScratchPercentage();
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsScratching(true);
    isScratchingRef.current = true;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratchingRef.current) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
    isScratchingRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center p-1 group select-none"
    >
      {/* Outer Heart / Oval Frame Container matching video reference */}
      <div 
        className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-transform duration-300 ${
          isRevealed ? 'scale-105' : 'hover:scale-102'
        }`}
        style={{
          boxShadow: isRevealed 
            ? '0 8px 20px -4px rgba(212, 175, 55, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.8)'
            : '0 4px 12px rgba(100, 30, 10, 0.15)',
        }}
      >
        {/* Background Revealed Card Layer */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#fbf8ee] to-[#f4ecd2] border-2 border-[#d4af37] flex flex-col items-center justify-center p-2 text-center overflow-hidden">
          {/* Subtle ornate watermark ring */}
          <div className="absolute inset-1 rounded-full border border-dashed border-[#c9933b]/40 pointer-events-none" />
          
          <span className="font-cinzel font-bold text-2xl sm:text-3xl text-[#831843] tracking-wider z-10 transition-transform">
            {label}
          </span>
          {subLabel && (
            <span className="text-[10px] uppercase font-sans-clean font-semibold tracking-widest text-[#a16207] z-10 mt-0.5">
              {subLabel}
            </span>
          )}
        </div>

        {/* Scratchable Canvas Layer */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            width={112}
            height={112}
            className="absolute inset-0 rounded-full cursor-pointer touch-none z-20 transition-opacity duration-300"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            title="Scratch with finger or mouse to reveal"
          />
        )}
      </div>

      {/* Helper text or status */}
      <span className="text-[11px] font-sans-clean tracking-wider uppercase mt-1.5 font-medium text-[#78350f]">
        {isRevealed ? 'Revealed' : 'Tap & Scratch'}
      </span>
    </div>
  );
};
