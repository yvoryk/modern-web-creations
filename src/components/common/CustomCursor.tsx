import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Water ripple animation
const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(3);
    opacity: 0;
  }
`;

// Water droplet pulsing animation
const dropletPulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Simplified wobble animation
const wobble = keyframes`
  0% {
    border-radius: 50%;
  }
  50% {
    border-radius: 45% 55% 55% 45% / 45% 55% 45% 55%;
  }
  100% {
    border-radius: 50%;
  }
`;

const CursorContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 99999;
  overflow: hidden;
`;

// Main cursor - simplified
const WaterCursor = styled(motion.div)<{ $isClicking: boolean }>`
  position: fixed;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 35%,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(0, 180, 255, 0.6) 40%,
    rgba(0, 120, 255, 0.7) 100%
  );
  box-shadow: 0 0 6px rgba(0, 149, 255, 0.4);
  margin-left: -11px;
  margin-top: -11px;
  pointer-events: none;
  z-index: 99999;
  animation: ${wobble} 4s infinite ease-in-out;
  opacity: 0.75;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 30%;
    height: 30%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
  }
  
  ${({ $isClicking }) => $isClicking && css`
    width: 28px;
    height: 28px;
    margin-left: -14px;
    margin-top: -14px;
    animation: ${dropletPulse} 0.6s ease-out;
  `}
`;

// Simplified splash effect
const SplashEffect = styled(motion.div)`
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1.5px solid rgba(0, 180, 255, 0.5);
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

// Simplified droplet
const Droplet = styled(motion.div)<{ $size: number; $angle: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  background: rgba(0, 175, 255, 0.6);
  transform-origin: center;
  pointer-events: none;
`;

// Simplified water trail
const WaterTrail = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(0, 175, 255, 0.1);
  pointer-events: none;
`;

// Simplified ripple effect
const RippleEffect = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(0, 180, 255, 0.5);
  pointer-events: none;
  transform: translate(-50%, -50%);
`;

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface Splash {
  id: number;
  x: number;
  y: number;
  angle: number;
  size: number;
}

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default to true to prevent flash of cursor on mobile
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  // Detect touch device - run this first and immediately
  useEffect(() => {
    const detectTouchDevice = () => {
      const result = (
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        (navigator as any).msMaxTouchPoints > 0 || 
        window.matchMedia('(pointer: coarse)').matches ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
      return result;
    };
    
    const isMobile = detectTouchDevice();
    setIsTouchDevice(isMobile);
    
    // If mobile, make sure normal cursors are displayed
    if (isMobile) {
      document.documentElement.style.setProperty('--cursor-visibility', 'auto');
      document.body.classList.remove('custom-cursor');
      
      const styleEl = document.createElement('style');
      styleEl.id = 'mobile-cursor-fix';
      styleEl.innerHTML = `
        body, body * {
          cursor: auto !important;
        }
        a, button, input[type="submit"], input[type="button"], 
        select, [role="button"], .clickable {
          cursor: pointer !important;
        }
      `;
      
      // Only append if not already present
      if (!document.getElementById('mobile-cursor-fix')) {
        document.head.appendChild(styleEl);
      }
    } else {
      // On desktop, add the custom cursor class
      document.body.classList.add('custom-cursor');
    }
    
    return () => {
      const styleEl = document.getElementById('mobile-cursor-fix');
      if (styleEl) {
        document.head.removeChild(styleEl);
      }
    };
  }, []);
  
  // Only set up mouse events on desktop
  useEffect(() => {
    if (isTouchDevice) return;
    
    const handleFirstMove = (e: MouseEvent) => {
      setIsVisible(true);
      window.removeEventListener('mousemove', handleFirstMove);
    };
    
    window.addEventListener('mousemove', handleFirstMove);
    
    // Use requestAnimationFrame for smoother cursor movement
    let animationFrameId: number;
    let lastCallTime = 0;
    const throttleInterval = 16; // ~60fps
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      
      // Throttle updates to prevent performance issues
      if (now - lastCallTime < throttleInterval) return;
      lastCallTime = now;
      
      // Schedule update with requestAnimationFrame
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        const newPosition = { x: e.clientX, y: e.clientY };
        setMousePosition(newPosition);
        
        // Add to trail (with a low limit to improve performance)
        const maxTrailLength = 3;
        setTrail(prevTrail => {
          const newTrail = [
            { id: Date.now(), x: e.clientX, y: e.clientY },
            ...prevTrail,
          ];
          
          if (newTrail.length > maxTrailLength) {
            return newTrail.slice(0, maxTrailLength);
          }
          
          return newTrail;
        });
        
        setLastPosition(newPosition);
      });
    };
    
    const handleMouseDown = () => {
      setIsClicking(true);
      
      // Only create effects occasionally to reduce performance impact
      if (Math.random() > 0.7) {
        const newRipple = {
          id: Date.now(),
          x: mousePosition.x,
          y: mousePosition.y,
        };
        
        setRipples(prevRipples => [...prevRipples, newRipple]);
        
        // Clean up ripple
        setTimeout(() => {
          setRipples(prevRipples => 
            prevRipples.filter(ripple => ripple.id !== newRipple.id)
          );
        }, 400);
        
        // Add minimal splash effects - just a few droplets
        const numSplashes = 3;
        const newSplashes: Splash[] = [];
        
        for (let i = 0; i < numSplashes; i++) {
          newSplashes.push({
            id: Date.now() + i,
            x: mousePosition.x,
            y: mousePosition.y,
            angle: (i * (360 / numSplashes)) * (Math.PI / 180),
            size: 3 + Math.random() * 2,
          });
        }
        
        setSplashes(prevSplashes => [...prevSplashes, ...newSplashes]);
        
        // Clean up splashes
        setTimeout(() => {
          setSplashes(prevSplashes => 
            prevSplashes.filter(splash => !newSplashes.some(ns => ns.id === splash.id))
          );
        }, 400);
      }
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    
    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousemove', handleFirstMove);
      
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [mousePosition, isClicking, isTouchDevice]);
  
  // If on a touch device, don't render the cursor at all
  if (isTouchDevice) {
    return null;
  }
  
  return (
    <CursorContainer>
      {/* Main cursor */}
      <AnimatePresence>
        {isVisible && (
          <WaterCursor
            $isClicking={isClicking}
            style={{ top: mousePosition.y, left: mousePosition.x }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
      
      {/* Minimal trail effect */}
      {trail.map((dot, index) => (
        <WaterTrail
          key={dot.id}
          style={{
            left: dot.x,
            top: dot.y,
            opacity: 0.3 - (index * 0.1)
          }}
        />
      ))}
      
      {/* Ripple effect for clicks - minimal */}
      <AnimatePresence>
        {ripples.map(ripple => (
          <RippleEffect
            key={ripple.id}
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: 0, height: 0, opacity: 0.5 }}
            animate={{ width: 40, height: 40, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </AnimatePresence>
      
      {/* Splash droplets - minimal */}
      <AnimatePresence>
        {splashes.map(splash => (
          <Droplet
            key={splash.id}
            $size={splash.size}
            $angle={splash.angle}
            style={{ left: splash.x, top: splash.y }}
            initial={{ 
              x: 0, 
              y: 0, 
              opacity: 0.6 
            }}
            animate={{ 
              x: Math.cos(splash.angle) * 20,
              y: Math.sin(splash.angle) * 20,
              opacity: 0 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.4,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </CursorContainer>
  );
};

export default CustomCursor; 