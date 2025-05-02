import React, { ReactNode } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

interface SectionProps {
  title?: ReactNode;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'glass';
  gradientType?: 'blue' | 'yellow' | 'purple' | 'cyan' | 'red' | 'green' | 'mixed' | 'sunset' | 'frost' | 'rainbow';
  animated?: boolean;
  titleGradient?: boolean;
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

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const getGradientBackground = (gradientType: string) => {
  switch (gradientType) {
    case 'blue':
      return css`background: ${({ theme }) => theme.gradientBlue};`;
    case 'yellow':
      return css`background: ${({ theme }) => theme.gradientYellow};`;
    case 'purple':
      return css`background: ${({ theme }) => theme.gradientPurple};`;
    case 'cyan':
      return css`background: ${({ theme }) => theme.gradientCyan};`;
    case 'red':
      return css`background: ${({ theme }) => theme.gradientRed};`;
    case 'green':
      return css`background: ${({ theme }) => theme.gradientGreen};`;
    case 'mixed':
      return css`background: ${({ theme }) => theme.gradientMixed};`;
    case 'sunset':
      return css`background: ${({ theme }) => theme.gradientSunset};`;
    case 'frost':
      return css`background: ${({ theme }) => theme.gradientFrost};`;
    case 'rainbow':
      return css`background: ${({ theme }) => theme.gradientRainbow};`;
    default:
      return css`background: ${({ theme }) => theme.gradientBlue};`;
  }
};

const getSectionVariant = (variant: string, gradientType: string, light: boolean, animated: boolean) => {
  switch (variant) {
    case 'gradient':
      return css`
        ${getGradientBackground(gradientType)}
        background-size: 200% 200%;
        color: white;
        
        ${animated && css`
          animation: ${shimmer} 8s var(--ease-in-out) infinite;
        `}
      `;
    case 'glass':
      return css`
        background: ${({ theme }) => theme.glassBackground};
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: var(--border-radius-lg);
        margin: 0 2rem;
        box-shadow: var(--shadow-md);
      `;
    default:
      return light 
        ? css`background-color: ${({ theme }) => theme.background};`
        : css`background-color: ${({ theme }) => theme.cardBackground};`;
  }
};

const SectionContainer = styled.section<{ 
  $light?: boolean;
  $variant?: string;
  $gradientType?: string;
  $animated?: boolean;
}>`
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
  
  ${({ $variant = 'default', $gradientType = 'blue', $light = true, $animated = false }) => 
    getSectionVariant($variant, $gradientType, $light, $animated)}
    
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const SectionInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled.div<{ $centered?: boolean }>`
  text-align: ${({ $centered }) => ($centered ? 'center' : 'left')};
  margin-bottom: 3rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: -1.5rem;
    left: ${({ $centered }) => ($centered ? '50%' : '0')};
    transform: ${({ $centered }) => ($centered ? 'translateX(-50%)' : 'none')};
    width: ${({ $centered }) => ($centered ? '80px' : '60px')};
    height: 3px;
    background: ${({ theme }) => theme.gradientMixed};
    background-size: 200% auto;
    animation: gradientAnimation 5s ease infinite;
    border-radius: var(--border-radius-rounded);
  }
  
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Title = styled(motion.h2)<{ $titleGradient?: boolean; $gradientType?: string }>`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  font-family: var(--font-secondary);
  font-weight: 800;
  letter-spacing: -0.02em;
  
  ${({ $titleGradient, $gradientType = 'blue', theme }) => $titleGradient && css`
    background: ${
      $gradientType === 'rainbow' 
        ? theme.gradientRainbow 
        : $gradientType === 'blue' 
          ? theme.gradientBlue 
          : $gradientType === 'yellow' 
            ? theme.gradientYellow 
            : $gradientType === 'purple'
              ? theme.gradientPurple
              : $gradientType === 'cyan'
                ? theme.gradientCyan
                : $gradientType === 'red'
                  ? theme.gradientRed
                  : $gradientType === 'green'
                    ? theme.gradientGreen
                    : $gradientType === 'mixed'
                      ? theme.gradientMixed
                      : $gradientType === 'sunset'
                        ? theme.gradientSunset
                        : $gradientType === 'frost'
                          ? theme.gradientFrost
                          : theme.gradientBlue
    };
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: ${shimmer} 5s linear infinite;
    text-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
  `}
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled(motion.p)<{ $centered?: boolean }>`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textLight};
  max-width: 700px;
  margin: ${({ $centered }) => $centered ? '0 auto' : '0'};
  line-height: 1.6;
  font-family: var(--font-accent);
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  centered = false,
  light = true,
  id,
  className,
  children,
  variant = 'default',
  gradientType = 'blue',
  animated = false,
  titleGradient = true
}) => {
  return (
    <SectionContainer 
      id={id} 
      className={className} 
      $light={light}
      $variant={variant}
      $gradientType={gradientType}
      $animated={animated}
    >
      <SectionInner>
        {(title || subtitle) && (
          <SectionHeader $centered={centered}>
            {title && (
              <Title
                $titleGradient={titleGradient}
                $gradientType={gradientType}
                variants={titleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="text-shadow"
              >
                {title}
              </Title>
            )}
            {subtitle && (
              <Subtitle
                $centered={centered}
                variants={subtitleVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {subtitle}
              </Subtitle>
            )}
          </SectionHeader>
        )}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {children}
        </motion.div>
      </SectionInner>
    </SectionContainer>
  );
};

export default Section; 