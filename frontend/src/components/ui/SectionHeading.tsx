'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  description?: string
  align?: 'left' | 'center'
  showAccentLine?: boolean
  level?: 1 | 2 | 3
}

const SectionHeading = forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ 
    className, 
    title, 
    subtitle, 
    description, 
    align = 'center', 
    showAccentLine = true, 
    level = 2,
    ...props 
  }, ref) => {
    const alignments = {
      left: 'text-left',
      center: 'text-center'
    }

    const headingLevels = {
      1: 'text-4xl md:text-5xl font-bold',
      2: 'text-3xl md:text-4xl font-bold',
      3: 'text-xl md:text-2xl font-semibold'
    }

    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements

    return (
      <motion.div
        ref={ref}
        className={cn('space-y-4 mb-12', alignments[align], className)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        {...props}
      >
        {subtitle && (
          <div className="inline-flex items-center gap-2">
            {showAccentLine && align === 'left' && (
              <div className="w-8 h-0.5 bg-accent-400" />
            )}
            <span className="text-sm font-medium text-accent-400 uppercase tracking-wider">
              {subtitle}
            </span>
            {showAccentLine && align === 'center' && (
              <div className="w-8 h-0.5 bg-accent-400" />
            )}
          </div>
        )}
        
        <HeadingTag className={cn(
          headingLevels[level],
          'text-slate-100 tracking-tight leading-tight'
        )}>
          {title}
        </HeadingTag>

        {showAccentLine && align === 'center' && !subtitle && (
          <div className="flex justify-center">
            <div className="w-16 h-0.5 bg-accent-400" />
          </div>
        )}

        {description && (
          <p className={cn(
            'text-lg text-slate-300 leading-relaxed',
            align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'
          )}>
            {description}
          </p>
        )}
      </motion.div>
    )
  }
)

SectionHeading.displayName = 'SectionHeading'

export default SectionHeading