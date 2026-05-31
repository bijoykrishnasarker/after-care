export function isDevPortalPreview() {
  return (
    process.env.NODE_ENV === "development" &&
    process.env.DEV_PORTAL_PREVIEW === "true"
  );
}

export const demoPortalEmail = "demo@aftercare.dev";
