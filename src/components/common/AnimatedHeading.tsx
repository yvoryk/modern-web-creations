import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type GradientType = 
  'blue' | 'yellow' | 'purple' | 'cyan' | 'red' | 
  'green' | 'mixed' | 'sunset' | 'frost' | 'rainbow' | 'neon';

interface AnimatedHeadingProps {
  children: React.ReactNode;
  level?: HeadingLevel;
  gradient?: GradientType;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: string;
  fontWeight?: string | number;
  className?: string;
  letterSpacing?: string;
  withShadow?: boolean;
  withGlow?: boolean;
  withUnderline?: boolean;
  underlineColor?: string;
  underlineWidth?: string;
  underlineOffset?: string;
  uppercase?: boolean;
  fontFamily?: string;
  lineHeight?: string | number;
  maxWidth?: string;
}

const shimmer = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const pulse = keyframes`
  0% {
    text-shadow: 0 0 7px rgba(255, 255, 255, 0.5);
  }
  50% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
  }
  100% {
    text-shadow: 0 0 7px rgba(255, 255, 255, 0.5);
  }
`;

const underlineDraw = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
`;

const getGradient = (type: GradientType, theme: any) => {
  switch (type) {
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
    default:
      return theme.gradientBlue;
  }
};

const StyledHeading = styled(motion.h1)<{
  $gradient: GradientType;
  $textAlign?: string;
  $fontSize?: string;
  $fontWeight?: string | number;
  $letterSpacing?: string;
  $withShadow?: boolean;
  $withGlow?: boolean;
  $withUnderline?: boolean;
  $underlineColor?: string;
  $underlineWidth?: string;
  $underlineOffset?: string;
  $uppercase?: boolean;
  $fontFamily?: string;
  $lineHeight?: string | number;
  $maxWidth?: string;
}>`
  background: ${({ theme, $gradient }) => getGradient($gradient, theme)};
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmer} 5s ease infinite;
  will-change: background-position;
  
  text-align: ${props => props.$textAlign || 'left'};
  font-size: ${props => props.$fontSize || '2.5rem'};
  font-weight: ${props => props.$fontWeight || '800'};
  letter-spacing: ${props => props.$letterSpacing || '-0.02em'};
  text-transform: ${props => props.$uppercase ? 'uppercase' : 'none'};
  font-family: ${props => props.$fontFamily || 'var(--font-modern)'};
  line-height: ${props => props.$lineHeight || '1.2'};
  margin-bottom: 1rem;
  max-width: ${props => props.$maxWidth || 'none'};
  position: relative;
  display: inline-block;
  
  ${props => props.$withShadow && `
    text-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
  `}
  
  ${props => props.$withGlow && `
    animation: ${shimmer} 5s ease infinite, ${pulse} 3s ease-in-out infinite;
    will-change: background-position, text-shadow;
  `}
  
  ${props => props.$withUnderline && `
    &::after {
      content: '';
      position: absolute;
      bottom: -${props.$underlineOffset || '8px'};
      left: 0;
      height: ${props.$underlineWidth || '3px'};
      width: 0;
      background: ${props.$underlineColor || getGradient(props.$gradient, props.theme)};
      animation: ${underlineDraw} 1s ease forwards 0.5s;
      border-radius: 3px;
      will-change: width;
    }
  `}
`;

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  children,
  level = 'h1',
  gradient = 'blue',
  textAlign,
  fontSize,
  fontWeight,
  className,
  letterSpacing,
  withShadow = false,
  withGlow = false,
  withUnderline = false,
  underlineColor,
  underlineWidth,
  underlineOffset,
  uppercase = false,
  fontFamily,
  lineHeight,
  maxWidth,
}) => {
  return (
    <StyledHeading
      as={level}
      $gradient={gradient}
      $textAlign={textAlign}
      $fontSize={fontSize}
      $fontWeight={fontWeight}
      $letterSpacing={letterSpacing}
      $withShadow={withShadow}
      $withGlow={withGlow}
      $withUnderline={withUnderline}
      $underlineColor={underlineColor}
      $underlineWidth={underlineWidth}
      $underlineOffset={underlineOffset}
      $uppercase={uppercase}
      $fontFamily={fontFamily}
      $lineHeight={lineHeight}
      $maxWidth={maxWidth}
      className={className}
      variants={headingVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </StyledHeading>
  );
};

export default AnimatedHeading; 