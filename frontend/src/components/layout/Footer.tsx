'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, Clock, MapPin } from 'lucide-react'
import { Container } from '@/components/ui'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const serviceLinks = [
    { label: 'General Forensics', href: '/digital-forensic/general-forensics' },
    { label: 'Evidence Forensics', href: '/digital-forensic/evidence-forensics' },
    { label: 'Digital Crime', href: '/digital-forensic/digital-crime' }
  ]

  const resourceLinks = [
    { label: 'Press & Media', href: '/press' },
    { label: 'Corporate Training', href: '/training' },
    { label: 'Contact Us', href: '/contact' }
  ]

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <Container>
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="YH Digital Forensic Center Logo"
                    width={32}
                    height={32}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      // Fallback if logo doesn't exist yet
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      if (target.nextElementSibling) {
                        (target.nextElementSibling as HTMLElement).style.display = 'flex'
                      }
                    }}
                  />
                  {/* Fallback logo */}
                  <div className="hidden w-full h-full bg-gradient-to-br from-accent-400 to-primary-600 rounded-lg items-center justify-center">
                    <span className="text-slate-900 font-bold text-lg">Y</span>
                  </div>
                </div>
                <span className="text-xl font-bold text-slate-100">YHDFC</span>
              </Link>
              
              <p className="text-slate-400 leading-relaxed mb-6">
                Digital Forensics & eDiscovery Experts in Korea. Trusted by legal and corporate professionals for accurate, court-admissible forensic analysis.
              </p>

              <div className="flex items-center space-x-2 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Seoul, Korea</span>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-6">Services</h3>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-accent-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-6">Resources</h3>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-accent-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/about"
                    className="text-slate-400 hover:text-accent-400 transition-colors text-sm"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-6">Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-accent-400 flex-shrink-0" />
                  <a
                    href="mailto:yh@yhforensic.com"
                    className="text-slate-400 hover:text-accent-400 transition-colors text-sm"
                  >
                    yh@yhforensic.com
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-accent-400 flex-shrink-0" />
                  <a
                    href="tel:+82-010-8402-2752"
                    className="text-slate-400 hover:text-accent-400 transition-colors text-sm"
                  >
                    +82 010-8402-2752
                  </a>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" />
                  <div className="text-slate-400 text-sm">
                    <div>Mon - Fri: 9:00 - 18:00</div>
                    <div>Sat: 9:00 - 13:00</div>
                    <div className="text-xs mt-1 text-slate-500">
                      Emergency consultations available
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-slate-400">
              © {currentYear} YH Digital Forensic Center. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-slate-400 hover:text-accent-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-slate-400 hover:text-accent-400 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer