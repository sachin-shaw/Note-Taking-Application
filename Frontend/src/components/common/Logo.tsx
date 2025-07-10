import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        {/* Blue flower/star icon */}
        <svg viewBox="0 0 24 24" className="w-full h-full text-blue-500">
          <path
            fill="currentColor"
            d="M12 2L13.5 8.5L20 7L15 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9 12L4 7L10.5 8.5L12 2Z"
          />
        </svg>
      </div>
      {showText && (
        <span className={`font-bold text-gray-800 ${textSizeClasses[size]}`}>
          HD
        </span>
      )}
    </div>
  );
};

export default Logo;