import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-app bg-app px-6 py-14 pb-28 text-app sm:px-10 sm:py-16 sm:pb-24 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="md:ml-12 lg:ml-20 xl:ml-28">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-x-16 lg:gap-y-0">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold uppercase tracking-[0.12em] text-app sm:text-base">
                  Aftercare
                </span>
                <span className="text-[10px] font-light uppercase tracking-[0.18em] text-neutral-500 sm:text-xs">
                  Global
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm italic leading-relaxed text-neutral-500">
                Care for after the feelings change.
              </p>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500 sm:text-[11px]">
                Products
              </p>
              <ul className="mt-4">
                <li>
                  <Link
                    href="/lead-magnet"
                    className="text-xs leading-snug text-neutral-300 transition-colors duration-300 hover:text-app sm:text-sm"
                  >
                    Free guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-xs leading-snug text-neutral-300 transition-colors duration-300 hover:text-app sm:text-sm"
                  >
                    AfterCare: When It&apos;s Over
                  </Link>
                </li>
              </ul>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500 sm:text-[11px]">
                Access
              </p>
              <ul className="mt-4 flex flex-row flex-wrap gap-x-3 gap-y-2 lg:flex-col lg:gap-x-0 lg:gap-y-3">
                <li>
                  <Link
                    href="/portal"
                    className="text-xs text-neutral-300 transition-colors duration-300 hover:text-app sm:text-sm"
                  >
                    Member Portal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/checkout"
                    className="text-xs text-neutral-300 transition-colors duration-300 hover:text-app sm:text-sm"
                  >
                    Purchase Access
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-app pt-8 sm:mt-14">
            <p className="min-w-0 text-[9px] uppercase leading-snug tracking-[0.12em] text-neutral-600 sm:text-[10px] sm:tracking-[0.14em] lg:text-[11px]">
              © 2026 Aftercare Global. All rights reserved.
            </p>
            <div className="flex shrink-0 items-center gap-5 sm:gap-8">
              <Link
                href="/privacy"
                className="text-[9px] uppercase tracking-[0.12em] text-neutral-600 transition-colors duration-300 hover:text-neutral-400 sm:text-[10px] sm:tracking-[0.14em] lg:text-[11px]"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-[9px] uppercase tracking-[0.12em] text-neutral-600 transition-colors duration-300 hover:text-neutral-400 sm:text-[10px] sm:tracking-[0.14em] lg:text-[11px]"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
