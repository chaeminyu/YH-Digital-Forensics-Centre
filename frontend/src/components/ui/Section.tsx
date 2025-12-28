'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import Container from './Container'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'dark' | 'accent'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', padding = 'lg', containerSize = 'lg', children, ...props }, ref) => {
    const variants = {
      default: 'bg-transparent',
      dark: 'bg-slate-900/50',
      accent: 'bg-gradient-to-br from-accent-400/5 to-primary-600/5'
    }
    
    const paddings = {
      sm: 'py-12',
      md: 'py-16',
      lg: 'py-20',
      xl: 'py-24'
    }

    return (
      <section
        ref={ref}
        className={cn(variants[variant], paddings[padding], className)}
        {...props}
      >
        <Container size={containerSize}>
          {children}
        </Container>
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section