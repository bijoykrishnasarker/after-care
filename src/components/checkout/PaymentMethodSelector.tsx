"use client";

import Image from "next/image";
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
      <ul className="mt-3 grid grid-cols-2 gap-3">
        {PAYMENT_METHODS.map(({ id, label, logo }) => {
          const selected = value === id;

          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-pressed={selected}
                aria-label={`Pay with ${label}`}
                className={[
                  "payment-method-btn group relative flex w-full flex-col items-center gap-3 border px-4 py-5 outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#C9A962]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                  selected
                    ? "border-[#C9A962] bg-surface-elevated shadow-[0_4px_28px_rgba(201,169,98,0.22)]"
                    : "border-app bg-surface hover:border-[#C9A962]/55 hover:bg-surface-elevated",
                ].join(" ")}
              >
                <span className="payment-method-label text-[9px] font-medium uppercase tracking-[0.16em]">
                  {label}
                </span>
                <span className="payment-method-logo flex h-14 w-full max-w-[8.5rem] items-center justify-center overflow-hidden rounded-md bg-white px-3 py-2">
                  <Image
                    src={logo}
                    alt={label}
                    width={120}
                    height={48}
                    className="h-10 w-full object-contain transition-opacity duration-300 group-hover:opacity-100"
                    priority
                    unoptimized
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
