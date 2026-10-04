import React from "react";

interface AcademyLogoProps {
  className?: string;
  variant?: "light" | "dark" | "gold";
  showText?: boolean;
  textSize?: "sm" | "md" | "lg";
}

export default function AcademyLogo({
  className = "w-10 h-10",
  variant = "light",
  showText = false,
  textSize = "md",
}: AcademyLogoProps) {
  // Variant styling for text when rendered on dark backgrounds
  const isDarkBg = variant === "gold" || variant === "dark";

  return (
    <div className="flex items-center gap-3">
      {/* Official Lil-El Academy Shield & Torch Crest */}
      <svg
        viewBox="0 0 140 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Lil-El Academy Official Crest"
      >
        <defs>
          {/* Gold / Bronze Beveled Outer Rim Gradient */}
          <linearGradient id="shieldGoldBorder" x1="20" y1="10" x2="120" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5DF9E" />
            <stop offset="25%" stopColor="#D4A747" />
            <stop offset="50%" stopColor="#FBF0C4" />
            <stop offset="75%" stopColor="#966C23" />
            <stop offset="100%" stopColor="#D4A747" />
          </linearGradient>

          {/* Inner Shield Bevel Rim */}
          <linearGradient id="innerShieldRim" x1="70" y1="18" x2="70" y2="145" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#66050B" />
            <stop offset="100%" stopColor="#2E0205" />
          </linearGradient>

          {/* Shield Crimson Core Radial Gradient */}
          <radialGradient id="shieldCrimson" cx="50%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#E21B2B" />
            <stop offset="35%" stopColor="#B3121F" />
            <stop offset="70%" stopColor="#800A13" />
            <stop offset="100%" stopColor="#4A050A" />
          </radialGradient>

          {/* Torch Outer Flame Radiant Glow */}
          <linearGradient id="torchFlameOuter" x1="70" y1="20" x2="70" y2="78" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFEA60" />
            <stop offset="30%" stopColor="#FFB300" />
            <stop offset="70%" stopColor="#FF6D00" />
            <stop offset="100%" stopColor="#DD2C00" />
          </linearGradient>

          {/* Torch Inner Flame Hot Core */}
          <linearGradient id="torchFlameInner" x1="70" y1="28" x2="70" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFEE" />
            <stop offset="40%" stopColor="#FFF275" />
            <stop offset="80%" stopColor="#FFAB00" />
            <stop offset="100%" stopColor="#FF8F00" />
          </linearGradient>

          {/* Metallic Silver Cup & Handle */}
          <linearGradient id="torchSilver" x1="56" y1="70" x2="84" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#B0B7C3" />
            <stop offset="35%" stopColor="#F8FAFC" />
            <stop offset="65%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Tapered Stem Gradient */}
          <linearGradient id="stemSilver" x1="62" y1="84" x2="78" y2="84" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="45%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          {/* Subtle Outer Drop Shadow */}
          <filter id="shieldShadow" x="8" y="4" width="124" height="152" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* 1. Outer Beveled Shield */}
        <g filter="url(#shieldShadow)">
          {/* Main Shield Outline */}
          <path
            d="M70 12 C108 26 122 34 122 70 C122 108 96 134 70 148 C44 134 18 108 18 70 C18 34 32 26 70 12 Z"
            fill="url(#shieldGoldBorder)"
            stroke="#785012"
            strokeWidth="1.5"
          />

          {/* Inner Shield Cavity */}
          <path
            d="M70 18 C102 30 114 38 114 70 C114 104 92 127 70 139 C48 127 26 104 26 70 C26 38 38 30 70 18 Z"
            fill="url(#shieldCrimson)"
            stroke="url(#innerShieldRim)"
            strokeWidth="2"
          />
        </g>

        {/* 2. The Torch */}
        {/* A. Outer Flame */}
        <path
          d="M70 24 C79 35 88 47 84 62 C80 74 65 74 60 68 C56 74 46 72 44 64 C42 50 56 36 70 24 Z"
          fill="url(#torchFlameOuter)"
        />

        {/* B. Inner Flame Core */}
        <path
          d="M70 32 C75 40 80 49 77 58 C74 65 67 66 63 62 C60 66 54 64 53 59 C51 49 61 40 70 32 Z"
          fill="url(#torchFlameInner)"
        />

        {/* C. Silver Chalice Cup */}
        <path
          d="M52 68 C52 66 88 66 88 68 L82 82 C82 84 58 84 58 82 Z"
          fill="url(#torchSilver)"
          stroke="#475569"
          strokeWidth="0.8"
        />

        {/* Specular highlight on rim */}
        <ellipse cx="70" cy="68" rx="17" ry="2.2" fill="#FFFFFF" fillOpacity="0.6" />

        {/* D. Collar Ring */}
        <rect x="61" y="82" width="18" height="4" rx="2" fill="url(#torchSilver)" stroke="#475569" strokeWidth="0.6" />

        {/* E. Tapered Stem down to base */}
        <path
          d="M64 86 L69 133 L71 133 L76 86 Z"
          fill="url(#stemSilver)"
          stroke="#334155"
          strokeWidth="0.8"
        />
        {/* Central specular ray on stem */}
        <path d="M69.5 86 L70 130" stroke="#FFFFFF" strokeWidth="1" strokeLinecap="round" />
      </svg>

      {/* Brand Typography (LIL - EL ACADEMY) */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-heading font-extrabold tracking-widest uppercase transition-colors ${
              isDarkBg ? "text-white" : "text-stone-900"
            } ${
              textSize === "lg"
                ? "text-lg sm:text-xl"
                : textSize === "sm"
                ? "text-xs tracking-wider"
                : "text-sm sm:text-base tracking-widest"
            }`}
          >
            LIL - EL
          </span>
          <span
            className={`font-sans font-bold tracking-[0.24em] uppercase transition-colors ${
              isDarkBg ? "text-[#F5B82E]" : "text-[#9B111E]"
            } ${
              textSize === "lg"
                ? "text-xs sm:text-sm"
                : textSize === "sm"
                ? "text-[9px]"
                : "text-[11px]"
            }`}
          >
            ACADEMY
          </span>
        </div>
      )}
    </div>
  );
}
