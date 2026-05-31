"use client";

import { useEffect } from "react";
import { trackLeadCapture } from "@/lib/analytics";

export function LeadCaptureTracker() {
  useEffect(() => {
    trackLeadCapture();
  }, []);

  return null;
}
