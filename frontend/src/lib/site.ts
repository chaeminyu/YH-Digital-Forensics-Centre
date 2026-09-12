/**
 * Canonical origin for the site.
 *
 * Intentionally NOT read from NEXT_PUBLIC_SITE_URL: that variable is set to the
 * non-www host in Vercel, and canonical/OG/sitemap URLs must agree with the
 * edge redirect (yhforensic.com -> www.yhforensic.com). Keeping it a constant
 * makes the two impossible to drift apart.
 */
export const SITE_URL = 'https://www.yhforensic.com'

export const SITE_NAME = 'YH Digital Forensic Center'

/** Absolute URL for a site-relative path, e.g. absoluteUrl('/about'). */
export function absoluteUrl(path = '/'): string {
  return new URL(path, SITE_URL).toString().replace(/\/$/, '') || SITE_URL
}
