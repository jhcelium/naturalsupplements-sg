import site from "../../data/site.json";

/** Site origin with no trailing slash (e.g. https://example.com). */
export function siteOrigin(): string {
  return `https://${site.domain}`;
}

/**
 * Canonical URL for the given path, no trailing slash (home = origin only).
 */
export function canonicalUrl(path?: string | null): string {
  const origin = siteOrigin();
  if (path == null || path === "" || path === "/") return origin;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized.replace(/\/+$/, "")}`;
}
