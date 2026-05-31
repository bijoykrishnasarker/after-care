import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

type LegalPageLayoutProps = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

export function LegalPageLayout({ title, updated, children }: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-app px-6 py-12 text-app sm:px-10 sm:py-16 lg:px-16">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-app"
          >
            <span aria-hidden>← </span>
            Back home
          </Link>
          <ThemeToggle />
        </div>

        <p className="mt-10 text-[10px] uppercase tracking-[0.22em] text-neutral-600">
          Aftercare Global
        </p>
        <h1 className="mt-4 font-serif-display text-4xl text-headline sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm text-neutral-500">Last updated: {updated}</p>

        <div className="mt-12 space-y-8 text-sm leading-relaxed text-neutral-400 [&_h2]:text-base [&_h2]:font-medium [&_h2]:uppercase [&_h2]:tracking-[0.14em] [&_h2]:text-neutral-300 [&_li]:mt-2 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </main>
  );
}
