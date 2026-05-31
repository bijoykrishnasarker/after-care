import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

type ThemeBarProps = {
  className?: string;
  maxWidth?: string;
};

export function ThemeBar({
  className = "",
  maxWidth = "max-w-5xl",
}: ThemeBarProps) {
  return (
    <div
      className={`mx-auto flex items-center justify-between ${maxWidth} ${className}`.trim()}
    >
      <Link
        href="/"
        className="inline-flex items-baseline gap-1.5 transition-opacity duration-300 hover:opacity-80"
      >
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-app sm:text-sm">
          Aftercare
        </span>
        <span className="text-[10px] font-light uppercase tracking-[0.18em] text-muted-app">
          Global
        </span>
      </Link>
      <ThemeToggle />
    </div>
  );
}
