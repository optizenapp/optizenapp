export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateReadingTime(html: string): number {
  // Remove HTML tags and count words
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  // Average reading speed: 200 words per minute
  const minutes = Math.ceil(words / 200);
  return minutes;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + '...';
}

