import Head from 'next/head'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

const defaultSEO = {
  title: 'YH Digital Forensic Center - Professional Digital Forensics & Cybersecurity',
  description: 'Leading digital forensics experts in Korea providing computer forensics, mobile device analysis, cloud forensics, data recovery, and expert witness services for legal and corporate clients.',
  keywords: 'digital forensics, computer forensics, mobile forensics, cloud forensics, data recovery, expert witness, cybersecurity, Korea, Seoul, digital investigation',
  image: '/images/yhdfc-og.png',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://yhdfc.com',
  type: 'website' as const
}

export const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags
}) => {
  const seo = {
    title: title ? `${title} | ${process.env.NEXT_PUBLIC_SITE_NAME}` : defaultSEO.title,
    description: description || defaultSEO.description,
    keywords: keywords || defaultSEO.keywords,
    image: image || defaultSEO.image,
    url: url || defaultSEO.url,
    type
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'Organization',
    ...(type === 'website' ? {
      name: process.env.NEXT_PUBLIC_SITE_NAME,
      url: seo.url,
      logo: `${seo.url}/images/logo.png`,
      description: seo.description,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Seoul',
        addressCountry: 'KR'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+82-2-1234-5678',
        contactType: 'customer service'
      },
      sameAs: [
        'https://www.linkedin.com/company/yhdfc',
        'https://twitter.com/yhdfc'
      ]
    } : {
      headline: title,
      description: description,
      image: image,
      author: {
        '@type': 'Person',
        name: author
      },
      publisher: {
        '@type': 'Organization',
        name: process.env.NEXT_PUBLIC_SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: `${seo.url}/images/logo.png`
        }
      },
      datePublished: publishedTime,
      dateModified: modifiedTime,
      articleSection: section,
      keywords: tags?.join(', ')
    })
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <meta name="author" content={author || process.env.NEXT_PUBLIC_SITE_NAME} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:site" content="@yhdfc" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Geo Tags for Korean Location */}
      <meta name="geo.region" content="KR-11" />
      <meta name="geo.placename" content="Seoul" />
      <meta name="geo.position" content="37.5665;126.9780" />
      <meta name="ICBM" content="37.5665, 126.9780" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Favicon and Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Preconnect to External Domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    </Head>
  )
}

export default SEOHead