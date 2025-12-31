import type { Metadata } from 'next'

// Function to fetch site settings
export async function fetchSiteSettings() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/site-settings/`, {
      cache: 'no-store' // Always fetch fresh data
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch site settings')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching site settings:', error)
    // Return default values if API fails
    return {
      default_meta_title: 'YH Digital Forensic Center - Digital Forensics & Cybersecurity Experts in Korea',
      default_meta_description: 'Professional digital forensics services including mobile forensics, computer forensics, and cyber investigation training.',
      default_keywords: 'digital forensics, mobile forensics, computer forensics, cyber investigation, data recovery'
    }
  }
}

// Generate dynamic metadata
export async function generateDynamicMetadata(): Promise<Metadata> {
  const settings = await fetchSiteSettings()
  
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yhdfc.com'),
    title: {
      template: '%s | YH Digital Forensic Center',
      default: settings.default_meta_title || 'YH Digital Forensic Center - Digital Forensics & Cybersecurity Experts in Korea'
    },
    description: settings.default_meta_description || 'Professional digital forensics services including mobile forensics, computer forensics, and cyber investigation training.',
    keywords: [
      ...(settings.default_keywords?.split(',').map((k: string) => k.trim()) || []),
      'digital forensics',
      'computer forensics', 
      'mobile forensics',
      'cloud forensics',
      'data recovery',
      'expert witness',
      'cybersecurity',
      'Korea',
      'Seoul',
      'digital investigation',
      'eDiscovery',
      'corporate investigation',
      'legal forensics',
      'incident response'
    ],
    authors: [{ name: 'YH Digital Forensic Center', url: process.env.NEXT_PUBLIC_SITE_URL }],
    creator: 'YH Digital Forensic Center',
    publisher: 'YH Digital Forensic Center',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: process.env.NEXT_PUBLIC_SITE_URL,
      title: settings.default_meta_title || 'YH Digital Forensic Center - Digital Forensics & Cybersecurity Experts in Korea',
      description: settings.default_meta_description || 'Leading digital forensics experts in Korea providing professional investigation services for legal and corporate clients.',
      siteName: 'YH Digital Forensic Center',
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'YH Digital Forensic Center - Digital Forensics Experts',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.default_meta_title || 'YH Digital Forensic Center - Digital Forensics Experts',
      description: settings.default_meta_description || 'Leading digital forensics and cybersecurity experts in Korea. Professional investigation services.',
      images: ['/images/og-image.jpg'],
      creator: '@yhdfc',
      site: '@yhdfc',
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_SITE_URL,
    },
    icons: {
      icon: '/images/logo.png',
      shortcut: '/images/logo.png',
      apple: '/images/logo.png',
    },
    category: 'technology',
    classification: 'Digital Forensics Services',
    referrer: 'origin-when-cross-origin',
  }
}