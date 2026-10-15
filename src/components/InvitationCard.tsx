import React, { useState } from 'react';
import { WeddingData } from '../types/wedding';
import { GaneshIcon, MandapIllustration, PalaceVenueIllustration, AttireIcons } from './Illustrations';
import { ScratchCard } from './ScratchCard';
import { CountdownTimer } from './CountdownTimer';
import { MapPin, Calendar, Share2, HeartHandshake, Sparkles, Check, Download } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InvitationCardProps {
  data: WeddingData;
  onOpenRsvp: () => void;
  onOpenCustomize: () => void;
  onReopenEnvelope: () => void;
}

export const InvitationCard: React.FC<InvitationCardProps> = ({
  data,
  onOpenRsvp,
  onOpenCustomize,
  onReopenEnvelope,
}) => {
  const [revealedAll, setRevealedAll] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleRevealAll = () => {
    setRevealedAll(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#991B1B', '#F59E0B'],
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${data.groom.name} & ${data.bride.name} Wedding Invitation`,
        text: `You are cordially invited to celebrate the wedding of ${data.groom.name} & ${data.bride.name} on ${data.weddingDate.day} ${data.weddingDate.month} ${data.weddingDate.year} at ${data.venue.address}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Royal Wedding//Invitation//EN
BEGIN:VEVENT
SUMMARY:Wedding: ${data.groom.name} & ${data.bride.name}
DESCRIPTION:Celebration of the marriage of ${data.groom.name} and ${data.bride.name}
LOCATION:${data.venue.address}, ${data.venue.cityState}
DTSTART:20261224T123000Z
DTEND:20261224T183000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${data.groom.name}_${data.bride.name}_Wedding.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full min-h-screen py-8 sm:py-12 px-3 sm:px-6 flex flex-col items-center justify-start text-[#3c2a21]">
      
      {/* Top Floating Control Bar */}
      <div className="w-full max-w-2xl flex items-center justify-between gap-2 mb-4 px-2">
        <button
          onClick={onReopenEnvelope}
          type="button"
          className="px-3.5 py-1.5 text-xs font-semibold text-[#831843] bg-amber-50/90 hover:bg-amber-100 border border-amber-300 rounded-full shadow-sm transition-all flex items-center gap-1.5 backdrop-blur-sm"
        >
          <span>✉️</span> View Envelope
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCustomize}
            type="button"
            className="px-3.5 py-1.5 text-xs font-semibold text-amber-900 bg-[#fff9ed] hover:bg-amber-100 border border-[#d4af37] rounded-full shadow-sm transition-all flex items-center gap-1.5"
            title="Edit couple names, date, venue, or events"
          >
            <span>✏️</span> Edit Details
          </button>
          <button
            onClick={handleShare}
            type="button"
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#9f1239] to-[#831843] hover:from-[#881337] hover:to-[#6b1437] rounded-full shadow-sm transition-all flex items-center gap-1.5"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            {copiedLink ? 'Copied!' : 'Share'}
          </button>
        </div>
      </div>

      {/* Main Luxury Parchment Invitation Card matching reference */}
      <div 
        className="relative w-full max-w-2xl bg-[#fffcf7] rounded-2xl shadow-2xl border-4 sm:border-8 border-[#e6c888] overflow-hidden"
        style={{
          boxShadow: '0 25px 50px -12px rgba(40, 10, 20, 0.45), 0 0 0 1px rgba(180, 83, 9, 0.2)',
        }}
      >
        {/* Delicate Golden Inner Border Inset */}
        <div className="absolute inset-2 sm:inset-3 border border-[#c9933b]/50 rounded-xl pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 border border-dashed border-[#c9933b]/30 rounded-lg pointer-events-none" />

        {/* ========================================================
            SECTION 1: AUSPICIOUS INVOCATION & COUPLE NAMES
            ======================================================== */}
        <div className="pt-10 sm:pt-14 pb-8 px-4 sm:px-10 text-center relative z-10 flex flex-col items-center">
          
          {/* Shree Ganesh blessing */}
          <div className="flex flex-col items-center justify-center mb-4">
            <GaneshIcon className="w-12 h-12 sm:w-14 sm:h-14 mb-1" />
            <p className="font-cinzel text-xs sm:text-sm font-bold tracking-widest text-[#a16207]">
              {data.blessingTop}
            </p>
          </div>

          {/* Tagline */}
          <div className="my-3 space-y-1">
            <p className="font-cinzel text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#78350f] uppercase">
              TWO HEARTS, TWO SOULS
            </p>
            <p className="font-cinzel text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#78350f] uppercase">
              BOUND TOGETHER IN LOVE FOREVER
            </p>
          </div>

          {/* Sub invitation quote */}
          <p className="font-sans-clean text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-900/80 max-w-sm mx-auto my-3 leading-relaxed">
            {data.subTagline}
          </p>

          {/* GROOM NAME */}
          <div className="mt-4 mb-2">
            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#831843] drop-shadow-xs">
              {data.groom.name}
            </h1>
            <p className="text-[10px] sm:text-xs font-sans-clean font-semibold tracking-wider text-[#a16207] uppercase mt-1">
              {data.groom.parents}
            </p>
          </div>

          {/* "with" cursive flourish */}
          <div className="my-2 flex items-center justify-center gap-3">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#b45309]" />
            <span className="font-script text-3xl sm:text-4xl text-[#b45309]">
              with
            </span>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#b45309]" />
          </div>

          {/* BRIDE NAME */}
          <div className="mt-1 mb-4">
            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-[#831843] drop-shadow-xs">
              {data.bride.name}
            </h1>
            <p className="text-[10px] sm:text-xs font-sans-clean font-semibold tracking-wider text-[#a16207] uppercase mt-1">
              {data.bride.parents}
            </p>
          </div>

          {/* Royal Mandap Courtyard Illustration matching the video */}
          <MandapIllustration className="w-full mt-2" />
        </div>

        {/* ========================================================
            SECTION 2: "SAVE THE DATE" INTERACTIVE SCRATCH CARDS
            ======================================================== */}
        <div className="relative py-8 px-4 sm:px-8 bg-gradient-to-b from-[#f9f3e3] via-[#f7ecd5] to-[#f4e6c8] border-t border-b border-[#e6c888] shadow-inner text-center">
          
          {/* Deckle effect visual separator */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-8 h-[1px] bg-[#b45309]" />
            <span className="text-[#b45309] text-xs">❦</span>
            <span className="w-8 h-[1px] bg-[#b45309]" />
          </div>

          <h2 className="font-script text-4xl sm:text-5xl text-[#831843] font-normal leading-tight">
            Save The Date
          </h2>
          <p className="font-cinzel text-xs sm:text-sm font-semibold tracking-[0.2em] text-[#78350f] uppercase mt-1 mb-6">
            FOR THE WEDDING CELEBRATION
          </p>

          {/* 3 Interactive Scratch Cards: DAY | MONTH | YEAR matching video */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            <ScratchCard
              label={data.weddingDate.day}
              subLabel="DAY"
              isAllRevealed={revealedAll}
            />
            <ScratchCard
              label={data.weddingDate.month}
              subLabel="MONTH"
              isAllRevealed={revealedAll}
            />
            <ScratchCard
              label={data.weddingDate.year}
              subLabel="YEAR"
              isAllRevealed={revealedAll}
            />
          </div>

          {/* Reveal All Helper Button */}
          {!revealedAll && (
            <div className="mt-4">
              <button
                onClick={handleRevealAll}
                type="button"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-sans-clean font-semibold tracking-wider text-[#78350f] hover:text-[#9f1239] bg-white/60 hover:bg-white border border-[#d4af37]/60 rounded-full transition-all shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                Scratch All at Once
              </button>
            </div>
          )}
        </div>

        {/* ========================================================
            SECTION 3: LIVE WEDDING COUNTDOWN TIMER
            ======================================================== */}
        <div className="bg-[#fffcf7] border-b border-[#e6c888]">
          <CountdownTimer targetDate={data.weddingDate.targetIso} />
        </div>

        {/* ========================================================
            SECTION 4: SCHEDULE OF EVENTS / TIMELINE
            ======================================================== */}
        <div className="relative py-10 px-4 sm:px-10 bg-[#faf6eb] border-b border-[#e6c888]">
          
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="w-10 h-[1px] bg-[#b45309]" />
              <span className="text-[#b45309] text-xs">✦</span>
              <span className="w-10 h-[1px] bg-[#b45309]" />
            </div>
            <h2 className="font-script text-4xl sm:text-5xl text-[#831843] font-normal">
              Schedule of Events
            </h2>
            <p className="font-cinzel text-xs font-semibold tracking-[0.2em] text-[#78350f] uppercase mt-1">
              A Celebration of Love &amp; Traditions
            </p>
          </div>

          {/* Timeline Tree matching video */}
          <div className="relative max-w-lg mx-auto py-2">
            {/* Center Vertical Golden Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#e6c888] via-[#c28e35] to-[#e6c888]" />

            <div className="space-y-7">
              {data.events.map((event, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <div
                    key={event.id}
                    className={`relative flex items-center ${
                      isLeft ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {/* Event Card (Half width) */}
                    <div
                      className={`w-[45%] p-3 sm:p-4 rounded-xl bg-white border border-[#d4af37]/50 shadow-sm transition-transform hover:scale-102 ${
                        isLeft ? 'text-right' : 'text-left'
                      }`}
                    >
                      <span className="inline-block text-[10px] font-sans-clean font-bold tracking-wider text-[#a16207] uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mb-1">
                        {event.date} · {event.time}
                      </span>
                      <h4 className="font-cinzel font-bold text-sm sm:text-base text-[#831843] tracking-wide mt-0.5">
                        {event.title}
                      </h4>
                      <p className="text-[11px] font-sans-clean text-amber-900/80 italic mt-0.5">
                        {event.subtitle}
                      </p>
                    </div>

                    {/* Central Golden Timeline Node */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#831843] border-2 border-[#fef08a] shadow-sm z-10 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#fef08a]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calendar Download Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleDownloadCalendar}
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#831843] bg-white hover:bg-amber-50 border border-amber-300 rounded-lg shadow-sm transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              Add Events to Calendar (.ics)
            </button>
          </div>
        </div>

        {/* ========================================================
            SECTION 5: VENUE & LOCATION (JAIPUR RADISSON BLU)
            ======================================================== */}
        <div className="relative py-10 px-4 sm:px-10 bg-[#fffcf7] border-b border-[#e6c888] text-center">
          
          <p className="font-cinzel text-[11px] sm:text-xs font-semibold tracking-[0.2em] text-[#78350f] uppercase max-w-md mx-auto leading-relaxed mb-2">
            {data.venue.subtitle}
          </p>

          <h2 className="font-script text-3xl sm:text-4xl text-[#831843] mb-4">
            {data.venue.title}
          </h2>

          {/* Architectural Palace Hotel Illustration */}
          <PalaceVenueIllustration className="w-full my-4" />

          {/* Venue Name & Address */}
          <div className="mt-4 mb-5">
            <h3 className="font-cinzel text-xl sm:text-2xl font-black text-[#831843] tracking-wider">
              {data.venue.address}
            </h3>
            <p className="text-[11px] sm:text-xs font-sans-clean font-medium tracking-wide text-[#78350f] max-w-md mx-auto mt-1 leading-relaxed">
              {data.venue.cityState}
            </p>
          </div>

          {/* Google Maps Button matching video */}
          <a
            href={data.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#9f1239] to-[#831843] hover:from-[#881337] hover:to-[#701a35] rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-300" />
            FIND YOUR WAY
          </a>
        </div>

        {/* ========================================================
            SECTION 6: WARDROBE PLANNER ("DRESS FOR THE MOMENTS")
            ======================================================== */}
        <div className="relative py-10 px-4 sm:px-8 bg-[#faf4e6] border-b border-[#e6c888]">
          
          <div className="text-center mb-6">
            <p className="font-cinzel text-[11px] font-bold tracking-[0.25em] text-[#a16207] uppercase">
              DRESS FOR THE MOMENTS
            </p>
            <h2 className="font-script text-4xl sm:text-5xl text-[#831843] font-normal mt-1">
              Wardrobe Planner
            </h2>
          </div>

          {/* Grid of Wardrobe Guides matching the video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl mx-auto">
            {data.wardrobe.map((item) => (
              <div
                key={item.id}
                className="bg-white/90 p-4 rounded-xl border border-amber-200/90 shadow-sm flex items-center justify-between gap-3 hover:shadow-md transition-all"
              >
                <div>
                  <span className="text-[10px] font-sans-clean font-bold tracking-widest text-[#a16207] uppercase">
                    {item.event}
                  </span>
                  <h4 className="font-cinzel font-bold text-sm text-[#831843] tracking-wide mt-0.5">
                    {item.theme}
                  </h4>
                  <p className="text-[11px] font-sans-clean text-gray-600 mt-0.5">
                    {item.attire}
                  </p>

                  {/* Color Palette Swatches */}
                  <div className="flex items-center gap-1.5 mt-2.5">
                    {item.palette.map((color, cIdx) => (
                      <span
                        key={cIdx}
                        className="w-4 h-4 rounded-full border border-black/15 shadow-xs"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Silhouette Illustration */}
                <div className="shrink-0 p-1 bg-amber-50/80 rounded-lg border border-amber-200/50">
                  <AttireIcons type={item.event} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            SECTION 7: FAMILY BLESSINGS, CLOSING & RSVP
            ======================================================== */}
        <div className="relative py-12 px-6 sm:px-12 bg-[#fffcf7] text-center">
          
          <p className="font-serif-luxury italic text-sm sm:text-base text-amber-950/90 max-w-md mx-auto leading-relaxed">
            "{data.closing.note}"
          </p>

          <div className="my-6">
            <span className="text-[11px] font-cinzel font-bold tracking-[0.25em] text-[#a16207] uppercase block mb-1">
              WITH LOVE &amp; BLESSINGS
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#831843] tracking-wide">
              {data.closing.familyNames}
            </h3>
            <p className="font-sans-clean text-xs text-amber-900/80 italic mt-1">
              {data.closing.tagline}
            </p>
          </div>

          {/* Action Buttons: RSVP & Share */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={onOpenRsvp}
              type="button"
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#9f1239] to-[#831843] hover:from-[#881337] hover:to-[#6b1437] rounded-full shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <HeartHandshake className="w-4 h-4" />
              Send RSVP
            </button>

            <button
              onClick={handleShare}
              type="button"
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#831843] bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-full shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink ? 'Link Copied!' : 'Share Invitation'}
            </button>
          </div>

          {/* Bottom Ornate Floral Garland SVG */}
          <div className="mt-10 flex items-center justify-center">
            <svg viewBox="0 0 400 40" className="w-64 sm:w-80 h-auto" fill="none">
              <path
                d="M10 20 Q100 35 200 20 Q300 35 390 20"
                stroke="#c28e35"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <circle cx="200" cy="20" r="4" fill="#991b1b" />
              <circle cx="150" cy="22" r="3" fill="#d97706" />
              <circle cx="250" cy="22" r="3" fill="#d97706" />
              <circle cx="100" cy="20" r="2.5" fill="#991b1b" />
              <circle cx="300" cy="20" r="2.5" fill="#991b1b" />
            </svg>
          </div>

        </div>

      </div>

      {/* Footer copyright note */}
      <footer className="mt-8 text-center text-xs text-amber-200/60 font-sans-clean">
        Created for {data.groom.name} &amp; {data.bride.name}'s Wedding Celebration
      </footer>
    </div>
  );
};
