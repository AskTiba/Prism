'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

type GlassButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`w-full min-h-[48px] rounded-xl bg-white/60 px-4 py-3 text-sm font-medium text-grey-900 shadow-sm backdrop-blur-lg transition-all duration-150 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 focus-visible:ring-2 focus-visible:ring-green/30 focus-visible:outline-none ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;
