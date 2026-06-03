export type PaymentMethodId =
  | "apple-pay"
  | "google-pay"
  | "cash-app"
  | "paypal"
  | "shop-pay"
  | "visa"
  | "mastercard"
  | "amex"
  | "discover";

export type PaymentMethodKind = "card" | "wallet" | "redirect";

export type PaymentMethod = {
  id: PaymentMethodId;
  label: string;
  logo: string;
  hint: string;
  kind: PaymentMethodKind;
  logoClassName?: string;
  stripePaymentMethodOrder?: string[];
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "apple-pay",
    label: "Apple Pay",
    logo: "/images/apple-pay.png",
    hint: "Use the Apple Pay button below to complete checkout.",
    kind: "wallet",
    logoClassName: "bg-neutral-900",
    stripePaymentMethodOrder: ["apple_pay", "card"],
  },
  {
    id: "google-pay",
    label: "Google Pay",
    logo: "/images/google-pay.png",
    hint: "Use the Google Pay button below to complete checkout.",
    kind: "wallet",
    stripePaymentMethodOrder: ["google_pay", "card"],
  },
  {
    id: "cash-app",
    label: "Cash App Pay",
    logo: "/images/cash-app.png",
    hint: "You will be redirected to Cash App to approve payment.",
    kind: "redirect",
    stripePaymentMethodOrder: ["cashapp", "card"],
  },
  {
    id: "paypal",
    label: "PayPal",
    logo: "/images/paypal.png",
    hint: "You will be redirected to PayPal to complete payment.",
    kind: "redirect",
    stripePaymentMethodOrder: ["paypal", "card"],
  },
  {
    id: "shop-pay",
    label: "Shop Pay",
    logo: "/images/shop-pay.png",
    hint: "You will be redirected to Shop Pay to complete payment.",
    kind: "redirect",
    stripePaymentMethodOrder: ["card"],
  },
  {
    id: "visa",
    label: "Visa",
    logo: "/images/visa.png",
    hint: "Enter your Visa card details below.",
    kind: "card",
    stripePaymentMethodOrder: ["card"],
  },
  {
    id: "mastercard",
    label: "Mastercard",
    logo: "/images/mastercard.png",
    hint: "Enter your Mastercard details below.",
    kind: "card",
    stripePaymentMethodOrder: ["card"],
  },
  {
    id: "amex",
    label: "American Express",
    logo: "/images/amex.png",
    hint: "Enter your American Express card details below.",
    kind: "card",
    stripePaymentMethodOrder: ["card"],
  },
  {
    id: "discover",
    label: "Discover",
    logo: "/images/discover.png",
    hint: "Enter your Discover card details below.",
    kind: "card",
    stripePaymentMethodOrder: ["card"],
  },
];

const CARD_METHODS = new Set<PaymentMethodId>([
  "visa",
  "mastercard",
  "amex",
  "discover",
]);

const WALLET_METHODS = new Set<PaymentMethodId>(["apple-pay", "google-pay"]);

const REDIRECT_METHODS = new Set<PaymentMethodId>([
  "cash-app",
  "paypal",
  "shop-pay",
]);

export function getPaymentMethod(id: PaymentMethodId) {
  return PAYMENT_METHODS.find((method) => method.id === id) ?? PAYMENT_METHODS[0];
}

export function isCardMethod(id: PaymentMethodId) {
  return CARD_METHODS.has(id);
}

export function isWalletMethod(id: PaymentMethodId) {
  return WALLET_METHODS.has(id);
}

export function isRedirectMethod(id: PaymentMethodId) {
  return REDIRECT_METHODS.has(id);
}

export function getPayButtonLabel(id: PaymentMethodId, processing: boolean) {
  const method = getPaymentMethod(id);

  if (processing) {
    return "Processing...";
  }

  if (method.kind === "redirect") {
    return `Continue to ${method.label}`;
  }

  return `Pay with ${method.label}`;
}

export function getPaymentElementOptions(id: PaymentMethodId) {
  const method = getPaymentMethod(id);

  return {
    layout: "tabs" as const,
    paymentMethodOrder: method.stripePaymentMethodOrder,
    wallets: {
      applePay:
        id === "apple-pay" ? ("auto" as const) : ("never" as const),
      googlePay:
        id === "google-pay" ? ("auto" as const) : ("never" as const),
    },
  };
}
