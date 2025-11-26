import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

export const Logo: React.FC<LogoProps> = ({ className = "h-12 w-auto", variant = 'full' }) => {
  const [attempt, setAttempt] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Paths to try in order
  const paths = [
    "/images/logo.png",   // Standard absolute path
    "images/logo.png",    // Relative path
    "/images/Logo.png"    // Case sensitivity check
  ];

  const handleError = () => {
    if (attempt < paths.length - 1) {
      setAttempt(prev => prev + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    // Fallback: Recreated Vector Graphic to match the image exactly if file fails to load
    return (
      <div className={`${className} flex items-center gap-2.5 select-none`} aria-label="Elastic Logo">
        {/* Icon Fallback - Stylized Star 'E' */}
        <div className="h-full aspect-square shrink-0 relative">
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md overflow-visible">
             <defs>
               <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                 <stop offset="0%" stopColor="#72C8C2" />
                 <stop offset="100%" stopColor="#5D9CC9" />
               </linearGradient>
             </defs>
             {/* Abstract Star Shape */}
             <path d="M50 5 L63 35 H95 L70 55 L80 85 L50 70 L20 85 L30 55 L5 35 H37 Z" fill="url(#tealGrad)" stroke="#72C8C2" strokeWidth="2" strokeLinejoin="round"/>
             {/* The 'E' Motion Lines/Negative Space */}
             <path d="M25 35 H75" stroke="black" strokeWidth="6" strokeLinecap="round" opacity="0.2" />
             <path d="M25 35 H70" stroke="white" strokeWidth="6" strokeLinecap="round" />
             
             <path d="M30 52 H65" stroke="black" strokeWidth="6" strokeLinecap="round" opacity="0.2" />
             <path d="M30 52 H60" stroke="white" strokeWidth="6" strokeLinecap="round" />
             
             <path d="M25 70 H75" stroke="black" strokeWidth="6" strokeLinecap="round" opacity="0.2" />
             <path d="M25 70 H70" stroke="white" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
        
        {variant === 'full' && (
            <div className="flex flex-col justify-center h-full">
                <span className="font-nunito font-extrabold text-[#72C8C2] text-3xl leading-[0.8] tracking-tight">elastic</span>
                <span className="font-nunito font-bold text-[#5D9CC9] text-[9px] leading-tight tracking-wide mt-0.5">Premium Egyptian Products</span>
            </div>
        )}
      </div>
    );
  }

  return (
    <img 
      src={paths[attempt]} 
      alt="Elastic Logo" 
      className={`${className} object-contain`}
      onError={handleError}
    />
  );
};