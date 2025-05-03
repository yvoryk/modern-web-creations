import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

// Simplified variants with minimal movement to reduce flashing
const pageVariants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  exit: {
    opacity: 0
  }
};

// Extremely fast transition to minimize flashing
const pageTransition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.15
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  // Fix for scroll position issues during transitions
  useEffect(() => {
    // Save scroll position before unmount
    const scrollY = window.scrollY;
    
    // Apply saved scroll position after component is removed
    return () => {
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 0);
    };
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 