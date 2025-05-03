import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 5
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -5
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.2
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  useEffect(() => {
    const scrollY = window.scrollY;
    
    return () => {
      window.scrollTo(0, scrollY);
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