import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Layout } from '@/components/layout'
import { VisitTracker } from '@/components/VisitTracker'
import ConditionalFAB from '@/components/ConditionalFAB'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yhdfc.com'),
  title: {
    template: '%s | YH Digital Forensic Center',
    default: 'YH Digital Forensic Center - Digital Forensics & Cybersecurity Experts in Korea'
  },
  description: 'Leading digital forensics experts in Korea providing computer forensics, mobile device analysis, cloud forensics, data recovery, and expert witness services for legal and corporate clients.',
  keywords: [
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
    title: 'YH Digital Forensic Center - Digital Forensics & Cybersecurity Experts in Korea',
    description: 'Leading digital forensics experts in Korea providing professional investigation services for legal and corporate clients.',
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
    title: 'YH Digital Forensic Center - Digital Forensics Experts',
    description: 'Leading digital forensics and cybersecurity experts in Korea. Professional investigation services.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <VisitTracker />
        <Layout>{children}</Layout>
        <ConditionalFAB />
      </body>
    </html>
  )
}