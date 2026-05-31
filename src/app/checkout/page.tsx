import type { Metadata } from "next";
import { CheckoutPage } from "@/components/checkout";

export const metadata: Metadata = {
  title: "Checkout · Aftercare",
  description: "Secure checkout for AfterCare: When It's Over.",
};

export default function Page() {
  return <CheckoutPage />;
}
