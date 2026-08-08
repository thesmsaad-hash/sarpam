import React from 'react';

interface Props {
  className?: string;
}

export const SarpamEmblem: React.FC<Props> = ({ className = 'w-8 h-8' }) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="serpentEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5EEAD4" />
          <stop offset="50%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#0D5C56" />
        </linearGradient>
        <linearGradient id="goldDot" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF6D6" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      
      {/* Outer subtle geometric ring */}
      <circle cx="50" cy="50" r="44" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 3" />
      
      {/* Ancient Naga Serpent Minimal Line Illustration */}
      <path 
        d="M50 14 C 28 14, 18 36, 36 50 C 54 64, 72 44, 50 82 C 40 88, 30 84, 30 78" 
        stroke="url(#serpentEmerald)" 
        strokeWidth="5" 
        strokeLinecap="round"
      />
      
      {/* AI Intelligence Nodes & Connections */}
      <circle cx="50" cy="14" r="3.5" fill="url(#goldDot)" />
      <circle cx="36" cy="50" r="3" fill="#0F766E" />
      <circle cx="50" cy="82" r="4" fill="url(#goldDot)" />
      
      {/* Subtle radiating AI pulse rings */}
      <path d="M 50 42 A 8 8 0 0 1 50 58 A 8 8 0 0 1 50 42" stroke="#5EEAD4" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  );
};
