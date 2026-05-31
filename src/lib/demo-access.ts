export function isPortalDemoAccessEnabled() {
  if (process.env.PORTAL_DEMO_ACCESS === "false") {
    return false;
  }

  if (process.env.PORTAL_DEMO_ACCESS === "true") {
    return true;
  }

  return process.env.NODE_ENV === "development";
}
