'use client'

import { Toaster } from 'react-hot-toast'
import Header from './Header'
import Footer from './Footer'
import BackToTop from './BackToTop'
import PageTransition from './PageTransition'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-950 text-slate-300">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 grid-bg opacity-30 pointer-events-none" />
      
      <Header />
      
      <main className="flex-1 pt-16 lg:pt-20">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      
      <Footer />
      <BackToTop />
      
      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#e2e8f0',
            border: '1px solid #475569',
          },
          success: {
            style: {
              border: '1px solid #64ffda',
            },
          },
          error: {
            style: {
              border: '1px solid #ef4444',
            },
          },
        }}
      />
    </div>
  )
}

export default Layout