"use client";

import {
  PAYMENT_METHODS,
  type PaymentMethod,
  type PaymentMethodId,
} from "@/lib/payment-methods";

type PaymentMethodSelectorProps = {
  value: PaymentMethodId;
  onChange: (method: PaymentMethodId) => void;
};

const ROW_ONE = PAYMENT_METHODS.slice(0, 5);
const ROW_TWO = PAYMENT_METHODS.slice(5);

/** Matches one cell in the 5-column top row (gap-1.5 = 0.375rem × 4 gaps). */
const CELL_WIDTH = "calc((100% - 1.5rem) / 5)";

function PaymentMethodButton({
  method,
  selected,
  onChange,
}: {
  method: PaymentMethod;
  selected: boolean;
  onChange: (method: PaymentMethodId) => void;
}) {
  const { id, label, logo } = method;
  const isApplePay = id === "apple-pay";

  return (
    <button
      type="button"
      onClick={() => onChange(id)}
      aria-pressed={selected}
      aria-label={`Pay with ${label}`}
      className={[
        "payment-method-btn group relative flex w-full items-center justify-center border p-1.5 outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#C9A962]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
        selected
          ? "border-[#C9A962] bg-surface-elevated shadow-[0_4px_28px_rgba(201,169,98,0.22)]"
          : "border-app bg-surface hover:border-[#C9A962]/55 hover:bg-surface-elevated",
      ].join(" ")}
    >
      <span className="payment-method-logo flex h-7 w-full items-center justify-center overflow-hidden rounded-none bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt=""
          width={isApplePay ? 32 : 40}
          height={isApplePay ? 18 : 24}
          className={
            isApplePay
              ? "h-3.5 w-7 object-contain object-center"
              : "h-5 w-10 object-contain object-center"
          }
          loading="lazy"
        />
      </span>
    </button>
  );
}

export function PaymentMethodSelector({
  value,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <fieldset>
      <legend className="field-label">Choose how to pay</legend>
      <div className="mt-3 space-y-1.5">
        <ul className="grid grid-cols-5 gap-1.5">
          {ROW_ONE.map((method) => (
            <li key={method.id}>
              <PaymentMethodButton
                method={method}
                selected={value === method.id}
                onChange={onChange}
              />
            </li>
          ))}
        </ul>
        <ul className="flex justify-center gap-1.5">
          {ROW_TWO.map((method) => (
            <li
              key={method.id}
              className="min-w-0 shrink-0"
              style={{ width: CELL_WIDTH }}
            >
              <PaymentMethodButton
                method={method}
                selected={value === method.id}
                onChange={onChange}
              />
            </li>
          ))}
        </ul>
      </div>
    </fieldset>
  );
}
