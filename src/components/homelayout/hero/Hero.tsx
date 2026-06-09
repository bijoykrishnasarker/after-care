import Link from "next/link";

const stats = [
  { value: "7", label: "Audio rooms" },
  { value: "~2hrs", label: "Total duration" },
  { value: "Forever", label: "Lifetime access" },
] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="bg-app px-6 pb-16 pt-12 sm:px-10 sm:pb-20 sm:pt-16 lg:px-16 lg:pb-24 lg:pt-20 xl:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl md:ml-12 lg:ml-20 xl:ml-28">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-red-600 sm:w-10" aria-hidden />
            <p className="type-kicker text-prose-muted sm:text-[11px]">
              Aftercare: When it&apos;s over
            </p>
          </div>

          <h1 className="font-serif-display mt-8 max-w-4xl text-[clamp(2.75rem,8vw,5.25rem)] font-semibold leading-[1.05] tracking-tight text-headline sm:mt-10">
            Some endings
            <br />
            deserve
            <br />
            ceremony.
          </h1>

          <p className="mt-8 max-w-xl text-base italic leading-relaxed text-prose-muted sm:mt-10 sm:text-lg">
            A luxury emotional recovery experience for people rebuilding
            themselves.
          </p>

          <div className="mt-6 max-w-md border-l border-neutral-700 pl-4 sm:mt-8 sm:pl-5">
            <p className="text-sm leading-relaxed text-prose-soft sm:text-[15px]">
              Seven immersive audio rooms designed to guide you through love,
              grief, change, and emotional exhaustion.
            </p>
          </div>

          <div className="relative z-10 mt-10 flex flex-col gap-6 sm:mt-12 sm:flex-row sm:items-center sm:gap-8">
            <Link
              href="/checkout"
              prefetch
              className="btn-primary btn-primary--inline w-fit gap-2 sm:px-7 sm:py-4 sm:text-xs"
            >
              Enter Aftercare
              <span aria-hidden>→</span>
            </Link>

            <Link
              href="/checkout"
              prefetch
              className="type-kicker transition-opacity duration-300 hover:opacity-80 sm:text-[11px]"
            >
              <p className="text-prose-soft">Private. Immediate access.</p>
              <p className="mt-1 text-[#C9A962]">$48.88 • One-time payment</p>
            </Link>
          </div>

          <div className="mt-14 border-t border-app pt-10 sm:mt-16 sm:pt-12">
            <div className="grid min-w-0 grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              {stats.map((item) => (
                <div key={item.label} className="min-w-0">
                  <p className="font-serif-display text-[clamp(1.5rem,5.5vw,2.25rem)] leading-none text-headline sm:text-3xl lg:text-4xl">
                    {item.value}
                  </p>
                  <p className="mt-1.5 text-[8px] uppercase leading-snug tracking-wide text-prose-soft sm:mt-2 sm:text-[10px] lg:text-[11px]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
