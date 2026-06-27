'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface GlassDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function GlassDialog({ open, onClose, title, children }: GlassDialogProps) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

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
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xl" />
      <div
        className="relative z-10 mx-4 w-full max-w-md animate-scale-in my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-xl bg-white/90 border border-white/20 shadow-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-grey-900">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded-full text-grey-500 hover:bg-grey-900/5 hover:text-grey-900 transition-all focus-visible:ring-2 focus-visible:ring-green/30 focus-visible:outline-none"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
