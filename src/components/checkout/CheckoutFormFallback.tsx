"use client";

import Link from "next/link";
import { trackPurchaseIntent } from "@/lib/analytics";
import { getPaymentMethod, type PaymentMethodId } from "@/lib/payment-methods";
import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <div className="mt-3">{children}</div>
    </label>
  );
}

export function CheckoutFormFallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("visa");

  const selectedMethod = useMemo(
    () => getPaymentMethod(paymentMethod),
    [paymentMethod],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    trackPurchaseIntent();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    try {
      const response = await fetch("/api/checkout/demo-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error ?? "Checkout unavailable right now.");
        return;
      }

      router.push("/checkout/success");
      router.refresh();
    } catch {
      setError("Unable to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <PaymentMethodSelector
        value={paymentMethod}
        onChange={(method) => {
          setPaymentMethod(method);
          setError(null);
        }}
      />

      <p className="text-xs leading-relaxed text-neutral-500">
        {selectedMethod.hint}
      </p>

      <Field label="Email address">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="where we send your access link"
          className="field-input"
        />
      </Field>

      <Field label="Name on card">
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder="Full name"
          className="field-input"
        />
      </Field>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <CardIcon />
          <p className="field-label">Card details</p>
        </div>
        <input
          type="text"
          name="cardNumber"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="Card number"
          className="field-input mb-3"
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="expiry"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM / YY"
            className="field-input"
          />
          <input
            type="text"
            name="cvc"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="CVC"
            className="field-input"
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary">
        <span className="btn-primary-label">
          {loading ? "Processing..." : `Pay with ${selectedMethod.label}`}
        </span>
        {!loading && (
          <span className="btn-primary-arrow" aria-hidden>
            →
          </span>
        )}
      </button>

      <p className="text-xs leading-relaxed text-neutral-600">
        Your bank may open a separate page for OTP or 3D Secure verification.
      </p>

      <p className="type-kicker flex items-center justify-center gap-2 text-neutral-600">
        <ShieldIcon />
        Secure checkout
      </p>

      <p className="text-center">
        <Link
          href="/"
          className="text-xs text-neutral-500 transition-colors hover:text-app"
        >
          ← Back to home
        </Link>
      </p>
    </form>
  );
}

function CardIcon() {
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
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="shrink-0 text-neutral-600"
      aria-hidden
    >
      <path d="M12 3 20 7v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4z" />
    </svg>
  );
}
