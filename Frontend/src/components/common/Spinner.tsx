import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'gray';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    primary: 'border-blue-500 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-500 border-t-transparent'
  };

  return (
    <div
      className={`inline-block border-2 border-solid rounded-full animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
      style={{
        animation: 'spin 1s linear infinite'
      }}
    />
  );
};

export default Spinner;