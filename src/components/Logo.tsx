interface LogoProps {
  variant?: 'dark' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'dark', className = '', size = 'md' }: LogoProps) {
  const isWhite = variant === 'white';
  
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const chevronSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`inline-flex items-center gap-1.5 font-bold tracking-tight select-none ${className}`}>
      <span
        className={`font-display font-extrabold tracking-[-0.02em] ${
          textSizes[size]
        } ${isWhite ? 'text-white' : 'text-[#000229]'}`}
      >
        Sales<span className={isWhite ? 'text-white' : 'text-[#000229]'}>Nego</span>
      </span>
      {/* SalesNego Dual Chevron Mark (Blue + Orange) */}
      <svg
        className={`${chevronSizes[size]} flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5`}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Chevron 1: Royal Blue #103CE7 */}
        <path
          d="M6 5L14 14L6 23"
          stroke="#103CE7"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Chevron 2: Vibrant Orange #FF6004 */}
        <path
          d="M14 5L22 14L14 23"
          stroke="#FF6004"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
