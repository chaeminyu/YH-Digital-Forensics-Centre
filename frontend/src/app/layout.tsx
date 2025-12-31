import { Inter } from 'next/font/google'
import './globals.css'
import { Layout } from '@/components/layout'
import { VisitTracker } from '@/components/VisitTracker'
import ConditionalFAB from '@/components/ConditionalFAB'
import { generateDynamicMetadata } from '@/lib/metadata'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
  return await generateDynamicMetadata()
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