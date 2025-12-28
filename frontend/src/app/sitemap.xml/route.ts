import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yhdfc.com'
  const currentDate = new Date().toISOString()

  const staticPages = [
    {
      url: '',
      changefreq: 'daily',
      priority: '1.0',
      lastmod: currentDate
    },
    {
      url: '/about',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: currentDate
    },
    {
      url: '/digital-forensic',
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: currentDate
    },
    {
      url: '/digital-forensic/computer-forensics',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: currentDate
    },
    {
      url: '/digital-forensic/mobile-forensics',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: currentDate
    },
    {
      url: '/digital-forensic/cloud-forensics',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: currentDate
    },
    {
      url: '/digital-forensic/data-recovery',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: currentDate
    },
    {
      url: '/digital-forensic/expert-witness',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: currentDate
    },
    {
      url: '/press',
      changefreq: 'weekly',
      priority: '0.7',
      lastmod: currentDate
    },
    {
      url: '/training',
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: currentDate
    },
    {
      url: '/blog',
      changefreq: 'daily',
      priority: '0.8',
      lastmod: currentDate
    },
    {
      url: '/contact',
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: currentDate
    }
  ]

  // In a real application, you would fetch dynamic pages from your API
  const dynamicPages = [
    // Example blog posts - these would be fetched from your API
    {
      url: '/blog/advanced-mobile-forensics-ios-17',
      changefreq: 'monthly',
      priority: '0.6',
      lastmod: '2024-11-20T09:00:00.000Z'
    }
  ]

  const allPages = [...staticPages, ...dynamicPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate'
    }
  })
}