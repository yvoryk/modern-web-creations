import React, { memo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

type GradientType = 
  | 'blue' 
  | 'yellow' 
  | 'purple' 
  | 'cyan' 
  | 'red' 
  | 'green' 
  | 'mixed' 
  | 'sunset' 
  | 'frost' 
  | 'rainbow' 
  | 'neon'
  | 'pastel'
  | 'ocean'
  | 'fire'
  | 'cosmos';

type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';

interface GradientTextProps {
  children: React.ReactNode;
  gradient?: GradientType;
  element?: TextElement;
  fontSize?: string;
  fontWeight?: string | number;
  fontFamily?: string;
  letterSpacing?: string;
  lineHeight?: string | number;
  animated?: boolean;
  animationSpeed?: number;
  className?: string;
  withGlow?: boolean;
  uppercase?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  animate?: boolean;
}

// Optimized animations with fewer keyframes
const shimmer = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`;

const hueRotate = keyframes`
  0%, 100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(180deg);
  }
`;

const getGradient = (gradientType: GradientType, theme: any) => {
  switch (gradientType) {
    case 'blue':
      return theme.gradientBlue;
    case 'yellow':
      return theme.gradientYellow;
    case 'purple':
      return theme.gradientPurple;
    case 'cyan':
      return theme.gradientCyan;
    case 'red':
      return theme.gradientRed;
    case 'green':
      return theme.gradientGreen;
    case 'mixed':
      return theme.gradientMixed;
    case 'sunset':
      return theme.gradientSunset;
    case 'frost':
      return theme.gradientFrost;
    case 'rainbow':
      return theme.gradientRainbow;
    case 'neon':
      return 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #FFFF00 100%)';
    case 'pastel':
      return 'linear-gradient(135deg, #FFD1DC 0%, #BFFCC6 30%, #C4E0FF 60%, #FFD1DC 100%)';
    case 'ocean':
      return 'linear-gradient(135deg, #006994 0%, #00BFFF 35%, #00008B 70%, #120A8F 100%)';
    case 'fire':
      return 'linear-gradient(135deg, #FFFF00 0%, #FFA500 25%, #FF4500 50%, #8B0000 100%)';
    case 'cosmos':
      return 'linear-gradient(135deg, #000033 0%, #191970 30%, #483D8B 50%, #9370DB 70%, #E6E6FA 100%)';
    default:
      return theme.gradientBlue;
  }
};

const standardAnimation = (speed: number) => css`
  animation: ${shimmer} ${speed}s ease infinite;
  will-change: background-position;
  animation-fill-mode: both;
`;

const neonAnimation = (speed: number) => css`
  animation: ${shimmer} ${speed}s ease infinite, ${hueRotate} 15s linear infinite;
  will-change: background-position, filter;
  animation-fill-mode: both;
`;

const StyledGradientText = styled(motion.div)<{
  $fontSize?: string;
  $fontWeight?: string | number;
  $fontFamily?: string;
  $letterSpacing?: string;
  $lineHeight?: string | number;
  $animated?: boolean;
  $animationSpeed?: number;
  $gradient: GradientType;
  $withGlow?: boolean;
  $uppercase?: boolean;
  $textAlign?: 'left' | 'center' | 'right';
}>`
  background: ${({ theme, $gradient }) => getGradient($gradient, theme)};
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  
  ${props => {
    if (!props.$animated) return '';
    return props.$gradient === 'neon' 
      ? neonAnimation(props.$animationSpeed || 5)
      : standardAnimation(props.$animationSpeed || 5);
  }}
  
  font-size: ${({ $fontSize }) => $fontSize || 'inherit'};
  font-weight: ${({ $fontWeight }) => $fontWeight || 'inherit'};
  font-family: ${({ $fontFamily }) => $fontFamily || 'inherit'};
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing || 'initial'};
  line-height: ${({ $lineHeight }) => $lineHeight || 'initial'};
  text-transform: ${({ $uppercase }) => ($uppercase ? 'uppercase' : 'initial')};
  text-align: ${({ $textAlign }) => $textAlign || 'inherit'};
  
  ${({ $withGlow }) => $withGlow && css`
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    will-change: text-shadow;
  `}
  
  /* Optimize performance with hardware acceleration */
  transform: translateZ(0);
`;

const GradientText: React.FC<GradientTextProps> = ({
  children,
  gradient = 'blue',
  element = 'span',
  fontSize,
  fontWeight,
  fontFamily,
  letterSpacing,
  lineHeight,
  animated = true,
  animationSpeed = 5,
  className,
  withGlow = false,
  uppercase = false,
  textAlign,
  animate = true,
}) => {
  // Simplified animation variants for better performance
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4, 
        ease: "easeOut" // Simpler easing function
      }
    }
  };

  return (
    <StyledGradientText
      as={element}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $fontFamily={fontFamily}
      $letterSpacing={letterSpacing}
      $lineHeight={lineHeight}
      $animated={animated}
      $animationSpeed={animationSpeed}
      $gradient={gradient}
      $withGlow={withGlow}
      $uppercase={uppercase}
      $textAlign={textAlign}
      className={className}
      variants={animate ? variants : undefined}
      initial={animate ? "hidden" : undefined}
      whileInView={animate ? "visible" : undefined}
      viewport={animate ? { once: true, amount: 0.1 } : undefined}
    >
      {children}
    </StyledGradientText>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(GradientText); 