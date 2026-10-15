import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check state periodically
    const interval = setInterval(() => {
      setIsPlaying(weddingAudio.getIsPlaying());
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    const next = weddingAudio.toggleMusic();
    setIsPlaying(next);
  };

  return (
    <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-40">
      <button
        onClick={handleToggle}
        type="button"
        className="flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#1b0811]/85 hover:bg-[#2e0e1e] text-[#fef08a] border border-[#d4af37]/60 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 group"
        title={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
        aria-label="Toggle wedding music"
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-[2px] h-3.5 w-3.5">
              <span className="w-1 bg-[#fef08a] rounded-full animate-bounce [animation-delay:0ms] h-full" />
              <span className="w-1 bg-[#fef08a] rounded-full animate-bounce [animation-delay:150ms] h-3/4" />
              <span className="w-1 bg-[#fef08a] rounded-full animate-bounce [animation-delay:300ms] h-full" />
            </div>
            <Volume2 className="w-4 h-4 text-[#fef08a]" />
          </>
        ) : (
          <VolumeX className="w-4 h-4 text-[#e2e8f0]/80 group-hover:text-white" />
        )}
        <span className="text-[11px] font-sans-clean font-semibold tracking-wider uppercase text-[#fef08a]">
          {isPlaying ? 'Music On' : 'Music Off'}
        </span>
      </button>
    </div>
  );
};
