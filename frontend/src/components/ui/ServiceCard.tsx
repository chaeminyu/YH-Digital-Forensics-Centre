'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LucideIcon, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import Card from './Card'

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon: LucideIcon
  href: string
  features?: string[]
}

const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, title, description, icon: Icon, href, features, ...props }, ref) => {
    return (
      <Link href={href} className="block group">
        <Card
          ref={ref}
          variant="service"
          className={cn('p-6 h-full flex flex-col', className)}
          {...props}
        >
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent-400/20 text-accent-400 mb-4 group-hover:bg-accent-400 group-hover:text-slate-900 transition-colors duration-300">
            <Icon className="h-6 w-6" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-accent-400 transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-300 leading-relaxed mb-4 flex-grow">
            {description}
          </p>

          {/* Features */}
          {features && features.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-400 mb-2">What we analyze:</p>
              <p className="text-sm text-slate-300 italic">{features.join(', ')}</p>
            </div>
          )}

          {/* Learn More Link */}
          <div className="flex items-center text-accent-400 text-sm font-medium group-hover:text-accent-300 transition-colors">
            Learn More
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Card>
      </Link>
    )
  }
)

ServiceCard.displayName = 'ServiceCard'

export default ServiceCard