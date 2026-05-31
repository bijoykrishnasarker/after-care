"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-app bg-nav backdrop-blur-sm transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex min-w-0 items-baseline gap-1.5 transition-opacity duration-300 hover:opacity-80 sm:gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="text-sm font-bold uppercase tracking-[0.12em] text-app sm:text-base">
            Aftercare
          </span>
          <span className="text-[10px] font-light uppercase tracking-[0.18em] text-muted-app sm:text-xs">
            Global
          </span>
        </Link>
        <div className="hidden items-center gap-5 md:flex">
          <ThemeToggle />
          <Link
            href="/portal"
            className="text-xs font-medium uppercase tracking-[0.16em] text-muted-app transition-colors duration-300 hover:text-app"
          >
            Portal
          </Link>
          <Link
            href="/checkout"
            className="nav-cta px-5 py-2.5 text-xs font-medium uppercase tracking-[0.16em]"
          >
            Get Access
          </Link>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-app"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={`absolute left-0 top-0 block h-px w-5 bg-[var(--fg)] transition-all duration-300 ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] block h-px w-5 bg-[var(--fg)] transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 block h-px w-5 bg-[var(--fg)] transition-all duration-300 ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-app bg-app transition-all duration-300 md:hidden ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
          <Link
            href="/portal"
            className="block border-b border-app pb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-app transition-colors duration-300 hover:text-app"
            onClick={() => setOpen(false)}
          >
            Portal
          </Link>
          <div className="mt-4">
            <Link
              href="/checkout"
              className="nav-cta inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em]"
              onClick={() => setOpen(false)}
            >
              Get Access
              <span aria-hidden className="text-xs leading-none">
                →
              </span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
