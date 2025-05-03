import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn, 
  faGithub 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 5rem 0 2rem;
  color: ${({ theme }) => theme.text};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: ${({ theme }) => theme.primary};
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1rem;
  display: inline-block;
  
  span {
    color: ${({ theme }) => theme.accent};
  }
`;

const FooterText = styled.p`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.textLight};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textLight};
  
  svg {
    width: 20px;
    margin-right: 1rem;
    color: ${({ theme }) => theme.primary};
  }
`;

const FooterLink = styled(Link)`
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.textLight};
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  
  svg {
    opacity: 0;
    margin-left: 0;
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.primary};
    transform: translateX(5px);
    
    svg {
      opacity: 1;
      margin-left: 8px;
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  margin-right: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  margin-top: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.textLight};
  
  a {
    color: ${({ theme }) => theme.primary};
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <Logo to="/">
            Modern<span>Web</span>
          </Logo>
          <FooterText>
            We build stunning, high-performance websites tailored to your business needs. Our focus is on creating modern web experiences that drive results.
          </FooterText>
          <SocialIcons>
            <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </SocialIcon>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </SocialIcon>
            <SocialIcon href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </SocialIcon>
          </SocialIcons>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLink to="/">
            Home <FontAwesomeIcon icon={faArrowRight} />
          </FooterLink>
          <FooterLink to="/services" onClick={(e) => e.currentTarget.click()}>
            Services <FontAwesomeIcon icon={faArrowRight} />
          </FooterLink>
          <FooterLink to="/portfolio" onClick={(e) => e.currentTarget.click()}>
            Portfolio <FontAwesomeIcon icon={faArrowRight} />
          </FooterLink>
          <FooterLink to="/about" onClick={(e) => e.currentTarget.click()}>
            About Us <FontAwesomeIcon icon={faArrowRight} />
          </FooterLink>
          <FooterLink to="/contact" onClick={(e) => e.currentTarget.click()}>
            Contact <FontAwesomeIcon icon={faArrowRight} />
          </FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Services</FooterHeading>
          <FooterLink to="/services" onClick={(e) => e.currentTarget.click()}>
            Website Design <FontAwesomeIcon icon={faArrowRight} />
          </FooterLink>
          <FooterLink to="/services" onClick={(e) => e.currentTarget.click()}>
            Website Development <FontAwesomeIcon icon={faArrowRight} />
          </FooterLink>
          <FooterLink to="/services" onClick={(e) => e.currentTarget.click()}>
            E-Commerce Solutions <FontAwesomeIcon icon={faArrowRight} />
          </FooterLink>
          <FooterLink to="/services" onClick={(e) => e.currentTarget.click()}>
            Website Redesign <FontAwesomeIcon icon={faArrowRight} />
          </FooterLink>
          <FooterLink to="/services" onClick={(e) => e.currentTarget.click()}>
            SEO Optimization <FontAwesomeIcon icon={faArrowRight} />
          </FooterLink>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Contact Info</FooterHeading>
          <ContactItem>
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span>Florida, USA</span>
          </ContactItem>
          <ContactItem>
            <FontAwesomeIcon icon={faPhone} />
            <span>+1 (727) 623-3424</span>
          </ContactItem>
          <ContactItem>
            <FontAwesomeIcon icon={faEnvelope} />
            <span>web.creations@gmail.com</span>
          </ContactItem>
          <FooterText style={{ marginTop: '1rem' }}>
            Have a project in mind? Contact us today for a free consultation!
          </FooterText>
        </FooterColumn>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} Modern Web Creations. All Rights Reserved. | 
        Owner: Yaroslav Voryk | Designed with <span style={{ color: 'red' }}>♥</span> by <a href="/">ModernWeb</a>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 