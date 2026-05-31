declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (...args: unknown[]) => void };
  }
}

export function trackLeadCapture() {
  window.gtag?.("event", "generate_lead", { method: "lead_magnet" });
  window.fbq?.("track", "Lead");
  window.ttq?.track("SubmitForm");
}

export function trackPurchaseIntent() {
  window.gtag?.("event", "begin_checkout");
  window.fbq?.("track", "InitiateCheckout");
  window.ttq?.track("InitiateCheckout");
}

export function trackPurchaseComplete(value = 48.88) {
  window.gtag?.("event", "purchase", {
    currency: "USD",
    value,
  });
  window.fbq?.("track", "Purchase", { currency: "USD", value });
  window.ttq?.track("CompletePayment", { currency: "USD", value });
}
