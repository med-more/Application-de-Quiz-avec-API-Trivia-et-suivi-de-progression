import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  withGlow?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  withGlow = false,
  className = '', 
  ...props 
}) => {
  const baseClasses = 'rounded-md font-medium transition-all duration-300 focus:outline-none transform hover:scale-105 active:scale-95';
  
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    primary: `bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${withGlow ? 'shadow-lg shadow-blue-500/50' : ''}`,
    secondary: `bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg text-gray-800 border border-gray-200 hover:bg-opacity-30 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${withGlow ? 'shadow-lg shadow-gray-500/30' : ''}`,
    danger: `bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${withGlow ? 'shadow-lg shadow-red-500/50' : ''}`
  };
  
  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;