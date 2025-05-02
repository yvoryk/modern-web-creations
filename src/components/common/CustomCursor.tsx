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
    border-radius: 50%;
  }
  25% {
    transform: scale(1.05) translateY(-1px);
    border-radius: 45% 55% 55% 45% / 55% 45% 55% 45%;
  }
  50% {
    transform: scale(1) translateY(1px);
    border-radius: 50% 50% 45% 55% / 55% 55% 45% 45%;
  }
  75% {
    transform: scale(0.98);
    border-radius: 45% 55% 45% 55% / 45% 45% 55% 55%;
  }
  100% {
    transform: scale(1);
    border-radius: 50%;
  }
`;

// Water wobble animation
const wobble = keyframes`
  0% {
    border-radius: 50%;
  }
  33% {
    border-radius: 55% 45% 55% 45% / 45% 55% 45% 55%;
  }
  66% {
    border-radius: 45% 55% 45% 55% / 55% 45% 55% 45%;
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

// Main cursor
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
  box-shadow: 
    0 0 6px rgba(0, 149, 255, 0.4),
    inset 0 0 6px rgba(255, 255, 255, 0.3);
  margin-left: -11px;
  margin-top: -11px;
  pointer-events: none;
  z-index: 99999;
  animation: ${wobble} 3s infinite ease-in-out;
  opacity: 0.75;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    background: radial-gradient(
      circle at 25% 25%,
      rgba(255, 255, 255, 0.6) 0%,
      rgba(255, 255, 255, 0) 50%
    );
    opacity: 0.6;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    filter: blur(1px);
  }
  
  ${({ $isClicking }) => $isClicking && css`
    width: 28px;
    height: 28px;
    margin-left: -14px;
    margin-top: -14px;
    background: radial-gradient(
      circle at 35% 35%,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(0, 210, 255, 0.65) 40%,
      rgba(0, 140, 255, 0.75) 100%
    );
    animation: ${dropletPulse} 0.6s ease-in-out;
  `}
`;

// Splash effect when clicking
const SplashEffect = styled(motion.div)`
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 1.5px solid rgba(0, 180, 255, 0.5);
  transform: translate(-50%, -50%);
  pointer-events: none;
`;

// Small droplets that fly out when clicking
const Droplet = styled(motion.div)<{ $size: number; $angle: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  background: rgba(0, 175, 255, 0.6);
  transform-origin: center;
  pointer-events: none;
  box-shadow: 0 0 2px rgba(0, 149, 255, 0.3);
  opacity: 0.7;
  
  &::after {
    content: '';
    position: absolute;
    top: 20%;
    left: 20%;
    width: 40%;
    height: 40%;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
  }
`;

// Water trail effect
const WaterTrail = styled(motion.div)`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(0, 175, 255, 0.1);
  pointer-events: none;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(
      circle at 30% 30%, 
      rgba(255, 255, 255, 0.2) 0%, 
      rgba(255, 255, 255, 0) 70%
    );
  }
`;

// Ripple effect in water
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
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // For debugging - set to false to force-enable cursor even on touch devices
    const checkTouchDevice = () => {
      setIsTouchDevice(false);
    };
    
    checkTouchDevice();
    
    if (isTouchDevice) return;
    
    // Show cursor only after it's moved
    const handleFirstMove = (e: MouseEvent) => {
      setIsVisible(true);
      window.removeEventListener('mousemove', handleFirstMove);
    };
    
    window.addEventListener('mousemove', handleFirstMove);
    
    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setMousePosition(newPosition);
      
      // Calculate velocity for more realistic water movement
      const deltaX = newPosition.x - lastPosition.x;
      const deltaY = newPosition.y - lastPosition.y;
      
      setVelocity({ x: deltaX, y: deltaY });
      setLastPosition(newPosition);
      
      // Create trail based on velocity
      const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      if (speed > 5) { // Only create trail when moving fast enough
        // Create more trail dots when moving faster
        const trailFrequency = Math.min(0.9, 0.5 + speed / 100);
        
        if (Math.random() > trailFrequency) {
          const newDot = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
          };
          
          setTrail(prev => [...prev, newDot].slice(-5));
        }
        
        // Create ripple effect occasionally during fast movement
        if (speed > 15 && Math.random() > 0.94) {
          const newRipple = {
            id: Date.now(),
            x: e.clientX,
            y: e.clientY,
          };
          
          setRipples(prev => [...prev, newRipple].slice(-3));
        }
      }
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      
      // Create a splash effect on click
      const splashRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      
      setRipples(prev => [...prev, splashRipple]);
      
      // Create small droplets flying outward
      const newSplashes: Splash[] = [];
      const numDroplets = 4 + Math.floor(Math.random() * 4); // Reduce to 4-8 droplets
      
      for (let i = 0; i < numDroplets; i++) {
        const angle = (Math.random() * 360) * (Math.PI / 180);
        const size = 2 + Math.random() * 3; // Smaller: 2-5px
        
        newSplashes.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          angle: angle,
          size: size
        });
      }
      
      setSplashes(prev => [...prev, ...newSplashes].slice(-12)); // Fewer max splashes
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
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleFirstMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice, lastPosition]);
  
  // Clean up old ripples
  useEffect(() => {
    if (ripples.length) {
      const timer = setTimeout(() => {
        setRipples(prev => prev.slice(1));
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [ripples]);
  
  // Clean up old splashes
  useEffect(() => {
    if (splashes.length) {
      const timer = setTimeout(() => {
        setSplashes(prev => prev.slice(Math.max(1, Math.floor(prev.length / 4))));
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [splashes]);
  
  // Don't render on touch devices
  if (isTouchDevice) return null;
  
  // Calculate cursor spring animation based on velocity
  const springConfig = {
    type: "spring" as const,
    damping: 16 + Math.min(8, Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y)),
    stiffness: 400,
    mass: 0.3
  };
  
  return (
    <CursorContainer>
      {/* Main water droplet cursor */}
      <WaterCursor
        $isClicking={isClicking}
        animate={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        transition={springConfig}
      />
      
      {/* Water trail */}
      <AnimatePresence>
        {trail.map((dot, i) => (
          <WaterTrail
            key={dot.id}
            initial={{ 
              opacity: 0.5, 
              scale: 0.7 + (i * 0.1), 
              left: dot.x, 
              top: dot.y,
              borderRadius: '50%'
            }}
            animate={{ 
              opacity: 0,
              scale: 0.4,
              borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%' 
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8 }}
          />
        ))}
      </AnimatePresence>
      
      {/* Ripple effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <RippleEffect
            key={ripple.id}
            initial={{ 
              width: 10, 
              height: 10, 
              opacity: 0.8, 
              left: ripple.x, 
              top: ripple.y 
            }}
            animate={{ 
              width: 80, 
              height: 80, 
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
      
      {/* Splash droplets on click */}
      <AnimatePresence>
        {splashes.map((splash) => (
          <Droplet
            key={splash.id}
            $size={splash.size}
            $angle={splash.angle}
            initial={{ 
              left: splash.x, 
              top: splash.y, 
              opacity: 0.8,
              scale: 1
            }}
            animate={{ 
              left: splash.x + Math.cos(splash.angle) * (30 + Math.random() * 40),
              top: splash.y + Math.sin(splash.angle) * (30 + Math.random() * 40) + 20, // Add gravity
              opacity: 0,
              scale: 0.5
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.4 + Math.random() * 0.3,
              ease: [0.2, 0.9, 0.4, 1] // Custom ease for realistic physics
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* Large splash on click */}
      <AnimatePresence>
        {isClicking && (
          <SplashEffect
            initial={{ 
              opacity: 0.8, 
              scale: 0.3, 
              left: mousePosition.x, 
              top: mousePosition.y 
            }}
            animate={{ 
              opacity: 0, 
              scale: 1.5
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </CursorContainer>
  );
};

export default CustomCursor; 