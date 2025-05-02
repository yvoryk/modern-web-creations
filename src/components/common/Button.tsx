import React, { memo, useState, useRef, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export type ButtonVariant = 'solid' | 'outline' | 'gradient' | 'ghost' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type GradientType = 'blue' | 'yellow' | 'purple' | 'cyan' | 'red' | 'green' | 'mixed' | 'sunset' | 'rainbow';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  gradientType?: GradientType;
  onClick?: () => void;
  className?: string;
  to?: string;
  download?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  particleEffect?: boolean;
  morphText?: boolean;
}

// Particle type definition
interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

// Particle animation
const particleKeyframes = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--x), var(--y)) scale(0);
    opacity: 0;
  }
`;

const ParticleSpan = styled.span`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color);
  pointer-events: none;
  opacity: 0;
  animation: ${particleKeyframes} 1s ease-out forwards;
`;

// Text morphing effect
const textMorph = keyframes`
  0% {
    transform: scale(1, 1);
    letter-spacing: 0;
  }
  25% {
    transform: scale(1.2, 0.8);
    letter-spacing: 0.05em;
  }
  50% {
    transform: scale(0.95, 1.05);
    letter-spacing: 0.1em;
  }
  75% {
    transform: scale(1.05, 0.95);
    letter-spacing: 0.05em;
  }
  100% {
    transform: scale(1, 1);
    letter-spacing: 0;
  }
`;

const ButtonContent = styled.span<{ $morphText?: boolean }>`
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
  display: inline-block;
  
  ${({ $morphText }) => $morphText && css`
    &::before {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: translateY(100%);
      opacity: 0;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .morphText {
      display: block;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
  `}
`;

const StyledButton = styled(motion.button)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $gradientType?: GradientType;
  $fullWidth?: boolean;
  $hasIcon: boolean;
  $iconPosition: 'left' | 'right';
  $particleEffect?: boolean;
  $morphText?: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 600;
  line-height: 1;
  border-radius: 9999px;
  outline: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  text-align: center;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: 2px solid transparent;
  transition: all 0.3s var(--ease-out);
  transform: translateZ(0);
  will-change: transform, opacity, background-color, box-shadow;
  overflow: hidden;
  
  ${({ $hasIcon, $iconPosition }) => $hasIcon && css`
    ${$iconPosition === 'left' ? 'padding-left: 1rem;' : 'padding-right: 1rem;'}
  `}
  
  /* Icon styling */
  .button-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    ${({ $iconPosition }) => $iconPosition === 'left' ? 'margin-right: 0.5rem;' : 'margin-left: 0.5rem;'}
    transition: transform 0.2s var(--ease-out);
  }
  
  &:hover:not(:disabled) .button-icon {
    ${({ $iconPosition }) => $iconPosition === 'right' ? 'transform: translateX(2px);' : 'transform: translateX(-2px);'}
  }
  
  /* Text morphing effect */
  ${({ $morphText }) => $morphText && css`
    &:hover:not(:disabled) ${ButtonContent} {
      .morphText {
        animation: ${textMorph} 0.7s ease-in-out;
      }
    }
  `}
  
  /* Ripple effect */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%, -50%);
    transform-origin: 50% 50%;
  }
  
  &:active::after {
    animation: ripple 0.6s ease-out;
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    100% {
      transform: scale(20, 20);
      opacity: 0;
    }
  }
  
  /* Size variants */
  ${({ $size }) => getButtonSize($size)}
  
  /* Style variants */
  ${({ $variant, $gradientType, theme }) => getVariantStyles($variant, $gradientType, theme)}
  
  /* Disabled state */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none !important;
    transform: none !important;
  }
`;

const StyledLink = styled(Link)<{
  $variant: ButtonVariant;
  $size: ButtonSize;
  $gradientType?: GradientType;
  $fullWidth?: boolean;
  $hasIcon: boolean;
  $iconPosition: 'left' | 'right';
  $particleEffect?: boolean;
  $morphText?: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 600;
  line-height: 1;
  border-radius: 9999px;
  outline: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  text-align: center;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  border: 2px solid transparent;
  transition: all 0.3s var(--ease-out);
  transform: translateZ(0);
  will-change: transform, opacity, background-color, box-shadow;
  overflow: hidden;
  
  ${({ $hasIcon, $iconPosition }) => $hasIcon && css`
    ${$iconPosition === 'left' ? 'padding-left: 1rem;' : 'padding-right: 1rem;'}
  `}
  
  /* Icon styling */
  .button-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    ${({ $iconPosition }) => $iconPosition === 'left' ? 'margin-right: 0.5rem;' : 'margin-left: 0.5rem;'}
    transition: transform 0.2s var(--ease-out);
  }
  
  &:hover:not(:disabled) .button-icon {
    ${({ $iconPosition }) => $iconPosition === 'right' ? 'transform: translateX(2px);' : 'transform: translateX(-2px);'}
  }
  
  /* Text morphing effect */
  ${({ $morphText }) => $morphText && css`
    &:hover:not(:disabled) ${ButtonContent} {
      .morphText {
        animation: ${textMorph} 0.7s ease-in-out;
      }
    }
  `}
  
  /* Ripple effect */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%, -50%);
    transform-origin: 50% 50%;
  }
  
  &:active::after {
    animation: ripple 0.6s ease-out;
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    100% {
      transform: scale(20, 20);
      opacity: 0;
    }
  }
  
  /* Size variants */
  ${({ $size }) => getButtonSize($size)}
  
  /* Style variants */
  ${({ $variant, $gradientType, theme }) => getVariantStyles($variant, $gradientType, theme)}
  
  /* Disabled state */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none !important;
    transform: none !important;
  }
`;

// Helper function to get the gradient CSS value
const getGradientCSSValue = (gradientType: GradientType | undefined, theme: any): string => {
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
    case 'rainbow':
      return theme.gradientRainbow;
    default:
      return theme.gradientBlue;
  }
};

// Size variant styles
const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.5rem 1.1rem;
        font-size: 0.875rem;
      `;
    case 'large':
      return css`
        padding: 1.1rem 2.5rem;
        font-size: 1.05rem;
        letter-spacing: 0.01em;
      `;
    case 'medium':
    default:
      return css`
        padding: 0.8rem 1.8rem;
        font-size: 0.9375rem;
      `;
  }
};

// Variant styles
const getVariantStyles = (variant: ButtonVariant, gradientType?: GradientType, theme?: any) => {
  switch (variant) {
    case 'outline':
      return css`
        background: transparent;
        border-color: ${theme.primary};
        color: ${theme.primary};
        
        &:hover:not(:disabled) {
          background: ${theme.primary}10;
          transform: translateY(-3px) rotateX(5deg);
          box-shadow: 0 8px 20px -8px ${theme.primary}60;
        }
        
        &:active:not(:disabled) {
          transform: translateY(-1px) rotateX(0deg);
          box-shadow: 0 4px 12px -6px ${theme.primary}40;
        }
      `;
    case 'ghost':
      return css`
        background: transparent;
        border-color: transparent;
        color: ${theme.primary};
        
        &:hover:not(:disabled) {
          background: ${theme.primary}10;
          transform: translateY(-3px) rotateX(5deg);
        }
        
        &:active:not(:disabled) {
          transform: translateY(-1px) rotateX(0deg);
        }
      `;
    case 'text':
      return css`
        background: transparent;
        border-color: transparent;
        color: ${theme.primary};
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        
        &:hover:not(:disabled) {
          color: ${theme.primaryHover};
          text-decoration: underline;
        }
        
        &:active:not(:disabled) {
          transform: translateY(0);
        }
      `;
    case 'gradient':
      return css`
        background: ${getGradientCSSValue(gradientType, theme)};
        background-size: 200% 200%;
        animation: gradientPosition 3s ease infinite;
        border-color: transparent;
        color: white;
        position: relative;
        z-index: 1;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        
        @keyframes gradientPosition {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        &::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: ${getGradientCSSValue(gradientType, theme)};
          background-size: 200% 200%;
          animation: gradientPosition 3s ease infinite;
          background-position: right;
          z-index: -1;
          filter: blur(15px);
          opacity: 0;
          border-radius: 9999px;
          transition: opacity 0.3s var(--ease-out);
        }
        
        &:hover:not(:disabled) {
          transform: translateY(-3px) rotateX(5deg);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          animation: pulse 1.5s infinite;
          
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 149, 255, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(0, 149, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 149, 255, 0); }
          }
          
          &::before {
            opacity: 0.7;
          }
        }
        
        &:active:not(:disabled) {
          transform: translateY(-1px) rotateX(0deg);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }
      `;
    case 'solid':
    default:
      return css`
        background: ${theme.primary};
        border-color: ${theme.primary};
        color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        position: relative;
        overflow: hidden;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.7s;
        }
        
        &:hover:not(:disabled) {
          background: ${theme.primaryHover};
          border-color: ${theme.primaryHover};
          transform: translateY(-3px) rotateX(5deg);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          
          &::before {
            left: 100%;
          }
        }
        
        &:active:not(:disabled) {
          transform: translateY(-1px) rotateX(0deg);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        }
      `;
  }
};

// Animation variants
const buttonVariants = {
  hover: { 
    y: -3,
    rotateX: 5,
    transition: { duration: 0.2, ease: [0, 0, 0.2, 1] } 
  },
  tap: { 
    y: -1,
    rotateX: 0,
    transition: { duration: 0.1, ease: [0, 0, 0.2, 1] } 
  }
};

const Button: React.FC<ButtonProps> = memo(({
  children,
  variant = 'solid',
  size = 'medium',
  disabled = false,
  gradientType = 'blue',
  onClick,
  className,
  to,
  download,
  target,
  rel,
  fullWidth,
  type = 'button',
  icon,
  iconPosition = 'right',
  particleEffect = true,
  morphText = true,
  ...props
}) => {
  const navigate = useNavigate();
  const hasIcon = !!icon;
  const buttonRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [nextId, setNextId] = useState(0);
  
  // Function to create particles
  const createParticles = (e: React.MouseEvent<HTMLElement>) => {
    if (!particleEffect || disabled) return;
    
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    if (!buttonRect) return;
    
    const colors = ['#00a3ff', '#00c3ff', '#00d5ff', '#0095ff', '#ffcc00'];
    const particleCount = 12;
    
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const id = nextId + i;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 60 + 20;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      newParticles.push({ id, x, y, color });
    }
    
    setNextId(nextId + particleCount);
    setParticles([...particles, ...newParticles]);
    
    // Clean up particles after animation
    setTimeout(() => {
      setParticles(prevParticles => 
        prevParticles.filter(p => !newParticles.some(np => np.id === p.id))
      );
    }, 1000);
  };
  
  // When particles array changes, we need to add them to the DOM
  useEffect(() => {
    if (!buttonRef.current) return;
    
    // For each new particle, add a span element
    particles.forEach(particle => {
      const particleEl = document.createElement('span');
      particleEl.classList.add('particle');
      particleEl.style.setProperty('--x', `${particle.x}px`);
      particleEl.style.setProperty('--y', `${particle.y}px`);
      particleEl.style.setProperty('--color', particle.color);
      particleEl.dataset.id = particle.id.toString();
      
      Object.assign(particleEl.style, {
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: `${Math.random() * 4 + 2}px`,
        height: `${Math.random() * 4 + 2}px`,
        borderRadius: '50%',
        background: particle.color,
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        animation: `${particleKeyframes.name} ${Math.random() * 0.5 + 0.5}s ease-out forwards`
      });
      
      if (buttonRef.current) {
        buttonRef.current.appendChild(particleEl);
        
        // Remove particle from DOM after animation
        setTimeout(() => {
          if (buttonRef.current?.contains(particleEl)) {
            buttonRef.current.removeChild(particleEl);
          }
        }, 1000);
      }
    });
  }, [particles]);
  
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (to && !disabled) {
      navigate(to);
    }
    if (onClick && !disabled) {
      onClick();
    }
    
    // Create particles
    createParticles(e);
  };

  const buttonContent = (
    <>
      {icon && iconPosition === 'left' && <span className="button-icon">{icon}</span>}
      <ButtonContent $morphText={morphText}>
        <span className="morphText">{children}</span>
      </ButtonContent>
      {icon && iconPosition === 'right' && <span className="button-icon">{icon}</span>}
    </>
  );

  // Use a wrapper div to manage particles
  const ParticleContainer = styled.div`
    position: relative;
    display: inline-block;
  `;

  const buttonProps = {
    $variant: variant,
    $size: size,
    $gradientType: gradientType,
    $fullWidth: fullWidth,
    $hasIcon: hasIcon,
    $iconPosition: iconPosition,
    $particleEffect: particleEffect,
    $morphText: morphText,
    className,
    disabled,
    whileHover: !disabled ? 'hover' : undefined,
    whileTap: !disabled ? 'tap' : undefined,
    variants: buttonVariants,
    onClick: handleClick,
    ...props
  };

  if (to && !disabled) {
    return (
      <ParticleContainer ref={buttonRef}>
        <StyledLink 
          to={to}
          target={target} 
          rel={rel} 
          download={download}
          {...buttonProps}
        >
          {buttonContent}
        </StyledLink>
      </ParticleContainer>
    );
  }

  return (
    <ParticleContainer ref={buttonRef}>
      <StyledButton 
        type={type}
        {...buttonProps}
      >
        {buttonContent}
      </StyledButton>
    </ParticleContainer>
  );
});

Button.displayName = 'Button';

export default Button; 