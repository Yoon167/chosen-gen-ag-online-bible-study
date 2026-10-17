"use client";

import { cn } from "@/lib/utils";

/** The Facebook "f", white on Facebook blue. */
function FacebookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        fill="currentColor"
        d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"
      />
    </svg>
  );
}

/** "Continue with Facebook", in Facebook's own blue as its brand guide asks. */
export function FacebookButton({
  label,
  disabled,
  onClick,
  className,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-9 w-full items-center justify-center gap-2 rounded-md bg-[#1877F2] px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#166FE5] disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    >
      <FacebookMark className="size-4" />
      {label}
    </button>
  );
}
