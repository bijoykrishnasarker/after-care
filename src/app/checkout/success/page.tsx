import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckoutResult } from "@/components/checkout/CheckoutResult";
import { PurchaseTracker } from "@/components/marketing/PurchaseTracker";

export const metadata: Metadata = {
  title: "Payment Successful · Aftercare",
  description: "Your Aftercare access is on the way.",
};

type PageProps = {
  searchParams: Promise<{
    redirect_status?: string;
    payment_intent?: string;
  }>;
};

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;

  if (params.redirect_status === "failed") {
    redirect("/checkout/failed");
  }

  if (params.redirect_status && params.redirect_status !== "succeeded") {
    redirect("/checkout/failed?reason=processing");
  }

  return (
    <>
      <PurchaseTracker />
      <CheckoutResult
      eyebrow="Payment successful"
      title="Welcome to Aftercare."
      description="Check your email for your private portal link. You can also enter the member portal anytime with the same checkout email."
      primaryHref="/portal"
      primaryLabel="Enter Portal"
      secondaryHref="/"
      secondaryLabel="Back home"
      />
    </>
  );
}
