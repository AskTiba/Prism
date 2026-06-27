'use client';

import React from 'react';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type GlassButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'primary' | 'danger';
};

const variantClasses: Record<NonNullable<GlassButtonProps['variant']>, string> = {
  default:
    'bg-white/60 text-grey-900 shadow-sm backdrop-blur-lg hover:shadow-md focus-visible:ring-2 focus-visible:ring-green/30',
  primary:
    'bg-grey-900 text-white shadow-md shadow-black/5 hover:bg-grey-800 focus-visible:ring-2 focus-visible:ring-grey-500',
  danger:
    'bg-red text-white shadow-md shadow-red/10 hover:bg-red/85 focus-visible:ring-2 focus-visible:ring-red/30',
};

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className = '', variant = 'default', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl px-4 py-3 text-sm font-bold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;
