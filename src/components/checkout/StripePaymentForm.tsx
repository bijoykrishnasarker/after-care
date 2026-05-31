"use client";

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useMemo, useState } from "react";
import { trackPurchaseIntent } from "@/lib/analytics";
import { getPaymentMethod, type PaymentMethodId } from "@/lib/payment-methods";
import { PaymentMethodSelector } from "./PaymentMethodSelector";

type StripePaymentFormProps = {
  clientSecret: string;
};

function getPaymentIntentId(secret: string) {
  return secret.split("_secret_")[0] ?? secret;
}

export function StripePaymentForm({ clientSecret }: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>("visa");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedMethod = useMemo(
    () => getPaymentMethod(paymentMethod),
    [paymentMethod],
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!stripe || !elements) {
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Enter your email before continuing.");
      return;
    }

    setIsProcessing(true);
    trackPurchaseIntent();

    try {
      await fetch("/api/stripe/update-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId: getPaymentIntentId(clientSecret),
          email,
        }),
      });
    } catch {
      void 0;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
        receipt_email: email,
        payment_method_data: {
          billing_details: {
            name,
            email,
          },
        },
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
      setIsProcessing(false);
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <PaymentMethodSelector
        value={paymentMethod}
        onChange={(method) => {
          setPaymentMethod(method);
          setErrorMessage(null);
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Full name"
          className="field-input"
        />
      </Field>

      <div>
        <div className="mb-3 flex items-center gap-2">
          <CardIcon />
          <p className="field-label">Card details</p>
        </div>
        <div className="rounded-none border border-app bg-surface px-3 py-4">
          <PaymentElement
            key={paymentMethod}
            options={{
              layout: "tabs",
              wallets: {
                applePay: "never",
                googlePay: "never",
              },
            }}
          />
        </div>
      </div>

      {errorMessage && (
        <div
          className="border border-red-900/80 bg-red-950/40 px-4 py-4 text-center"
          role="alert"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-red-400">
            Payment unsuccessful
          </p>
          <p className="mt-2 text-sm leading-relaxed text-red-200/90">
            {errorMessage}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        className="btn-primary"
      >
        <span className="btn-primary-label">
          {isProcessing ? "Processing..." : `Pay with ${selectedMethod.label}`}
        </span>
        {!isProcessing && (
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
    </form>
  );
}

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
