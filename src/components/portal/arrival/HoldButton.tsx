"use client";

import { useState } from "react";

export function HoldButton() {
  const [holding, setHolding] = useState(false);

  function startHold() {
    setHolding(true);
  }

  function endHold() {
    setHolding(false);
  }

  return (
    <div className="mt-12 flex justify-center lg:justify-start">
      <button
        type="button"
        aria-pressed={holding}
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        className={`relative flex h-36 w-36 items-center justify-center rounded-full border transition-all duration-500 sm:h-40 sm:w-40 ${
          holding
            ? "border-[#C9A962]/60 bg-[#C9A962]/10 shadow-[0_0_60px_rgba(201,169,98,0.35)]"
            : "border-[#C9A962]/30 bg-app shadow-[0_0_30px_rgba(201,169,98,0.12)]"
        }`}
      >
        <span
          className={`absolute inset-3 rounded-full transition-all duration-500 ${
            holding
              ? "bg-[radial-gradient(circle,rgba(201,169,98,0.35)_0%,transparent_70%)]"
              : "bg-[radial-gradient(circle,rgba(201,169,98,0.15)_0%,transparent_70%)]"
          }`}
          aria-hidden
        />
        <span className="relative text-[10px] uppercase tracking-[0.28em] text-headline">
          Hold
        </span>
      </button>
    </div>
  );
}
