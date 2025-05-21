"use client";

import React from 'react';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'Avatar',
  size = 'md',
  className = '',
  fallback,
}) => {
  // Size styles
  const sizeStyles = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
  };

  // Combined styles
  const avatarStyles = `
    relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200
    ${sizeStyles[size]}
    ${className}
  `;

  // Generate fallback initials from alt text
  const getInitials = () => {
    if (fallback) return fallback;
    
    if (!alt || alt === 'Avatar') return 'U';
    
    return alt
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className={avatarStyles}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      ) : (
        <span className="font-medium text-gray-600">{getInitials()}</span>
      )}
    </div>
  );
};

export default Avatar;