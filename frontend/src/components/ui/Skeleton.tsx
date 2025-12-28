'use client'

import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'text' | 'circle'
}

const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  variant = 'default',
  ...props 
}) => {
  const variants = {
    default: 'h-4 w-full',
    card: 'h-48 w-full rounded-lg',
    text: 'h-4 w-3/4',
    circle: 'h-12 w-12 rounded-full'
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] animate-shimmer rounded',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

// Predefined skeleton components
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-3', className)}>
    <Skeleton variant="card" />
    <Skeleton variant="text" />
    <Skeleton className="h-4 w-1/2" />
  </div>
)

export const SkeletonPost: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('space-y-4', className)}>
    <Skeleton className="h-6 w-16" />
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <div className="flex items-center space-x-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-16" />
    </div>
  </div>
)

export const SkeletonStats: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('p-6 border border-slate-700 rounded-lg space-y-3', className)}>
    <Skeleton className="h-8 w-16" />
    <Skeleton className="h-4 w-24" />
  </div>
)

export default Skeleton