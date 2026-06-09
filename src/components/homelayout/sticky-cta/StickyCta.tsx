"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const finalClose = document.getElementById("final-close");

    let heroVisible = true;
    let finalVisible = false;

    const updateVisibility = () => {
      setVisible(!heroVisible && !finalVisible);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) heroVisible = entry.isIntersecting;
          if (entry.target === finalClose) finalVisible = entry.isIntersecting;
        }
        updateVisibility();
      },
      { threshold: 0.1 },
    );

    if (hero) observer.observe(hero);
    if (finalClose) observer.observe(finalClose);

    updateVisibility();

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-app bg-app/95 backdrop-blur-sm transition-transform duration-300 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-4 lg:px-12">
        <div className="flex min-w-0 items-start gap-3 sm:items-center">
          <span
            className="mt-2 h-2 w-2 shrink-0 rounded-full bg-red-800 sm:mt-0"
            aria-hidden
          />
          <div className="min-w-0">
            <p className="font-serif-display text-base italic leading-snug text-app sm:text-lg">
              Ready to process what you&apos;re carrying?
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-prose-soft sm:text-[11px]">
              Immediate access · $48.88
            </p>
          </div>
        </div>

        <Link
          href="/checkout"
          className="btn-primary btn-primary--inline shrink-0 gap-2 px-5 py-3 text-[10px] sm:px-6 sm:py-3.5 sm:text-[11px]"
        >
          Enter Aftercare
          <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
