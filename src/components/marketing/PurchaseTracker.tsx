"use client";

import { useEffect } from "react";
import { trackPurchaseComplete } from "@/lib/analytics";

export function PurchaseTracker() {
  useEffect(() => {
    trackPurchaseComplete();
  }, []);

  return null;
}
