'use client';

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react';
import { Glass, type GlassOptics } from '@samasante/liquid-glass';

const PANEL_LENS: Partial<GlassOptics> = {
  frost: 12,
  depth: 0.5,
  curvature: 0.2,
  strength: 0.1,
  dispersion: 0.15,
  bend: 0.3,
  specular: 0.4,
  brightness: 0.08,
};

interface GlassSelectOption {
  value: string;
  label: string;
}

interface GlassSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: GlassSelectOption[];
  placeholder?: string;
  'aria-label'?: string;
  className?: string;
  variant?: 'filter' | 'form';
}

export default function GlassSelect({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  'aria-label': ariaLabel,
  className = '',
  variant = 'filter',
}: GlassSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<number>(-1);

  const selected = options.find((o) => o.value === value);
  const label = selected?.label ?? placeholder;

  const close = useCallback(() => {
    setOpen(false);
    activeRef.current = -1;
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey as any);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey as any);
    };
  }, [open, close]);

  function handleSelect(val: string) {
    onChange(val);
    close();
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        activeRef.current = Math.min(activeRef.current + 1, options.length - 1);
        scrollToActive();
        break;
      case 'ArrowUp':
        e.preventDefault();
        activeRef.current = Math.max(activeRef.current - 1, 0);
        scrollToActive();
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeRef.current >= 0 && activeRef.current < options.length) {
          handleSelect(options[activeRef.current].value);
        }
        break;
      case 'Escape':
        e.preventDefault();
        close();
        break;
    }
  }

  function scrollToActive() {
    const list = listRef.current;
    const items = list?.querySelectorAll('[role="option"]');
    if (items && activeRef.current >= 0 && activeRef.current < items.length) {
      items[activeRef.current].scrollIntoView({ block: 'nearest' });
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        className={`flex w-full min-h-[48px] items-center justify-between gap-2.5 rounded-xl px-4 py-3 text-sm text-grey-900 shadow-sm transition-shadow duration-150 hover:shadow-md focus-visible:ring-2 focus-visible:ring-green/30 focus-visible:outline-none ${variant === 'form' ? 'bg-white/90' : 'bg-white/60 backdrop-blur-lg'}`}
      >
        <span className={selected ? 'text-grey-900' : 'text-grey-300'}>{label}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          className={`shrink-0 transition-transform duration-250 ${open ? 'rotate-180' : ''}`}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="#696868"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-50 mt-1.5">
          <Glass optics={PANEL_LENS} style={{ borderRadius: 12, padding: 4 }}>
            <div
              ref={listRef}
              role="listbox"
              aria-label={ariaLabel}
              className="max-h-56 overflow-y-auto glass-scrollbar"
            >
              <button
                role="option"
                aria-selected={value === ''}
                onClick={() => handleSelect('')}
                onMouseEnter={() => (activeRef.current = -1)}
                className={`glass-option w-full min-h-[48px] rounded-lg px-3.5 py-2.5 text-left text-sm transition-all duration-150 focus-visible:ring-2 focus-visible:ring-green/30 focus-visible:outline-none ${
                   value === ''
                     ? 'text-grey-900 font-medium bg-green/5'
                     : 'text-white/70 hover:text-white hover:bg-white/15'
                 }`}
               >
                 {placeholder}
               </button>
               {options.map((opt, i) => (
                 <button
                   key={opt.value}
                   role="option"
                   aria-selected={value === opt.value}
                   onClick={() => handleSelect(opt.value)}
                   onMouseEnter={() => (activeRef.current = i)}
                   className={`glass-option w-full min-h-[48px] rounded-lg px-3.5 py-2.5 text-left text-sm transition-all duration-150 focus-visible:ring-2 focus-visible:ring-green/30 focus-visible:outline-none ${
                     value === opt.value
                       ? 'text-grey-900 font-medium bg-green/5'
                       : 'text-white/70 hover:text-white hover:bg-white/15'
                   }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Glass>
        </div>
      )}
    </div>
  );
}
