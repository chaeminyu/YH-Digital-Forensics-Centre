'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container, Button } from '@/components/ui'

interface DropdownItem {
  label: string
  href: string
  description?: string
}

const digitalForensicItems: DropdownItem[] = [
  {
    label: 'General Forensics',
    href: '/digital-forensic/general-forensics',
    description: 'General digital forensic investigations'
  },
  {
    label: 'Evidence Forensics',
    href: '/digital-forensic/evidence-forensics',
    description: 'Digital evidence analysis and preservation'
  },
  {
    label: 'Digital Crime',
    href: '/digital-forensic/digital-crime',
    description: 'Digital crime investigation and analysis'
  }
]

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { 
    label: 'Digital Forensic', 
    href: '/digital-forensic',
    dropdown: digitalForensicItems
  },
  { label: 'Press', href: '/press' },
  { label: 'Training', href: '/training' },
  { label: 'Contact', href: '/contact' }
]

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    // Set initial state based on current scroll position
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
    
    // Check scroll position on route change to ensure header visibility
    const checkScrollState = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    // Small delay to ensure page has loaded
    setTimeout(checkScrollState, 100)
  }, [pathname])

  // Close mobile menu on scroll
  useEffect(() => {
    if (!isMobileMenuOpen) return
    
    const handleScroll = () => {
      setIsMobileMenuOpen(false)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  const isActivePage = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || pathname !== '/'
          ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50' 
          : 'bg-transparent',
        isMobileMenuOpen ? 'shadow-none' : ''
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="YH Digital Forensic Center Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
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
            <span className="text-xl font-bold text-slate-100 group-hover:text-accent-400 transition-colors">
              YH Digital Forensic Center
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActivePage(item.href)
                      ? 'text-accent-400'
                      : 'text-slate-300 hover:text-accent-400'
                  )}
                >
                  <span>{item.label}</span>
                  {item.dropdown && (
                    <ChevronDown className="w-4 h-4 transition-transform" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-80 bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-lg shadow-xl overflow-hidden"
                    >
                      <div className="p-2">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="flex flex-col p-3 rounded-lg hover:bg-slate-700/50 transition-colors"
                          >
                            <span className="text-slate-100 font-medium">
                              {dropdownItem.label}
                            </span>
                            {dropdownItem.description && (
                              <span className="text-sm text-slate-400 mt-1">
                                {dropdownItem.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                      <div className="px-2 pb-2">
                        <Link
                          href="/digital-forensic"
                          className="block w-full p-3 text-center text-sm font-medium text-accent-400 hover:bg-slate-700/50 rounded-lg transition-colors"
                        >
                          View All Services →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Button & Language Toggle */}
          <div className="hidden lg:flex items-center space-x-4 ml-8">
            <Button href="/contact" size="sm">
              Request Consultation
            </Button>
            
            {/* Language Toggle */}
            <div className="flex items-center bg-slate-800/50 rounded-lg border border-slate-600/50 overflow-hidden">
              <button className="w-10 h-8 text-sm font-medium bg-accent-400 text-slate-900 transition-colors flex items-center justify-center">
                EN
              </button>
              <button 
                onClick={() => window.open('https://blog.naver.com/yhdfc', '_blank')}
                className="w-12 h-8 text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-700/50 transition-colors flex items-center justify-center"
              >
                한글
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </Container>

      {/* Mobile Menu - Below Header */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Optional backdrop to dim background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-20 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu panel */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="fixed top-16 lg:top-20 left-0 right-0 z-30 lg:hidden bg-[#0a192f] shadow-xl border-b border-slate-700/50"
            >
              <nav className="flex flex-col items-end text-right p-6 space-y-4">
                {navigation.map((item) => (
                  <div key={item.label} className="w-full">
                    <Link
                      href={item.href}
                      className={cn(
                        'block px-4 py-3 rounded-lg text-lg font-medium transition-colors text-right',
                        isActivePage(item.href)
                          ? 'text-accent-400 bg-accent-400/10'
                          : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    
                    {/* Mobile Dropdown Items */}
                    {item.dropdown && (
                      <div className="mr-4 mt-2 space-y-1 text-right">
                        {item.dropdown.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.href}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-slate-400 hover:text-slate-300 rounded-lg transition-colors text-right"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              
              {/* Mobile Language Toggle & CTA */}
              <div className="flex flex-col items-center space-y-4 p-6 border-t border-slate-700/50">
                <div className="flex items-center bg-slate-800/50 rounded-lg border border-slate-600/50 overflow-hidden">
                  <button className="px-6 py-2 text-sm font-medium bg-accent-400 text-slate-900 transition-colors min-w-[50px] text-center">
                    EN
                  </button>
                  <button 
                    onClick={() => window.open('https://blog.naver.com/yhdfc', '_blank')}
                    className="px-6 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 hover:bg-slate-700/50 transition-colors min-w-[60px] text-center"
                  >
                    한글
                  </button>
                </div>
                
                <Button 
                  href="/contact" 
                  className="w-full max-w-xs justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Request Consultation
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header