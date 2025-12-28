'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)} aria-label="Breadcrumb">
      {/* Home */}
      <Link
        href="/"
        className="flex items-center text-slate-400 hover:text-accent-400 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-slate-500" />
          
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="text-slate-400 hover:text-accent-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-slate-300 font-medium">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumb