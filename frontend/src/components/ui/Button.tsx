'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  href?: string
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, href, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-accent-400 hover:bg-accent-500 text-slate-900 focus:ring-accent-400 shadow-lg hover:shadow-accent-400/25',
      secondary: 'bg-transparent border-2 border-accent-400 hover:bg-accent-400 text-accent-400 hover:text-slate-900 focus:ring-accent-400',
      outline: 'bg-transparent border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-slate-100 hover:bg-slate-800 focus:ring-slate-500',
      ghost: 'bg-transparent hover:bg-slate-800 text-slate-300 hover:text-slate-100 focus:ring-slate-500',
      destructive: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-red-600/25'
    }
    
    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    const isDisabled = disabled || isLoading
    const content = isLoading ? (
      <div className="flex items-center">
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        Loading...
      </div>
    ) : (
      children
    )

    if (href) {
      return (
        <Link href={href} className={cn(baseStyles, variants[variant], sizes[size], className)}>
          <motion.span
            className="block"
            whileHover={!isDisabled ? { scale: 1.02 } : undefined}
            whileTap={!isDisabled ? { scale: 0.98 } : undefined}
          >
            {content}
          </motion.span>
        </Link>
      )
    }

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        {...props}
      >
        {content}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button