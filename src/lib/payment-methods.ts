export type PaymentMethodId = "visa" | "mastercard";

export type PaymentMethod = {
  id: PaymentMethodId;
  label: string;
  logo: string;
  hint: string;
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "visa",
    label: "Visa",
    logo: "/payments/visa.png",
    hint: "Enter your Visa card details below.",
  },
  {
    id: "mastercard",
    label: "Mastercard",
    logo: "/payments/mastercard.png",
    hint: "Enter your Mastercard details below.",
  },
];

export function getPaymentMethod(id: PaymentMethodId) {
  return PAYMENT_METHODS.find((method) => method.id === id) ?? PAYMENT_METHODS[0];
}
