"use client";

import React from 'react';
import Link from 'next/link';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  href?: string;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  disabled = false,
  isLoading = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  // Size styles
  const sizeStyles = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 py-2 px-4',
    lg: 'h-12 px-6 text-lg',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus-visible:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  };
  
  // Width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Combined styles
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`;
  
  // Loading state
  const content = isLoading ? (
    <>
      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      {children}
    </>
  ) : children;
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        {content}
      </Link>
    );
  }
  
  // Render as button
  return (
    <button
      type={type}
      className={buttonStyles}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;