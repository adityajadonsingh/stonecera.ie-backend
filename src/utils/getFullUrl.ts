export function getFullUrl(url?: string | null): string | null {
  if (!url) return null;

  if (url.startsWith("http")) return url;

  const base = process.env.MEDIA_URL || "";
  return `${base}${url}`;
}
