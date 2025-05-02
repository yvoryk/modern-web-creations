import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Components
import Button from '../components/common/Button';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 10rem;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
  margin: 0;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.text};
  margin: 1.5rem 0;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 2.5rem;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const IllustrationContainer = styled(motion.div)`
  margin-bottom: 2rem;
  max-width: 500px;
  width: 100%;
  
  img {
    width: 100%;
    height: auto;
  }
`;

const NotFoundPage: React.FC = () => {
  return (
    <NotFoundContainer>
      <IllustrationContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" 
          alt="404 Animation"
        />
      </IllustrationContainer>
      
      <ErrorCode
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        404
      </ErrorCode>
      
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Page Not Found
      </Title>
      
      <Description
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Description>
      
      <ButtonGroup
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Button to="/" size="large">
          Go Home
        </Button>
        <Button to="/contact" variant="outline" size="large">
          Contact Us
        </Button>
      </ButtonGroup>
    </NotFoundContainer>
  );
};

export default NotFoundPage; 