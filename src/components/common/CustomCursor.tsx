import React, { useState, useEffect, useRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
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
  will-change: transform;
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
  will-change: transform;
`;

const CustomCursor: React.FC<CursorProps> = ({ 
  color = '#ffffff', 
  size = 8,
  enableOnMobile = false
}) => {
  // Use refs to minimize renders
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Optimize spring physics for better performance
  const springConfig = { damping: 25, stiffness: 300, mass: 0.8 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);
  
  // Direct mapping for dot (no spring physics) for better performance
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
  
  // Memoize the touch device detection to run only once on mount
  useEffect(() => {
    // Very thorough touch device detection
    const detectTouchDevice = () => {
      // Quick desktop detection for early return
      if (window.innerWidth > 1024 && !('ontouchstart' in window)) {
      setIsTouchDevice(false);
        document.body.classList.add('custom-cursor');
        document.documentElement.style.setProperty('--cursor-visibility', 'none');
        return;
      }
      
      // Only do complex detection if needed
      const touchCapable = 'ontouchstart' in window || 
                           navigator.maxTouchPoints > 0 || 
                           (navigator as any).msMaxTouchPoints > 0;
      
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
      const mobileUserAgent = mobileRegex.test(navigator.userAgent);
      
      // Additional checks for small screen size and touch orientation
      const smallScreen = window.innerWidth <= 768;
      const mqlTouch = window.matchMedia('(hover: none), (pointer: coarse)');
      
      // If any of these are true, consider it a touch device
      const isTouch = touchCapable || mobileUserAgent || smallScreen || mqlTouch.matches;
      
      setIsTouchDevice(isTouch);
      
      // Apply mobile styles immediately to prevent flashes
      if (isTouch && !enableOnMobile) {
        document.body.classList.remove('custom-cursor');
        document.documentElement.style.setProperty('--cursor-visibility', 'auto');
      } else {
        document.body.classList.add('custom-cursor');
        document.documentElement.style.setProperty('--cursor-visibility', 'none');
      }
    };
    
    // Run detection immediately
    detectTouchDevice();
    
    // Only re-check on significant layout changes
    const resizeObserver = new ResizeObserver(detectTouchDevice);
    resizeObserver.observe(document.body);
    
    // Create style element for cursor fixes
    const mobileCursorStyle = document.createElement('style');
    if (isTouchDevice && !enableOnMobile) {
      // Ensure normal cursor behavior on mobile
      mobileCursorStyle.innerHTML = `
        * {
          cursor: auto !important;
        }
        a, button, input[type="submit"], input[type="button"], 
        select, [role="button"], .clickable {
          cursor: pointer !important;
        }
      `;
      document.head.appendChild(mobileCursorStyle);
    }
    
    return () => {
      resizeObserver.disconnect();
      
      if (mobileCursorStyle && document.head.contains(mobileCursorStyle)) {
        document.head.removeChild(mobileCursorStyle);
      }
    };
  }, [enableOnMobile, isTouchDevice]);
  
  // Only set up mouse events on non-touch devices with optimized event handling
  useEffect(() => {
    if (isTouchDevice && !enableOnMobile) return;
    
    // Throttle mouse movement updates
    let animationFrameId: number | null = null;
    let lastX = 0;
    let lastY = 0;
    
    const mouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(() => {
          mouseX.set(lastX);
          mouseY.set(lastY);
          animationFrameId = null;
        });
      }
    };
    
    // Debounce hover state changes with a timeout
    let hoverTimeout: NodeJS.Timeout | null = null;
    
    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      
      // Check for hoverable elements
      const isHoverable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.classList.contains('hoverable') ||
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.hoverable');
      
      hoverTimeout = setTimeout(() => {
        setCursorVariant(isHoverable ? 'hover' : 'default');
      }, 20);
    };
    
    // Set up listeners for cursor movement
    window.addEventListener('mousemove', mouseMove, { passive: true });
    window.addEventListener('mouseover', mouseOver, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', mouseOver);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
    };
  }, [mouseX, mouseY, isTouchDevice, enableOnMobile]);
  
  // Return null if it's a touch device and not enabled on mobile
  if (isTouchDevice && !enableOnMobile) {
    return null;
  }
  
  // Simplified variants with less complex transitions
  const dotVariants = {
    default: {
      width: size,
      height: size,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
        mass: 0.6
      }
    },
    hover: {
      width: size * 4,
      height: size * 4,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
        mass: 0.6
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
        stiffness: 300,
        mass: 0.6
      }
    },
    hover: {
      width: size * 4,
      height: size * 4,
      opacity: 0.4,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 300,
        mass: 0.6
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