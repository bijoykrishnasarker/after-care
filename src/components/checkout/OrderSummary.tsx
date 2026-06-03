const features = [
  "7 private audio experiences",
  "Sequential room progression",
  "Lifetime access — revisit anytime",
  "Immediate private access",
] as const;

export function OrderSummary() {
  return (
    <div className="border-b border-app p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10 xl:p-12">
      <div className="flex items-center gap-2">
        <ShieldIcon />
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500 sm:text-[11px]">
          Secure checkout
        </p>
      </div>

      <h1 className="mt-8 text-xl font-medium text-app sm:text-2xl">
        AfterCare:{" "}
        <span className="font-serif-display text-2xl font-normal italic sm:text-3xl">
          When It&apos;s Over
        </span>
      </h1>

      <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500 sm:text-[15px]">
        Full 7-Room Audio Experience. Immediate, private access.
      </p>

      <ul className="mt-8 space-y-3.5">
        {features.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm font-medium text-app">
            <span className="mt-0.5 text-[#9B4545]" aria-hidden>
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-10 border-t border-app pt-8">
        <div className="flex items-center justify-between text-sm text-neutral-400">
          <span>The 7 Rooms Experience</span>
          <span className="text-neutral-300">$48.88</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-neutral-500">
          <span>Taxes</span>
          <span>$0.00</span>
        </div>

        <div className="mt-6 border-t border-app pt-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
            Total
          </p>
          <p className="mt-2 font-serif-display text-4xl text-app sm:text-5xl">
            $48.88
          </p>
        </div>
      </div>

      <p className="mt-10 text-sm italic text-neutral-600">
        Healing should feel beautiful too.
      </p>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-neutral-500"
      aria-hidden
    >
      <path d="M12 3 20 7v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" />
    </svg>
  );
}
