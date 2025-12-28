'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'service' | 'blog' | 'glass'
  hover?: boolean
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', hover = true, children, ...props }, ref) => {
    const baseStyles = 'rounded-lg overflow-hidden transition-all duration-300'
    
    const variants = {
      default: 'bg-slate-800/50 border border-slate-700 backdrop-blur-sm',
      service: 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-sm',
      blog: 'bg-slate-800/60 border border-slate-700/50 backdrop-blur-sm overflow-hidden',
      glass: 'bg-white/5 border border-white/10 backdrop-blur-md'
    }
    
    const hoverEffects = hover ? 'hover:border-accent-400/30 hover:shadow-xl hover:shadow-accent-400/10' : ''

    if (hover) {
      return (
        <div
          ref={ref}
          className={cn(baseStyles, variants[variant], hoverEffects, className)}
          {...props}
        >
          {children}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card