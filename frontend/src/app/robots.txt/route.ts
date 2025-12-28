import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yhdfc.com'

  const robots = `User-agent: *
Allow: /

# Disallow admin areas
Disallow: /admin/
Disallow: /api/

# Disallow private files
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /blog
Allow: /digital-forensic
Allow: /press
Allow: /training
Allow: /contact
Allow: /about

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
    }
  })
}