/**
 * Sanitizes and validates image URLs (handles relative S3 paths, GCP storage, spaces, and broken strings)
 * so next/image never throws runtime URL construction errors.
 */
export const sanitizeImageUrl = (url: any, fallback = ""): string => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return fallback;
  }

  let clean = url.trim();

  // Strip markdown link format [label](url) or [url]
  const mdMatch = clean.match(/\[.*?\]\((.*?)\)/);
  if (mdMatch && mdMatch[1]) {
    clean = mdMatch[1].trim();
  } else if (clean.startsWith('[') && clean.endsWith(']')) {
    clean = clean.slice(1, -1).trim();
  }

  // If it's a relative S3 or storage path
  if (!clean.startsWith('http://') && !clean.startsWith('https://') && !clean.startsWith('/')) {
    if (clean.startsWith('vedic-images/')) {
      clean = `https://atsro-vani-prod-v1.s3.ap-south-1.amazonaws.com/${clean}`;
    } else if (
      clean.startsWith('admin/') ||
      clean.startsWith('astrologers/') ||
      clean.startsWith('uploads/') ||
      clean.startsWith('user/')
    ) {
      clean = `https://storage.googleapis.com/astro-vani-storage/${clean}`;
    } else if (/\.(jpg|jpeg|png|webp|svg|gif)$/i.test(clean)) {
      clean = `https://storage.googleapis.com/astro-vani-storage/admin/${clean}`;
    } else {
      return fallback;
    }
  }

  // Validate absolute URLs and encode spaces
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    try {
      new URL(clean);
      return clean;
    } catch {
      try {
        const encoded = encodeURI(clean);
        new URL(encoded);
        return encoded;
      } catch {
        return fallback;
      }
    }
  }

  // Relative path starting with '/'
  if (clean.startsWith('/')) {
    return clean;
  }

  return fallback;
};
