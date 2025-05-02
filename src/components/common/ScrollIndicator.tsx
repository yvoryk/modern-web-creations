import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollIndicatorProps {
  height?: string;
  color?: string;
  position?: 'top' | 'bottom';
}

const IndicatorContainer = styled.div<{ position: string }>`
  position: fixed;
  left: 0;
  right: 0;
  ${({ position }) => position === 'top' ? 'top: 0;' : 'bottom: 0;'}
  z-index: 9990;
  width: 100%;
  height: 4px;
  background-color: transparent;
  opacity: 0.8;
`;

const ProgressBar = styled(motion.div)<{ height: string; barColor: string }>`
  height: ${({ height }) => height};
  background: ${({ barColor, theme }) => barColor || theme.primary};
  width: 100%;
  transform-origin: 0%;
`;

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({
  height = '4px',
  color,
  position = 'top'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <IndicatorContainer position={position}>
      <ProgressBar
        height={height}
        barColor={color || ''}
        style={{ scaleX }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </IndicatorContainer>
  );
};

export default ScrollIndicator; 