'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface PageTransitionProps {
  children: React.ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02
  }
}

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.4
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState('in')

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage('out')
    }
  }, [children, displayChildren])

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate={transitionStage}
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      onAnimationComplete={() => {
        if (transitionStage === 'out') {
          setDisplayChildren(children)
          setTransitionStage('in')
        }
      }}
      className="min-h-screen"
    >
      {displayChildren}
    </motion.div>
  )
}

// Loading component for page transitions
export const PageLoader: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.2, opacity: 0 }}
      className="text-center"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-accent-400 border-t-transparent rounded-full mx-auto mb-4"
        />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-slate-300 font-medium"
        >
          Loading...
        </motion.div>
      </div>
    </motion.div>
  </div>
)

// Scroll reveal animation hook
export const useScrollReveal = () => {
  return {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

// Stagger children animation
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

// Enhanced button animations
export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.2 }
}

export const buttonTap = {
  scale: 0.98
}

// Card hover effects
export const cardHover = {
  y: -8,
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1)",
  transition: { duration: 0.3 }
}

// Modal animations
export const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: 100
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300
    }
  },
  exit: {
    opacity: 0,
    scale: 0.75,
    y: 100,
    transition: { duration: 0.2 }
  }
}

export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
}

export default PageTransition