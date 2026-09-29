/**
 * Convertit un lien YouTube ou Vimeo (collé par Claudia dans Storyblok)
 * en URL d'intégration (iframe). Retourne null si le lien n'est pas reconnu.
 */
export function toEmbedUrl(url?: string): string | null {
  if (!url) return null;
  const u = url.trim();

  // YouTube : youtu.be/ID, youtube.com/watch?v=ID, /embed/ID, /shorts/ID
  const yt = u.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/,
  );
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;

  // Vimeo : vimeo.com/123456789
  const vm = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;

  return null;
}
