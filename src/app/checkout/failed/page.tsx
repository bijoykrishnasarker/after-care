import type { Metadata } from "next";
import { CheckoutResult } from "@/components/checkout/CheckoutResult";

export const metadata: Metadata = {
  title: "Payment Failed · Aftercare",
  description: "Your payment could not be completed.",
};

type PageProps = {
  searchParams: Promise<{
    reason?: string;
  }>;
};

const messages = {
  default: {
    title: "Payment wasn't completed.",
    description:
      "Your card was not charged. Please check your details and try again, or use a different payment method.",
  },
  declined: {
    title: "Your card was declined.",
    description:
      "No charge was made. Please try another card or contact your bank, then attempt checkout again.",
  },
  cancelled: {
    title: "Checkout was cancelled.",
    description:
      "You left before payment finished. Nothing was charged. You can return whenever you're ready.",
  },
  processing: {
    title: "Payment couldn't be confirmed.",
    description:
      "We couldn't verify this payment right now. If you were charged, contact support. Otherwise, please try again.",
  },
} as const;

export default async function CheckoutFailedPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const reason = params.reason;
  const copy =
    reason && reason in messages
      ? messages[reason as keyof typeof messages]
      : messages.default;

  return (
    <CheckoutResult
      eyebrow="Payment unsuccessful"
      title={copy.title}
      description={copy.description}
      primaryHref="/checkout"
      primaryLabel="Try again"
      secondaryHref="/"
      secondaryLabel="Back home"
    />
  );
}
