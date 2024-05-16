export function generateRandUnique(len: number = 7): string {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
}

export function normalizeImageUrl(url: string = ''): string {
  if (!url) return url;
  return url.startsWith('http')
    ? url
    : `${import.meta.env.VITE_SERVER_URL}${import.meta.env.VITE_SERVER_URL.endsWith('/') || url.startsWith('/') ? '' : '/'}${url}`;
}
