'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MessageSquare, X, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface ActionButton {
  icon: React.ElementType
  label: string
  action: () => void
  bgColor: string
  iconColor: string
}

const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false)
  const fabRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const actionButtons: ActionButton[] = [
    {
      icon: Phone,
      label: 'Call Us',
      action: () => window.open('tel:+82-10-8402-2752', '_self'),
      bgColor: 'bg-white dark:bg-slate-800',
      iconColor: 'text-navy-900 dark:text-accent-400'
    },
    {
      icon: Mail,
      label: 'Email Us',
      action: () => window.open('mailto:yh@yhforensic.com', '_self'),
      bgColor: 'bg-white dark:bg-slate-800',
      iconColor: 'text-navy-900 dark:text-accent-400'
    },
    {
      icon: MessageSquare,
      label: 'Send Inquiry',
      action: () => router.push('/contact'),
      bgColor: 'bg-white dark:bg-slate-800',
      iconColor: 'text-navy-900 dark:text-accent-400'
    }
  ]

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpanded])

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      {/* Background overlay when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>

      <div 
        ref={fabRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end"
        style={{ bottom: '24px', right: '24px' }}
      >
      {/* Action Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <div className="flex flex-col-reverse items-end space-y-reverse space-y-4">
            {actionButtons.map((button, index) => (
              <motion.div
                key={button.label}
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0, x: 20 }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                className="flex items-center group"
              >
                {/* Tooltip Label */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{
                    duration: 0.2,
                    delay: (index * 0.05) + 0.1
                  }}
                  className="mr-3 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-slate-600"
                >
                  {button.label}
                  {/* Arrow pointing to button */}
                  <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2">
                    <div className="w-2 h-2 bg-slate-800 rotate-45 border-r border-b border-slate-600"></div>
                  </div>
                </motion.div>
                
                {/* Action Button */}
                <motion.button
                  onClick={button.action}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    w-14 h-14 rounded-full ${button.bgColor} 
                    shadow-lg hover:shadow-xl
                    flex items-center justify-center
                    transition-all duration-200
                    border border-slate-200 dark:border-slate-700
                  `}
                >
                  <button.icon className={`w-5 h-5 ${button.iconColor}`} />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={toggleExpanded}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          ${isExpanded ? 'w-14 h-14 mb-6' : 'w-20 h-20'}
          rounded-full 
          shadow-xl hover:shadow-2xl
          flex items-center justify-center
          transition-all duration-300
          relative
          ${isExpanded 
            ? 'bg-slate-600 hover:bg-slate-500' 
            : 'bg-slate-700 hover:bg-slate-600'
          }
        `}
      >
        
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <X className="w-5 h-5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
              className="relative z-10"
            >
              <MessageCircle className="w-8 h-8 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
    </>
  )
}

export default FloatingActionButton