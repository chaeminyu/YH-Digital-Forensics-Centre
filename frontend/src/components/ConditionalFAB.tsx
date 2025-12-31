'use client'

import { usePathname } from 'next/navigation'
import FloatingActionButton from './FloatingActionButton'

const ConditionalFAB: React.FC = () => {
  const pathname = usePathname()
  
  // Don't show FAB on admin pages
  if (pathname.startsWith('/admin')) {
    return null
  }
  
  return <FloatingActionButton />
}

export default ConditionalFAB