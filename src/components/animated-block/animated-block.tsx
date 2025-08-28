import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

interface IProps {
  children: ReactNode
  keyValue: string | number
  className?: string
}

export const AnimatedBlock: React.FC<IProps> = (props) => {
  const { children, keyValue, className } = props

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={keyValue}
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 180,
            damping: 28,
            mass: 0.9,
          },
        }}
        exit={{
          opacity: 0,
          y: -8,
          transition: { duration: 0, ease: 'easeInOut' },
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
