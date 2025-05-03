import React, { useState, useEffect, useRef, useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CursorProps {
  color?: string;
  size?: number;
  enableOnMobile?: boolean;
}

const CursorWrapper = styled.div<{ isMobile: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;
  display: ${({ isMobile }) => isMobile ? 'none' : 'block'};
  will-change: transform;
`;

const CursorDot = styled(motion.div)<{ color: string; size: number }>`
  position: fixed;
  top: -${({ size }) => size / 2}px;
  left: -${({ size }) => size / 2}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 9999;
  will-change: transform, width, height;
`;

const CursorRing = styled(motion.div)<{ color: string; size: number }>`
  position: fixed;
  top: -${({ size }) => size / 2}px;
  left: -${({ size }) => size / 2}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: 1.5px solid ${({ color }) => color};
  border-radius: 50%;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 9998;
  will-change: transform, width, height;
`;

const MobileStyleFix = styled.style``;

const CustomCursor: React.FC<CursorProps> = ({ 
  color = '#ffffff', 
  size = 8,
  enableOnMobile = false
}) => {
  // State for cursor positions
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // For smoother animation on the cursor ring
  const springConfig = { damping: 25, stiffness: 300 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);
  
  // Use dotX and dotY directly from mouseX and mouseY for responsive cursor dot
  const dotX = mouseX;
  const dotY = mouseY;
  
  // State for hover effects
  const [cursorVariant, setCursorVariant] = useState('default');
  
  // Detect touch device - default to true to prevent flash of cursor on mobile
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  
  // Reference for the cursor elements
  const cursorRef = useRef<HTMLDivElement>(null);
  
  // Theme context for dynamic theming
  const theme = useContext(ThemeContext) || { primary: '#0095ff' };
  
  useEffect(() => {
    // More robust touch device detection
    const detectTouchDevice = () => {
      // Check for touch capability
      const isTouchCapable = 'ontouchstart' in window || 
                            navigator.maxTouchPoints > 0 || 
                            (navigator as any).msMaxTouchPoints > 0;
      
      // Check for mobile user agent
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
      
      setIsTouchDevice(isTouchCapable || isMobileUserAgent || window.innerWidth <= 768);
    };
    
    // Call detection function
    detectTouchDevice();
    
    // Also check on resize to handle orientation changes
    window.addEventListener('resize', detectTouchDevice);
    
    // Add stylesheet to fix mobile cursor
    const mobileCursorStyle = document.createElement('style');
    if (isTouchDevice && !enableOnMobile) {
      mobileCursorStyle.innerHTML = `
        * {
          cursor: auto !important;
        }
      `;
      document.head.appendChild(mobileCursorStyle);
    }
    
    return () => {
      window.removeEventListener('resize', detectTouchDevice);
      if (mobileCursorStyle && document.head.contains(mobileCursorStyle)) {
        document.head.removeChild(mobileCursorStyle);
      }
    };
  }, [enableOnMobile]);
  
  // Only setup mouse events on non-touch devices
  useEffect(() => {
    if (isTouchDevice && !enableOnMobile) return;
    
    const mouseMove = (e: MouseEvent) => {
      // Update cursor position using motion values
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    // Function to handle mouseover events on hoverable elements
    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check for hoverable elements
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.classList.contains('hoverable') ||
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.hoverable')
      ) {
        setCursorVariant('hover');
      } else {
        setCursorVariant('default');
      }
    };
    
    // Set up listeners for cursor movement
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', mouseOver);
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', mouseOver);
    };
  }, [mouseX, mouseY, isTouchDevice, enableOnMobile]);
  
  // Return null if it's a touch device and not enabled on mobile
  if (isTouchDevice && !enableOnMobile) {
    return null;
  }
  
  // Define variants for cursor animations
  const dotVariants = {
    default: {
      width: size,
      height: size,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300
      }
    },
    hover: {
      width: size * 5,
      height: size * 5,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
        ease: [0.23, 1, 0.32, 1]
      }
    }
  };
  
  const ringVariants = {
    default: {
      width: size * 3,
      height: size * 3,
      opacity: 0.6,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300
      }
    },
    hover: {
      width: size * 5,
      height: size * 5,
      opacity: 0.4,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300
      }
    }
  };
  
  return (
    <CursorWrapper ref={cursorRef} isMobile={isTouchDevice && !enableOnMobile}>
      <CursorDot
        color={color || theme.primary}
        size={size}
        style={{ x: dotX, y: dotY }}
        variants={dotVariants}
        animate={cursorVariant}
      />
      <CursorRing
        color={color || theme.primary}
        size={size * 3}
        style={{ x: ringX, y: ringY }}
        variants={ringVariants}
        animate={cursorVariant}
      />
    </CursorWrapper>
  );
};

export default CustomCursor; 