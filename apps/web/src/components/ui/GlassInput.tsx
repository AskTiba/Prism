'use client';

import { InputHTMLAttributes, forwardRef, useState } from 'react';

type GlassInputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'filter' | 'form';
};

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className = '', variant = 'filter', ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const padding = variant === 'filter' ? 'px-4 py-3.5' : 'px-3 py-2.5';

    return (
      <div
        className={`rounded-xl bg-white/60 shadow-sm backdrop-blur-lg transition-shadow duration-150 min-h-[48px] ${
          focused ? 'shadow-md ring-1 ring-green/30' : ''
        } ${className}`}
        style={{ width: variant === 'filter' ? undefined : '100%' }}
      >
        <input
          ref={ref}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-transparent ${padding} text-sm text-grey-900 placeholder:text-grey-300 outline-none`}
          {...props}
        />
      </div>
    );
  },
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;
