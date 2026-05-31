"use client";

import { useEffect, useRef, useState } from "react";

type ReleaseFieldProps = {
  hint?: string;
  placeholder?: string;
  clearOnEnter?: boolean;
  clearOnPause?: boolean;
  pauseMs?: number;
};

export function ReleaseField({
  hint,
  placeholder = "Type anything. It won't be saved.",
  clearOnEnter = false,
  clearOnPause = false,
  pauseMs = 2000,
}: ReleaseFieldProps) {
  const [value, setValue] = useState("");
  const pauseTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        window.clearTimeout(pauseTimerRef.current);
      }
    };
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (clearOnEnter && event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      setValue("");
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const nextValue = event.target.value;
    setValue(nextValue);

    if (!clearOnPause || nextValue.length === 0) return;

    if (pauseTimerRef.current) {
      window.clearTimeout(pauseTimerRef.current);
    }

    pauseTimerRef.current = window.setTimeout(() => {
      setValue("");
    }, pauseMs);
  }

  return (
    <div className="border border-app/80 bg-surface/30 p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
          Release here
        </p>
        {hint && (
          <p className="max-w-[10rem] text-right text-[9px] leading-relaxed text-neutral-600">
            {hint}
          </p>
        )}
      </div>
      <textarea
        rows={4}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="mt-4 w-full resize-none border border-app/80 bg-app/50 px-4 py-3 text-sm text-neutral-300 placeholder:text-neutral-600 outline-none transition-colors focus:border-neutral-600"
      />
    </div>
  );
}
