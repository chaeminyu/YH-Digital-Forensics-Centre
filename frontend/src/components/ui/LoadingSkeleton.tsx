import React from 'react'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'card' | 'avatar' | 'button' | 'image'
  lines?: number
  width?: string
  height?: string
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className = '',
  variant = 'text',
  lines = 1,
  width,
  height
}) => {
  const baseClasses = 'animate-pulse bg-slate-700 rounded'
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'text':
        return 'h-4'
      case 'card':
        return 'h-32'
      case 'avatar':
        return 'h-12 w-12 rounded-full'
      case 'button':
        return 'h-10 w-24 rounded-lg'
      case 'image':
        return 'h-48 w-full'
      default:
        return 'h-4'
    }
  }

  const style = {
    width: width || (variant === 'avatar' ? '3rem' : '100%'),
    height: height || undefined
  }

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${getVariantClasses()}`}
            style={{
              ...style,
              width: index === lines - 1 ? '75%' : '100%'
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`${baseClasses} ${getVariantClasses()} ${className}`}
      style={style}
    />
  )
}

// Specific skeleton components for common use cases
export const PostCardSkeleton: React.FC = () => (
  <div className="p-6 border border-slate-700 rounded-lg bg-slate-800">
    <div className="flex items-start space-x-4 mb-4">
      <LoadingSkeleton variant="avatar" />
      <div className="flex-1">
        <LoadingSkeleton className="mb-2" width="24" />
        <LoadingSkeleton width="32" />
      </div>
    </div>
    <LoadingSkeleton variant="text" lines={3} className="mb-4" />
    <div className="flex items-center space-x-4">
      <LoadingSkeleton width="16" />
      <LoadingSkeleton width="20" />
      <LoadingSkeleton width="18" />
    </div>
  </div>
)

export const InquiryCardSkeleton: React.FC = () => (
  <div className="p-4 border border-slate-700 rounded-lg bg-slate-800">
    <div className="flex items-center space-x-2 mb-3">
      <LoadingSkeleton width="16" height="6" />
      <LoadingSkeleton width="20" height="6" />
    </div>
    <LoadingSkeleton className="mb-2" width="80%" />
    <LoadingSkeleton className="mb-2" width="60%" />
    <LoadingSkeleton variant="text" lines={2} className="mb-3" />
    <div className="flex items-center space-x-3">
      <LoadingSkeleton width="24" height="4" />
      <LoadingSkeleton width="20" height="4" />
    </div>
  </div>
)

export const StatCardSkeleton: React.FC = () => (
  <div className="p-6 border border-slate-700 rounded-lg bg-slate-800">
    <div className="flex items-center justify-between mb-4">
      <div className="flex-1">
        <LoadingSkeleton width="32" className="mb-2" />
        <LoadingSkeleton width="16" height="8" />
      </div>
      <LoadingSkeleton variant="avatar" />
    </div>
    <div className="flex items-center space-x-2">
      <LoadingSkeleton width="12" height="4" />
      <LoadingSkeleton width="24" height="4" />
    </div>
  </div>
)

export const TableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
  rows = 5,
  columns = 4
}) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex items-center space-x-4 p-4 border border-slate-700 rounded-lg bg-slate-800">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <div key={colIndex} className="flex-1">
            <LoadingSkeleton width={colIndex === 0 ? '60%' : colIndex === columns - 1 ? '40%' : '80%'} />
          </div>
        ))}
      </div>
    ))}
  </div>
)

export default LoadingSkeleton