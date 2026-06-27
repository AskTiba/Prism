'use client';
import React from 'react';

import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type GlassInputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: 'filter' | 'form';
  prefix?: string;
  error?: string | boolean;
};

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className = '', variant = 'filter', prefix, error, type, ...props }, ref) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isForm = variant === 'form';
    const bg = isForm ? 'bg-white/90' : 'bg-white/60';
    const blur = isForm ? '' : 'backdrop-blur-lg';
    const padding = isForm ? 'px-3 py-2.5' : 'px-4 py-3';

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
    const hasError = !!error;

    return (
      <div className="w-full flex flex-col gap-1.5">
        <div
          className={`relative rounded-xl ${bg} shadow-sm ${blur} transition-shadow duration-150 min-h-[48px] ${
            focused ? (hasError ? 'shadow-md ring-1 ring-red-500/50' : 'shadow-md ring-1 ring-green/30') : (hasError ? 'ring-1 ring-red-500/30' : '')
          } ${className}`}
          style={{ width: isForm ? '100%' : undefined }}
        >
          <div className="flex items-center h-full">
            {prefix && (
              <span className="ml-3 text-sm text-grey-400 select-none">{prefix}</span>
            )}
            <input
              ref={ref}
              type={inputType}
              aria-invalid={hasError ? 'true' : undefined}
              onFocus={(e) => {
                setFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setFocused(false);
                props.onBlur?.(e);
              }}
              className={`w-full h-full bg-transparent ${padding} text-sm text-grey-900 placeholder:text-grey-300 outline-none rounded-xl ${isPassword ? 'pr-12' : ''}`}
              {...props}
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-grey-400 hover:text-grey-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-grey-500 rounded-md"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
        </div>
        {typeof error === 'string' && (
          <p className="text-sm text-red-500 pl-1">{error}</p>
        )}
      </div>
    );
  },
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;
