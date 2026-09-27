/**
 * Turns a slides link saved by the admin into a URL that can be shown inside
 * the app in an iframe, or null when the link can't be embedded.
 */
export function slideEmbedUrl(url: string | undefined): string | null {
  if (!url) return null;
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const id = parsed.pathname.match(/\/d\/([^/]+)/)?.[1];
  if (!id) return null;
  if (parsed.hostname === "drive.google.com") {
    return `https://drive.google.com/file/d/${id}/preview`;
  }
  if (parsed.hostname === "docs.google.com" && parsed.pathname.startsWith("/presentation/")) {
    return `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false&rm=minimal`;
  }
  return null;
}
