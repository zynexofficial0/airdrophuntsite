export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function ensureUniqueSlug(base: string): string {
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}
