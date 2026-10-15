import React from 'react';

/**
 * Lord Ganesha auspicious gold motif
 */
export const GaneshIcon: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} drop-shadow-sm`}
  >
    <defs>
      <linearGradient id="ganeshGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DF9B28" />
        <stop offset="50%" stopColor="#FED876" />
        <stop offset="100%" stopColor="#B3781A" />
      </linearGradient>
    </defs>
    {/* Crown / Mukut */}
    <path
      d="M50 14 L58 30 L53 30 L60 38 L40 38 L47 30 L42 30 Z"
      fill="url(#ganeshGold)"
    />
    <circle cx="50" cy="22" r="3" fill="#881337" />
    {/* Head & Ears */}
    <path
      d="M34 42 C20 42 22 62 35 60 C38 65 42 70 48 78 C50 82 56 82 55 76 C53 70 51 60 56 56 C60 52 64 56 68 62 C78 62 80 44 66 42 C60 40 40 40 34 42 Z"
      stroke="url(#ganeshGold)"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Auspicious Tilak */}
    <path
      d="M48 42 L52 42 M47 46 L53 46 M50 38 L50 49"
      stroke="#881337"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Trunk curl & Modak */}
    <path
      d="M50 64 C50 72 58 74 60 70 C61 67 57 65 54 67"
      stroke="url(#ganeshGold)"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="68" cy="68" r="4" fill="url(#ganeshGold)" />
  </svg>
);

/**
 * Royal Indian Wedding Mandap with ornate arches and floral garlands
 */
export const MandapIllustration: React.FC<{ className?: string }> = ({ className = 'w-full' }) => (
  <div className={`relative flex flex-col items-center justify-center my-4 ${className}`}>
    <svg
      viewBox="0 0 600 240"
      className="w-full max-w-lg h-auto drop-shadow-md"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="goldArch" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DF9B28" />
          <stop offset="50%" stopColor="#FED876" />
          <stop offset="100%" stopColor="#B3781A" />
        </linearGradient>
        <linearGradient id="floralGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff5eb" />
          <stop offset="100%" stopColor="#fdf0d5" />
        </linearGradient>
      </defs>

      {/* Decorative Outer Floral Frame Arch */}
      <path
        d="M60 220 V110 Q60 50 180 40 Q300 30 420 40 Q540 50 540 110 V220"
        stroke="url(#goldArch)"
        strokeWidth="3"
        strokeDasharray="4 2"
      />

      {/* Mandap Central Royal Dome (Chhatri) */}
      <path
        d="M230 70 Q300 15 370 70 L380 90 H220 Z"
        fill="url(#floralGlow)"
        stroke="url(#goldArch)"
        strokeWidth="2.5"
      />
      {/* Finial / Kalash spire */}
      <path d="M300 15 V5 M296 8 H304" stroke="url(#goldArch)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Pillars Left & Right */}
      {/* Left Pillar 1 */}
      <rect x="120" y="80" width="16" height="140" rx="3" fill="#faeed9" stroke="url(#goldArch)" strokeWidth="2" />
      <path d="M112 80 H144 M112 220 H144" stroke="url(#goldArch)" strokeWidth="3" />
      {/* Left Pillar 2 (Inner) */}
      <rect x="210" y="90" width="16" height="130" rx="3" fill="#faeed9" stroke="url(#goldArch)" strokeWidth="2" />
      <path d="M202 90 H234 M202 220 H234" stroke="url(#goldArch)" strokeWidth="3" />

      {/* Right Pillar 1 (Inner) */}
      <rect x="374" y="90" width="16" height="130" rx="3" fill="#faeed9" stroke="url(#goldArch)" strokeWidth="2" />
      <path d="M366 90 H398 M366 220 H398" stroke="url(#goldArch)" strokeWidth="3" />
      {/* Right Pillar 2 */}
      <rect x="464" y="80" width="16" height="140" rx="3" fill="#faeed9" stroke="url(#goldArch)" strokeWidth="2" />
      <path d="M456 80 H488 M456 220 H488" stroke="url(#goldArch)" strokeWidth="3" />

      {/* Royal Chandelier hanging in center */}
      <line x1="300" y1="88" x2="300" y2="120" stroke="url(#goldArch)" strokeWidth="2" />
      <ellipse cx="300" cy="125" rx="16" ry="6" fill="#fef08a" stroke="url(#goldArch)" strokeWidth="1.5" />
      <circle cx="300" cy="125" r="4" fill="#f59e0b" />
      <circle cx="290" cy="128" r="2.5" fill="#f59e0b" />
      <circle cx="310" cy="128" r="2.5" fill="#f59e0b" />

      {/* Auspicious Sacred Fire / Mandap Platform */}
      <rect x="250" y="195" width="100" height="25" rx="4" fill="#fde68a" stroke="url(#goldArch)" strokeWidth="2" />
      {/* Sacred Havankund Fire Flames */}
      <path
        d="M285 195 Q295 170 300 178 Q305 170 315 195 Z"
        fill="#ea580c"
      />
      <path
        d="M292 195 Q300 176 308 195 Z"
        fill="#facc15"
      />

      {/* Hanging Floral Marigold & Rose Garlands */}
      <path
        d="M128 95 Q218 135 300 115 Q382 135 472 95"
        stroke="#e11d48"
        strokeWidth="3.5"
        strokeDasharray="6 4"
        strokeLinecap="round"
      />
      <path
        d="M130 115 Q218 150 300 135 Q382 150 470 115"
        stroke="#f59e0b"
        strokeWidth="3"
        strokeDasharray="5 3"
        strokeLinecap="round"
      />

      {/* Base Carpet & Stairs */}
      <path d="M40 220 H560 L540 236 H60 Z" fill="#991b1b" stroke="url(#goldArch)" strokeWidth="2" />
      <line x1="40" y1="220" x2="560" y2="220" stroke="#fef08a" strokeWidth="2" />
    </svg>
  </div>
);

/**
 * Radisson Blu / Jaipur Palace Hotel Architectural Illustration
 */
export const PalaceVenueIllustration: React.FC<{ className?: string }> = ({ className = 'w-full' }) => (
  <div className={`relative flex flex-col items-center justify-center ${className}`}>
    <svg
      viewBox="0 0 640 220"
      className="w-full max-w-lg h-auto drop-shadow-md rounded-lg overflow-hidden"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="palaceBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff8f0" />
          <stop offset="100%" stopColor="#f7ebdc" />
        </linearGradient>
        <linearGradient id="palaceSandstone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3d8bc" />
          <stop offset="100%" stopColor="#deb887" />
        </linearGradient>
        <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c28e35" />
          <stop offset="50%" stopColor="#fce99f" />
          <stop offset="100%" stopColor="#b5802a" />
        </linearGradient>
      </defs>

      {/* Soft Sky & Backdrop */}
      <rect width="640" height="220" fill="url(#palaceBg)" />

      {/* Palm Trees Left & Right */}
      {/* Left Palm */}
      <path d="M70 200 Q75 140 60 90" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
      <path d="M60 90 Q30 70 20 85 M60 90 Q50 60 40 60 M60 90 Q75 60 85 65 M60 90 Q90 80 95 95" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />
      {/* Right Palm */}
      <path d="M570 200 Q565 140 580 90" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
      <path d="M580 90 Q550 70 540 85 M580 90 Q570 60 560 60 M580 90 Q595 60 605 65 M580 90 Q610 80 615 95" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />

      {/* Main Palace Hotel Central Building Structure */}
      <rect x="140" y="80" width="360" height="110" fill="url(#palaceSandstone)" stroke="#c28e35" strokeWidth="2" rx="2" />
      
      {/* Upper Floor Windows / Jharokhas */}
      {[165, 205, 245, 285, 325, 365, 405, 445].map((x) => (
        <g key={x}>
          <path
            d={`M${x} 98 Q${x + 12} 86 ${x + 24} 98 V118 H${x} Z`}
            fill="#522b16"
            stroke="url(#goldTrim)"
            strokeWidth="1.2"
          />
          {/* Warm Interior Glow */}
          <circle cx={x + 12} cy={108} r="4" fill="#fde047" opacity="0.8" />
        </g>
      ))}

      {/* Lower Floor Grand Arched Portico */}
      {[165, 215, 265, 315, 365, 415, 465].map((x) => (
        <path
          key={x}
          d={`M${x} 190 V145 Q${x + 12} 135 ${x + 24} 145 V190`}
          stroke="#854d0e"
          strokeWidth="2"
          fill="#522b16"
        />
      ))}

      {/* Grand Entrance Centerpiece Archway */}
      <rect x="290" y="130" width="60" height="60" fill="#381907" stroke="url(#goldTrim)" strokeWidth="2.5" />
      <path d="M290 145 Q320 120 350 145" stroke="url(#goldTrim)" strokeWidth="2.5" fill="none" />
      <circle cx="320" cy="155" r="8" fill="#fef08a" opacity="0.9" />

      {/* Rooftop Rajasthani Chhatris (Domes) */}
      {/* Center Grand Dome */}
      <path d="M290 60 Q320 30 350 60 H290 Z" fill="url(#palaceSandstone)" stroke="url(#goldTrim)" strokeWidth="2" />
      <path d="M320 30 V18 M317 22 H323" stroke="url(#goldTrim)" strokeWidth="2" />
      <rect x="300" y="60" width="40" height="20" fill="url(#palaceSandstone)" stroke="url(#goldTrim)" strokeWidth="1.5" />

      {/* Left Chhatri */}
      <path d="M150 68 Q170 42 190 68 H150 Z" fill="url(#palaceSandstone)" stroke="url(#goldTrim)" strokeWidth="1.5" />
      <path d="M170 42 V32" stroke="url(#goldTrim)" strokeWidth="1.5" />
      <rect x="156" y="68" width="28" height="12" fill="url(#palaceSandstone)" stroke="url(#goldTrim)" strokeWidth="1.2" />

      {/* Right Chhatri */}
      <path d="M450 68 Q470 42 490 68 H450 Z" fill="url(#palaceSandstone)" stroke="url(#goldTrim)" strokeWidth="1.5" />
      <path d="M470 42 V32" stroke="url(#goldTrim)" strokeWidth="1.5" />
      <rect x="456" y="68" width="28" height="12" fill="url(#palaceSandstone)" stroke="url(#goldTrim)" strokeWidth="1.2" />

      {/* Parapet Jali / Decorative Balustrade */}
      <line x1="140" y1="80" x2="500" y2="80" stroke="url(#goldTrim)" strokeWidth="4" strokeDasharray="3 2" />

      {/* Foreground Fountain & Garden Walkway */}
      <path d="M250 200 Q320 190 390 200 L430 220 H210 Z" fill="#e5e7eb" stroke="url(#goldTrim)" strokeWidth="1" />
      {/* Water Fountain Pool */}
      <ellipse cx="320" cy="205" rx="30" ry="7" fill="#38bdf8" stroke="url(#goldTrim)" strokeWidth="1.5" />
      <path d="M320 205 Q316 195 320 190 Q324 195 320 205" fill="#bae6fd" />
    </svg>
  </div>
);

/**
 * Wardrobe Attire Silhouette illustrations
 */
export const AttireIcons: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case 'HALDI':
      return (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Kurta & Sari in Yellow */}
          <path d="M20 30 L28 20 H36 L44 30 L40 40 L36 34 V65 H28 V34 L24 40 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
          <path d="M48 24 Q56 22 62 30 L66 65 H46 L50 44 Z" fill="#FEF08A" stroke="#B45309" strokeWidth="1.5" />
          <circle cx="32" cy="15" r="5" fill="#D97706" />
          <circle cx="55" cy="16" r="5" fill="#D97706" />
        </svg>
      );
    case 'SANGEET':
      return (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Indo-Western Suit & Gown in Midnight Blue */}
          <path d="M18 28 L28 18 H36 L46 28 L40 42 L34 35 V66 H28 V35 L22 42 Z" fill="#1E3A8A" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M46 24 Q56 20 64 28 L72 66 H42 L52 42 Z" fill="#4C1D95" stroke="#F59E0B" strokeWidth="1.5" />
          <circle cx="32" cy="13" r="5" fill="#F59E0B" />
          <circle cx="56" cy="14" r="5" fill="#F59E0B" />
        </svg>
      );
    case 'WEDDING':
      return (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Royal Maroon Sherwani & Bridal Red Lehenga with Dupatta */}
          <path d="M18 28 L28 18 H36 L46 28 L40 44 L36 36 V68 H28 V36 L24 44 Z" fill="#991B1B" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M44 26 Q56 20 66 28 L74 68 H38 L50 42 Z" fill="#881337" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Turban / Safa */}
          <path d="M28 14 Q32 8 36 14 Z" fill="#D4AF37" />
          <circle cx="32" cy="14" r="4.5" fill="#991B1B" />
          <circle cx="56" cy="15" r="4.5" fill="#881337" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 80 80" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tuxedo & Formal Gown */}
          <path d="M20 28 L28 18 H36 L44 28 L38 42 L34 35 V66 H28 V35 L24 42 Z" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M46 24 Q56 22 64 28 L70 66 H44 L52 42 Z" fill="#334155" stroke="#E2E8F0" strokeWidth="1.5" />
          <circle cx="32" cy="13" r="5" fill="#334155" />
          <circle cx="56" cy="14" r="5" fill="#334155" />
        </svg>
      );
  }
};
