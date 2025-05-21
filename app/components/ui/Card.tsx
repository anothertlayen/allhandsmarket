"use client";

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  border = true,
  shadow = 'sm',
  rounded = 'md',
  hover = false,
}) => {
  // Padding styles
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  // Border styles
  const borderStyle = border ? 'border border-gray-200' : '';

  // Shadow styles
  const shadowStyles = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow',
    lg: 'shadow-lg',
  };

  // Rounded styles
  const roundedStyles = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  // Hover style
  const hoverStyle = hover ? 'transition-all duration-200 hover:shadow-md' : '';

  // Combined styles
  const cardStyles = `
    bg-white
    ${paddingStyles[padding]}
    ${borderStyle}
    ${shadowStyles[shadow]}
    ${roundedStyles[rounded]}
    ${hoverStyle}
    ${className}
  `;

  return <div className={cardStyles}>{children}</div>;
};

export default Card;