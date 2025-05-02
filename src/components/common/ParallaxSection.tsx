import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  bgImage?: string;
  height?: string;
}

const ParallaxContainer = styled(motion.section)<{ height?: string; bgImage?: string }>`
  position: relative;
  width: 100%;
  height: ${({ height }) => height || '100vh'};
  overflow: hidden;
  background-image: ${({ bgImage }) => bgImage ? `url(${bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled(motion.div)`
  width: 100%;
  z-index: 2;
`;

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  bgImage,
  height
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  
  const { scrollY } = useScroll();

  // Determine the range to transform within
  const initial = elementTop - clientHeight;
  const final = elementTop + (ref.current?.offsetHeight || 0);
  
  // Transform based on scroll position relative to the element
  const yRange = useTransform(
    scrollY, 
    [initial, final], 
    direction === 'up' ? [speed * 100, speed * -100] : [speed * -100, speed * 100]
  );

  // Update element position on mount and resize
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const updatePosition = () => {
      const { top } = element.getBoundingClientRect();
      setElementTop(top + window.scrollY);
      setClientHeight(window.innerHeight);
    };
    
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  return (
    <ParallaxContainer ref={ref} bgImage={bgImage} height={height}>
      <ContentWrapper style={{ y: yRange }}>
        {children}
      </ContentWrapper>
    </ParallaxContainer>
  );
};

export default ParallaxSection; 