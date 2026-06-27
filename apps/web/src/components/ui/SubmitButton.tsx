'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function SubmitButton({ children, className = '', ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || props.disabled}
      className={`mt-2 w-full rounded-xl bg-grey-900 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-black/5 transition-all duration-200 hover:bg-grey-800 disabled:bg-grey-300 disabled:text-grey-500 disabled:cursor-not-allowed flex items-center justify-center ${className}`}
      {...props}
    >
      {pending ? (
        <Loader2 data-testid="loading-spinner" className="h-5 w-5 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
