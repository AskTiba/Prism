'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Glass } from '@samasante/liquid-glass';

interface GlassDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function GlassDialog({ open, onClose, title, children }: GlassDialogProps) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onCloseRef.current();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-md animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <Glass
          style={{ borderRadius: 16, padding: 24 }}
          optics={{
            frost: 10, depth: 0.45, curvature: 0.2,
            strength: 0.1, dispersion: 0.15, bend: 0.3,
            specular: 0.5, brightness: 0.1,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-grey-900">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-grey-500 hover:bg-white/20 hover:text-grey-900 transition-all focus-visible:ring-2 focus-visible:ring-green/30 focus-visible:outline-none"
              aria-label="Close"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          {children}
        </Glass>
      </div>
    </div>
  );
}
