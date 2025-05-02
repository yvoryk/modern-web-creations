import React, { memo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  clickable?: boolean;
  onClick?: () => void;
  className?: string;
  image?: string;
  variant?: 'default' | 'gradient' | 'outline' | 'minimal';
  gradientType?: 'blue' | 'yellow' | 'purple' | 'cyan' | 'red' | 'green' | 'mixed' | 'sunset' | 'frost' | 'rainbow';
  animated?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  padded?: boolean;
  elevated?: boolean;
  as?: React.ElementType;
  to?: string;
}

interface StyledCardProps {
  $clickable?: boolean;
  $variant?: string;
  $gradientType?: string;
  $animated?: boolean;
  $hoverable?: boolean;
  $bordered?: boolean;
  $padded?: boolean;
  $elevated?: boolean;
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

const getCardVariant = (variant: string, gradientType: string, animated: boolean) => {
  switch (variant) {
    case 'gradient':
      return css`
        background: ${({ theme }: any) => {
          switch (gradientType) {
            case 'blue': return theme.gradientBlue;
            case 'yellow': return theme.gradientYellow;
            case 'purple': return theme.gradientPurple;
            case 'cyan': return theme.gradientCyan;
            case 'red': return theme.gradientRed;
            case 'green': return theme.gradientGreen;
            case 'mixed': return theme.gradientMixed;
            case 'sunset': return theme.gradientSunset;
            case 'frost': return theme.gradientFrost;
            case 'rainbow': return theme.gradientRainbow;
            default: return theme.gradientBlue;
          }
        }};
        background-size: 200% 200%;
        color: white;
        
        ${animated && css`
          animation: ${shimmer} 5s linear infinite;
          will-change: background-position;
        `}
      `;
    case 'outline':
      return css`
        background-color: transparent;
        border: 2px solid ${({ theme }: any) => theme.borderColor};
      `;
    case 'minimal':
      return css`
        background-color: transparent;
        box-shadow: none;
      `;
    default:
      return css`
        background-color: ${({ theme }: any) => theme.cardBackground};
        color: ${({ theme }: any) => theme.text};
      `;
  }
};

const CardImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  transition: transform 0.3s var(--ease-out);
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const StyledCard = styled(motion.div)<StyledCardProps>`
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: all 0.3s var(--ease-out);
  height: 100%;
  position: relative;
  
  /* Apply variant styles */
  ${({ $variant = 'default', $gradientType = 'blue', $animated = false }) => 
    getCardVariant($variant, $gradientType, $animated)}
  
  /* Apply elevation */
  ${({ $elevated, theme, $variant }) => 
    $elevated && $variant !== 'minimal' && `box-shadow: var(--shadow-md);`}
  
  /* Apply hover effect */
  ${({ $hoverable, $clickable }) => ($hoverable || $clickable) && `
    cursor: ${$clickable ? 'pointer' : 'default'};
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
      will-change: transform, box-shadow;
      
      ${CardImage} {
        transform: scale(1.05);
      }
    }
  `}
  
  ${({ $bordered, theme }) => $bordered && `
    border: 1px solid ${theme.border};
  `}
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    } 
  }
};

const Card: React.FC<CardProps> = ({
  children,
  clickable = false,
  onClick,
  className,
  image,
  variant = 'default',
  gradientType = 'blue',
  animated = false,
  hoverable = false,
  bordered = false,
  padded = true,
  elevated = true,
  as,
  to,
  ...rest
}) => {
  return (
    <StyledCard
      $clickable={clickable}
      $variant={variant}
      $gradientType={gradientType}
      $animated={animated}
      $hoverable={hoverable}
      $bordered={bordered}
      $padded={false} // We handle padding through CardContent
      $elevated={elevated}
      className={className}
      onClick={onClick}
      as={as}
      to={to}
      whileHover={hoverable || clickable ? { y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      {...rest}
    >
      {image && <CardImage $image={image} />}
      <CardContent>
        {children}
      </CardContent>
    </StyledCard>
  );
};

export default memo(Card); 