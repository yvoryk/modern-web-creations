import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../common';
import { ThemeContext } from '../../context/ThemeContext';
import { useMediaQuery, breakpoints } from '../../hooks/useMediaQuery';

const HeaderContainer = styled.header<{ isFloating: boolean; isMenuOpen: boolean }>`
  position: ${({ isFloating }) => (isFloating ? 'fixed' : 'relative')};
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background: ${({ theme, isFloating }) => 
    isFloating 
      ? `rgba(${theme.header === '#FFFFFF' ? '255, 255, 255' : '10, 26, 47'}, 0.85)`
      : theme.headerBackground};
  backdrop-filter: ${({ isFloating }) => (isFloating ? 'blur(10px)' : 'none')};
  box-shadow: ${({ theme, isFloating }) => (isFloating ? theme.shadowLight : 'none')};
  transition: all 0.3s ease;
  
  ${({ isMenuOpen, theme }) => isMenuOpen && `
    background: ${theme.headerBackground};
    box-shadow: ${theme.shadowLight};
  `}
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.gradientMixed};
    opacity: 0.8;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  
  @media (max-width: 1024px) {
    padding: 0.7rem 1.2rem;
  }
  
  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
  }
`;

const LogoIcon = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 10px;
  background: linear-gradient(135deg, #00bbff 0%, #ffcc00 100%);
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(255, 204, 0, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.8) 0%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(45deg);
    animation: shimmerEffect 3s infinite;
  }
  
  @keyframes shimmerEffect {
    0% { transform: rotate(45deg) translateY(0%); }
    100% { transform: rotate(45deg) translateY(100%); }
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  z-index: 1001;
  display: flex;
  align-items: center;
  font-family: var(--font-modern);
  letter-spacing: -0.02em;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const LogoText = styled.span<{ $color: string }>`
  font-weight: 800;
  color: ${props => props.$color};
  margin-right: 5px;
  position: relative;
  
  &:last-child {
    margin-right: 0;
  }
`;

const LogoBadge = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  color: #333;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 8px;
  transform: rotate(-10deg);
  font-weight: bold;
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  gap: 3px;
`;

const NavLinks = styled.div<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 1024px) {
    gap: 1.5rem;
  }
  
  @media (max-width: 900px) {
    gap: 1rem;
  }
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 280px;
    flex-direction: column;
    gap: 1rem;
    padding: 6rem 2rem;
    align-items: flex-start;
    background: ${({ theme }) => theme.backgroundAlt};
    box-shadow: ${({ theme }) => theme.boxShadow};
    transform: ${({ isOpen }) => isOpen ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
  }
`;

const NavItem = styled(motion.div)`
  position: relative;
  
  @media (max-width: 900px) {
    font-size: 0.95rem;
  }
`;

// Modified to use motion.div for ripple effect
const NavLinkContainer = styled.div`
  position: relative;
  overflow: visible;
  border-radius: 8px;
`;

// Background ripple as a separate component
const NavRipple = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  background: rgba(0, 149, 255, 0.15);
  pointer-events: none;
  z-index: 0;
`;

const NavLink = styled(Link)<{ isActive?: boolean }>`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  position: relative;
  font-family: var(--font-secondary);
  letter-spacing: 0.02em;
  z-index: 1;
  display: block;
  
  @media (max-width: 1024px) {
    padding: 0.5rem 0.6rem;
  }
  
  @media (max-width: 900px) {
    padding: 0.4rem 0.5rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.gradientMixed};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateY(-1px);
    
    &::after {
      transform: scaleX(1);
      transform-origin: left;
    }
  }
  
  ${({ isActive, theme }) => isActive && `
    color: ${theme.primary};
    font-weight: 600;
    
    &::after {
      transform: scaleX(1);
    }
  `}
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 2px;
  background: ${({ theme }) => theme.primary};
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 117, 255, 0.1);
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const ThemeToggleWrapper = styled.div`
  margin-left: 1rem;
  
  @media (max-width: 768px) {
    position: absolute;
    top: 1.5rem;
    right: 5rem;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 75%;
  max-width: 320px;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgroundAlt};
  box-shadow: -2px 0 15px rgba(0, 0, 0, 0.15);
  padding: 2rem;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 480px) {
    width: 85%;
  }
`;

const MobileNavLink = styled(Link)<{ $isActive?: boolean }>`
  margin: 0.8rem 0;
  font-size: 1.2rem;
  color: ${({ theme, $isActive }) => $isActive ? theme.primary : theme.text};
  font-weight: ${({ $isActive }) => $isActive ? '600' : '400'};
  font-family: var(--font-secondary);
  position: relative;
  padding: 0.5rem 0;
  transition: transform 0.2s ease;
  
  &:active {
    transform: scale(0.98);
  }
  
  ${({ $isActive, theme }) => $isActive && `
    background: ${theme.gradientMixed};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
  `}
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.gradientMixed};
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
  }
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  margin-bottom: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 117, 255, 0.1);
    color: ${({ theme }) => theme.primary};
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const MobileMenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.gradientBlue};
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: ${({ isOpen }) => (isOpen ? 0.97 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  backdrop-filter: blur(5px);
`;

const MenuButton = styled.button<{ isOpen: boolean }>`
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1001;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    padding: 2px;
    background: ${({ theme }) => theme.gradientBlue};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const SkipToContent = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: ${({ theme }) => theme.primary};
  color: white;
  padding: 8px 15px;
  z-index: 1001;
  transition: top 0.3s ease;
  
  &:focus {
    top: 0;
  }
`;

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isDarkMode } = useContext(ThemeContext);
  
  // Use the media query hook to check for mobile view
  const isMobile = useMediaQuery(breakpoints.sm);
  const isTablet = useMediaQuery(breakpoints.md);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Close mobile menu when location changes
    setIsOpen(false);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);
  
  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isMobile]);
  
  // Close menu when resizing from mobile to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);
  
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contact' },
    { path: '/speed-test', label: 'SpeedTest' },
  ];
  
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  return (
    <>
      <SkipToContent href="#main-content">Skip to content</SkipToContent>
      <HeaderContainer isFloating={isScrolled} isMenuOpen={isOpen}>
        <Nav>
          <Logo to="/">
            <LogoIcon />
            <LogoText $color="#0095ff">Modern</LogoText>
            <LogoText $color="#00d5ff">Web</LogoText>
            <LogoText $color="#ffcc00">Creations</LogoText>
          </Logo>
          
          <MobileMenuButton onClick={toggleMenu} aria-label="Toggle menu">
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </MobileMenuButton>
          
          <AnimatePresence>
            <NavLinks isOpen={isOpen}>
              {navItems.map((item) => (
                <NavItem 
                  key={item.path}
                  onHoverStart={() => setHoveredItem(item.path)}
                  onHoverEnd={() => setHoveredItem(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }}
                >
                  <NavLinkContainer>
                    <AnimatePresence>
                      {hoveredItem === item.path && (
                        <NavRipple
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </AnimatePresence>
                    <NavLink 
                      to={item.path} 
                      isActive={location.pathname === item.path}
                    >
                      {item.label}
                    </NavLink>
                  </NavLinkContainer>
                  {location.pathname === item.path && !isMobile && (
                    <ActiveIndicator 
                      layoutId="activeIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </NavItem>
              ))}
              
              <ThemeToggleWrapper>
                <ThemeToggle />
              </ThemeToggleWrapper>
            </NavLinks>
          </AnimatePresence>
        </Nav>
        
        <AnimatePresence>
          {isOpen && isMobile && (
            <>
              <Overlay 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
              />
              <MobileMenu
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                exit={{ x: 300 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <CloseButton onClick={toggleMenu} aria-label="Close menu">
                  <FontAwesomeIcon icon={faTimes} />
                </CloseButton>
                {navItems.map((item) => (
                  <MobileNavLink 
                    key={item.path}
                    to={item.path} 
                    $isActive={location.pathname === item.path} 
                    style={{ touchAction: 'manipulation' }}
                    onClick={() => {
                      toggleMenu();
                      setTimeout(() => {
                        window.location.href = item.path;
                      }, 10);
                    }}
                  >
                    {item.label}
                  </MobileNavLink>
                ))}
                <ThemeToggle />
              </MobileMenu>
            </>
          )}
        </AnimatePresence>
      </HeaderContainer>
    </>
  );
};

export default Header; 