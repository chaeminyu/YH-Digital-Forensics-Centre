'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium'
    
    const variants = {
      default: 'bg-slate-700 text-slate-200',
      accent: 'bg-accent-400/20 text-accent-400 border border-accent-400/30',
      secondary: 'bg-slate-600 text-slate-100',
      success: 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/30',
      warning: 'bg-amber-500/20 text-amber-400 border border-amber-400/30',
      error: 'bg-red-500/20 text-red-400 border border-red-400/30'
    }
    
    const sizes = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base'
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge