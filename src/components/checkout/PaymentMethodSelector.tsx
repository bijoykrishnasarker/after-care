"use client";

import {
  PAYMENT_METHODS,
  type PaymentMethodId,
} from "@/lib/payment-methods";

type PaymentMethodSelectorProps = {
  value: PaymentMethodId;
  onChange: (method: PaymentMethodId) => void;
};

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <fieldset>
      <legend className="field-label">Choose how to pay</legend>
      <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3">
        {PAYMENT_METHODS.map(({ id, label, logo, logoClassName }) => {
          const selected = value === id;

          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-pressed={selected}
                aria-label={`Pay with ${label}`}
                className={[
                  "payment-method-btn group relative flex w-full flex-col items-center gap-2 border px-3 py-3.5 outline-none sm:px-4 sm:py-4",
                  "focus-visible:ring-2 focus-visible:ring-[#C9A962]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                  selected
                    ? "border-[#C9A962] bg-surface-elevated shadow-[0_4px_28px_rgba(201,169,98,0.22)]"
                    : "border-app bg-surface hover:border-[#C9A962]/55 hover:bg-surface-elevated",
                ].join(" ")}
              >
                <span className="payment-method-label text-[8px] font-medium uppercase tracking-[0.14em] sm:text-[9px] sm:tracking-[0.16em]">
                  {label}
                </span>
                <span
                  className={`payment-method-logo flex h-12 w-full items-center justify-center overflow-hidden rounded-md px-2 py-1 sm:h-[3.25rem] sm:px-3 ${logoClassName ?? "bg-white"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo}
                    alt=""
                    className="h-full max-h-10 w-full object-contain sm:max-h-11"
                    loading="lazy"
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
