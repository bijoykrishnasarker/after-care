import { ThemeBar } from "@/components/theme/ThemeBar";
import { OrderSummary } from "./OrderSummary";
import { PaymentForm } from "./PaymentForm";

export function CheckoutPage() {
  return (
    <main className="min-h-screen bg-app px-4 py-8 sm:px-6 sm:py-10 lg:py-14 xl:px-8">
      <header className="mb-8 sm:mb-10">
        <ThemeBar />
      </header>

      <div className="mx-auto max-w-5xl border border-app">
        <div className="grid lg:grid-cols-2">
          <OrderSummary />
          <PaymentForm />
        </div>
      </div>
    </main>
  );
}
