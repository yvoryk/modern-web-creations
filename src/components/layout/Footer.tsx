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

// Wrapper div for the link to ensure proper spacing
const FooterLinkWrapper = styled.div`
  margin-bottom: 0.8rem;
  display: flex;
  position: relative;
  padding: 0.2rem 0;
`;

// The actual link component with modified behavior
const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.textLight};
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  
  @media (max-width: 768px) {
    /* Remove extra padding to make tap target more precise */
    padding: 0.2rem 0;
    display: inline;
  }
  
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

// Invisible touch area that prevents accidental taps (mobile only)
const TouchBarrier = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }
`;

// Span that wraps the text content and is the actual clickable part
const LinkText = styled.span`
  position: relative;
  z-index: 2;
  pointer-events: auto;
  
  @media (max-width: 768px) {
    /* Slight padding to create a better touch target for the text only */
    padding: 0.4rem 0.1rem;
    /* Apply a safe touch area around the text only */
    display: inline-block;
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
  // Function to handle mobile link clicks that only activates when clicking on the text
  const handleMobileLinkClick = (
    e: React.MouseEvent | React.TouchEvent,
    path: string
  ) => {
    // Check if the click event target is exactly the linkText or its children
    const target = e.target as HTMLElement;
    const isLinkTextClicked = 
      target.classList.contains('link-text') || 
      target.closest('.link-text');
    
    if (!isLinkTextClicked) {
      // Prevent navigation if clicked outside the text
      e.preventDefault();
      return;
    }
    
    // Otherwise, navigate to the path
    window.location.href = path;
  };

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
          
          <FooterLinkWrapper>
            <TouchBarrier />
            <FooterLink 
              to="/" 
              onClick={(e) => handleMobileLinkClick(e, "/")}
              style={{ touchAction: 'manipulation' }}
            >
              <LinkText className="link-text">Home</LinkText> <FontAwesomeIcon icon={faArrowRight} />
            </FooterLink>
          </FooterLinkWrapper>
          
          <FooterLinkWrapper>
            <TouchBarrier />
            <FooterLink 
              to="/services" 
              onClick={(e) => handleMobileLinkClick(e, "/services")}
              style={{ touchAction: 'manipulation' }}
            >
              <LinkText className="link-text">Services</LinkText> <FontAwesomeIcon icon={faArrowRight} />
            </FooterLink>
          </FooterLinkWrapper>
          
          <FooterLinkWrapper>
            <TouchBarrier />
            <FooterLink 
              to="/portfolio" 
              onClick={(e) => handleMobileLinkClick(e, "/portfolio")}
              style={{ touchAction: 'manipulation' }}
            >
              <LinkText className="link-text">Portfolio</LinkText> <FontAwesomeIcon icon={faArrowRight} />
            </FooterLink>
          </FooterLinkWrapper>
          
          <FooterLinkWrapper>
            <TouchBarrier />
            <FooterLink 
              to="/about" 
              onClick={(e) => handleMobileLinkClick(e, "/about")}
              style={{ touchAction: 'manipulation' }}
            >
              <LinkText className="link-text">About Us</LinkText> <FontAwesomeIcon icon={faArrowRight} />
            </FooterLink>
          </FooterLinkWrapper>
          
          <FooterLinkWrapper>
            <TouchBarrier />
            <FooterLink 
              to="/contact" 
              onClick={(e) => handleMobileLinkClick(e, "/contact")}
              style={{ touchAction: 'manipulation' }}
            >
              <LinkText className="link-text">Contact</LinkText> <FontAwesomeIcon icon={faArrowRight} />
            </FooterLink>
          </FooterLinkWrapper>
        </FooterColumn>
        
        <FooterColumn>
          <FooterHeading>Services</FooterHeading>
          
          <FooterLinkWrapper>
            <TouchBarrier />
            <FooterLink 
              to="/services" 
              onClick={(e) => handleMobileLinkClick(e, "/services")}
              style={{ touchAction: 'manipulation' }}
            >
              <LinkText className="link-text">Website Design</LinkText> <FontAwesomeIcon icon={faArrowRight} />
            </FooterLink>
          </FooterLinkWrapper>
          
          <FooterLinkWrapper>
            <TouchBarrier />
            <FooterLink 
              to="/services" 
              onClick={(e) => handleMobileLinkClick(e, "/services")}
              style={{ touchAction: 'manipulation' }}
            >
              <LinkText className="link-text">Website Development</LinkText> <FontAwesomeIcon icon={faArrowRight} />
            </FooterLink>
          </FooterLinkWrapper>
          
          <FooterLinkWrapper>
            <TouchBarrier />
            <FooterLink 
              to="/services" 
              onClick={(e) => handleMobileLinkClick(e, "/services")}
              style={{ touchAction: 'manipulation' }}
            >
              <LinkText className="link-text">E-Commerce Solutions</LinkText> <FontAwesomeIcon icon={faArrowRight} />
            </FooterLink>
          </FooterLinkWrapper>
          
          <FooterLinkWrapper>
            <TouchBarrier />
            <FooterLink 
              to="/services" 
              onClick={(e) => handleMobileLinkClick(e, "/services")}
              style={{ touchAction: 'manipulation' }}
            >
              <LinkText className="link-text">Website Redesign</LinkText> <FontAwesomeIcon icon={faArrowRight} />
            </FooterLink>
          </FooterLinkWrapper>
          
          <FooterLinkWrapper>
            <TouchBarrier />
            <FooterLink 
              to="/services" 
              onClick={(e) => handleMobileLinkClick(e, "/services")}
              style={{ touchAction: 'manipulation' }}
            >
              <LinkText className="link-text">SEO Optimization</LinkText> <FontAwesomeIcon icon={faArrowRight} />
            </FooterLink>
          </FooterLinkWrapper>
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