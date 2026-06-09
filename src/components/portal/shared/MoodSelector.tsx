"use client";

import { useState } from "react";

const moods = ["Heavy", "Numb", "Present", "Light", "Open"] as const;

export function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [intensity, setIntensity] = useState<Record<string, number>>({});

  function handleMoodSelect(mood: string) {
    setSelectedMood(mood);
    if (!intensity[mood]) {
      setIntensity((current) => ({ ...current, [mood]: 3 }));
    }
  }

  function handleIntensity(mood: string, level: number) {
    setSelectedMood(mood);
    setIntensity((current) => ({ ...current, [mood]: level }));
  }

  return (
    <div className="min-w-0 w-full max-w-full overflow-hidden border border-app/80 bg-surface/30 p-4 sm:p-6">
      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
        How do you feel right now?
      </p>

      <ul className="mt-5 space-y-2">
        {moods.map((mood) => {
          const level = intensity[mood] ?? 0;
          const isActive = selectedMood === mood;

          return (
            <li key={mood}>
              <button
                type="button"
                onClick={() => handleMoodSelect(mood)}
                className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-sm border px-3 py-3 text-left transition-colors sm:px-4 ${
                  isActive
                    ? "border-neutral-600 bg-surface-elevated/60"
                    : "border-app/80 bg-app/40 hover:border-neutral-700"
                }`}
              >
                <span className="min-w-0 shrink text-[10px] uppercase tracking-[0.14em] text-neutral-300 sm:text-[11px] sm:tracking-[0.16em]">
                  {mood}
                </span>
                <span className="flex shrink-0 items-center gap-1 sm:gap-1.5">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <button
                      key={dot}
                      type="button"
                      aria-label={`${mood} intensity ${dot}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleIntensity(mood, dot);
                      }}
                      className={`h-1.5 w-1.5 rounded-full transition-colors ${
                        isActive && dot <= level
                          ? "bg-white"
                          : "border border-neutral-600 bg-transparent"
                      }`}
                    />
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
