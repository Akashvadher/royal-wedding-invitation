import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: string; // e.g. "2026-12-24T18:00:00"
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTime = (): TimeRemaining => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (isNaN(target) || diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(calculateTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const padZero = (n: number) => n.toString().padStart(2, '0');

  const units = [
    { label: 'DAYS', value: padZero(timeLeft.days) },
    { label: 'HOURS', value: padZero(timeLeft.hours) },
    { label: 'MINUTES', value: padZero(timeLeft.minutes) },
    { label: 'SECONDS', value: padZero(timeLeft.seconds) },
  ];

  return (
    <div className="w-full flex flex-col items-center py-6 px-4">
      {/* Decorative Top Accent */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#b45309]" />
        <span className="text-[#b45309] text-xs">✦</span>
        <span className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#b45309]" />
      </div>

      <h3 className="font-playfair italic text-2xl sm:text-3xl text-[#581c2f] mb-5 tracking-wide text-center">
        The wedding begins in
      </h3>

      {/* 4 Vintage Parchment Timer Boxes matching the video */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-md mx-auto">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center bg-gradient-to-b from-[#fffcf2] via-[#faf5e6] to-[#f3ebd3] border border-[#d4af37]/70 rounded-xl p-2.5 sm:p-3 shadow-md transition-transform hover:scale-105"
            style={{
              boxShadow: '0 4px 14px -2px rgba(180, 83, 9, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            <span className="font-cinzel font-bold text-2xl sm:text-3xl text-[#831843] tracking-wider tabular-nums leading-none">
              {unit.value}
            </span>
            <span className="text-[9px] sm:text-[10px] font-sans-clean font-semibold tracking-widest text-[#92400e] uppercase mt-1.5">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
