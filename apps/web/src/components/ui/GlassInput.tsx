'use client';

import { InputHTMLAttributes, forwardRef, useState } from 'react';

type GlassInputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'filter' | 'form';
  prefix?: string;
};

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className = '', variant = 'filter', prefix, ...props }, ref) => {
    const [focused, setFocused] = useState(false);

    const isForm = variant === 'form';
    const bg = isForm ? 'bg-white/90' : 'bg-white/60';
    const blur = isForm ? '' : 'backdrop-blur-lg';
    const padding = isForm ? 'px-3 py-2.5' : 'px-4 py-3';

    return (
      <div
        className={`rounded-xl ${bg} shadow-sm ${blur} transition-shadow duration-150 min-h-[48px] ${
          focused ? 'shadow-md ring-1 ring-green/30' : ''
        } ${className}`}
        style={{ width: isForm ? '100%' : undefined }}
      >
        <div className="flex items-center">
          {prefix && (
            <span className="ml-3 text-sm text-grey-400 select-none">{prefix}</span>
          )}
          <input
            ref={ref}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-full bg-transparent ${padding} text-sm text-grey-900 placeholder:text-grey-300 outline-none`}
            {...props}
          />
        </div>
      </div>
    );
  },
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;
