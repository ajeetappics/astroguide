/**
 * Sanitizes and validates image URLs (handles relative S3 paths, GCP storage, spaces, and broken strings)
 * so next/image never throws runtime URL construction errors.
 */
export const sanitizeImageUrl = (url: any, fallback = "/images/astro-1.jpg"): string => {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return fallback;
  }

  let clean = url.trim();

  // If it's a relative S3 or storage path like "vedic-images/...", "admin/...", "astrologers/..."
  if (!clean.startsWith('http://') && !clean.startsWith('https://') && !clean.startsWith('/')) {
    if (clean.startsWith('vedic-images/')) {
      clean = `https://atsro-vani-prod-v1.s3.ap-south-1.amazonaws.com/${clean}`;
    } else if (clean.startsWith('admin/') || clean.startsWith('astrologers/')) {
      clean = `https://storage.googleapis.com/astro-vani-storage/${clean}`;
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
