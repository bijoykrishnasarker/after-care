"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { CheckoutFormFallback } from "./CheckoutFormFallback";
import { StripePaymentForm } from "./StripePaymentForm";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

function getStripeAppearance(isLight: boolean): StripeElementsOptions["appearance"] {
  if (isLight) {
    return {
      theme: "stripe",
      variables: {
        colorPrimary: "#1a1a1a",
        colorBackground: "#ffffff",
        colorText: "#1a1a1a",
        colorTextSecondary: "#525252",
        colorDanger: "#dc2626",
        borderRadius: "0px",
        fontFamily: "var(--font-sans), system-ui, sans-serif",
      },
      rules: {
        ".Input": {
          border: "1px solid #d4d4d4",
          backgroundColor: "#ffffff",
          boxShadow: "none",
        },
        ".Input:focus": {
          border: "1px solid #737373",
          boxShadow: "none",
        },
        ".Label": {
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          fontSize: "10px",
        },
      },
    };
  }

  return {
    theme: "night",
    variables: {
      colorPrimary: "#EEEDE8",
      colorBackground: "#0a0a0a",
      colorText: "#ffffff",
      colorTextSecondary: "#a3a3a3",
      colorDanger: "#f87171",
      borderRadius: "0px",
      fontFamily: "var(--font-sans), system-ui, sans-serif",
    },
    rules: {
      ".Input": {
        border: "1px solid #262626",
        backgroundColor: "#0a0a0a",
        boxShadow: "none",
      },
      ".Input:focus": {
        border: "1px solid #525252",
        boxShadow: "none",
      },
      ".Label": {
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        fontSize: "10px",
      },
    },
  };
}

export function PaymentForm() {
  const { resolvedTheme } = useTheme();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeReady, setStripeReady] = useState(false);
  const isLight = resolvedTheme === "light";

  useEffect(() => {
    if (!stripePromise) {
      return;
    }

    async function createPaymentIntent() {
      try {
        const response = await fetch("/api/stripe/create-payment-intent", {
          method: "POST",
        });
        const data = (await response.json()) as {
          clientSecret?: string;
          error?: string;
        };

        if (response.ok && data.clientSecret) {
          setClientSecret(data.clientSecret);
          setStripeReady(true);
        }
      } catch {
        void 0;
      }
    }

    createPaymentIntent();
  }, []);

  const elementsOptions = useMemo<StripeElementsOptions | undefined>(() => {
    if (!clientSecret) return undefined;

    return {
      clientSecret,
      appearance: getStripeAppearance(isLight),
    };
  }, [clientSecret, isLight]);

  return (
    <div className="p-6 sm:p-8 lg:p-10 xl:p-12">
      {stripeReady && clientSecret && elementsOptions && stripePromise ? (
        <Elements stripe={stripePromise} options={elementsOptions}>
          <StripePaymentForm clientSecret={clientSecret} />
        </Elements>
      ) : (
        <CheckoutFormFallback />
      )}
    </div>
  );
}
