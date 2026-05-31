import Link from "next/link";

type CheckoutResultProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
};

export function CheckoutResult({
  eyebrow,
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CheckoutResultProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-app px-6 text-app">
      <div className="max-w-md text-center">
        <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-serif-display text-3xl italic text-headline sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          {description}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={primaryHref}
            className="btn-primary btn-primary--inline gap-2"
          >
            {primaryLabel}
            <span aria-hidden>→</span>
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center border border-neutral-700 px-6 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400 transition-colors duration-300 hover:border-neutral-500 hover:text-app"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </main>
  );
}
