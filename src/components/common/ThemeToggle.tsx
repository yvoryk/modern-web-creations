import React, { useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ThemeContext } from '../../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 2px;
  position: relative;
  width: 60px;
  height: 30px;
  z-index: 999;
  overflow: hidden;
`;

const SunIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.yellow};
  transition: all 0.3s linear;
`;

const MoonIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.blue};
  transition: all 0.3s linear;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
`;

const ToggleCircle = styled(motion.div)`
  background: ${({ theme }) => theme.background};
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  height: 22px;
  width: 22px;
  transform: translateX(0);
`;

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <ToggleContainer onClick={toggleTheme}>
      <IconWrapper>
        <SunIcon icon={faSun} />
      </IconWrapper>
      <IconWrapper>
        <MoonIcon icon={faMoon} />
      </IconWrapper>
      <ToggleCircle
        animate={{ 
          x: isDarkMode ? 30 : 0,
          transition: { type: "spring", stiffness: 700, damping: 30 }
        }}
      />
    </ToggleContainer>
  );
};

export default ThemeToggle; 