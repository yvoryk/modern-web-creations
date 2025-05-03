import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import GlobalStyle from './styles/GlobalStyle';
import { Header, Footer } from './components/layout';
import styled, { keyframes } from 'styled-components';
import BackToTop from './components/common/BackToTop';
import { 
  CustomCursor, 
  PageTransition, 
  ScrollIndicator,
  ChatWidget 
} from './components/common';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage').then(module => ({ default: module.default })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(module => ({ default: module.default })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(module => ({ default: module.default })));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.default })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(module => ({ default: module.default })));
const SpeedTestPage = lazy(() => import('./pages/SpeedTestPage').then(module => ({ default: module.default })));
const CommentsPage = lazy(() => import('./pages/CommentsPage'));

// Loading component for suspense fallback
const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
  
  &:after {
    content: '';
    width: 50px;
    height: 50px;
    border: 5px solid ${({ theme }) => theme.backgroundAlt};
    border-top-color: ${({ theme }) => theme.primary};
    border-radius: 50%;
    animation: spinner 1s ease-in-out infinite;
  }
  
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

const gradientMove = keyframes`
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
    opacity: 0.1;
    transform: scale(1);
  }
  50% {
    opacity: 0.2;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.1;
    transform: scale(1);
  }
`;

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: fixed;
    top: -150px;
    right: -150px;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: ${({ theme }) => theme.gradientBlue};
    opacity: 0.15;
    filter: blur(120px);
    z-index: -1;
    animation: ${gradientMove} 40s ease infinite;
    will-change: transform;
  }
  
  &::after {
    content: '';
    position: fixed;
    bottom: -150px;
    left: -150px;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: ${({ theme }) => theme.gradientYellow};
    opacity: 0.15;
    filter: blur(120px);
    z-index: -1;
    animation: ${gradientMove} 40s ease infinite reverse;
    will-change: transform;
  }
`;

const GradientOrb = styled.div`
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(80px);
  z-index: -1;
  animation: ${pulse} 25s ease infinite alternate;
  will-change: transform, opacity;
  
  &.orb-1 {
    top: 40%;
    right: 5%;
    background: ${({ theme }) => theme.gradientPurple};
  }
  
  &.orb-2 {
    top: 60%;
    left: 10%;
    background: ${({ theme }) => theme.gradientCyan};
    animation-delay: 5s;
  }
`;

const BackgroundGradient = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.02) 0%,
    rgba(100, 100, 255, 0.03) 25%,
    rgba(200, 200, 255, 0.02) 50%,
    rgba(255, 200, 100, 0.03) 75%,
    rgba(255, 255, 255, 0.02) 100%
  );
  background-size: 400% 400%;
  animation: ${gradientMove} 60s linear infinite;
  z-index: -2;
  will-change: background-position;
`;

const App: React.FC = () => {
  useEffect(() => {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLAnchorElement;
        const href = target.getAttribute('href');
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', () => {});
      });
    };
  }, []);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <AppContainer>
        <BackgroundGradient />
        <GradientOrb className="orb-1" />
        <GradientOrb className="orb-2" />
        <CustomCursor />
        <ScrollIndicator position="top" />
        <ChatWidget 
          ownerEmail="contact@modernwebcreations.com"
          ownerPhone="+17276233424"
        />
        <Header />
        <AnimatePresence mode="wait">
          <Suspense fallback={<LoadingSpinner />}>
            <main id="main-content">
              <Routes>
                <Route path="/" element={
                  <PageTransition>
                    <HomePage />
                  </PageTransition>
                } />
                <Route path="/about" element={
                  <PageTransition>
                    <AboutPage />
                  </PageTransition>
                } />
                <Route path="/services" element={
                  <PageTransition>
                    <ServicesPage />
                  </PageTransition>
                } />
                <Route path="/portfolio" element={
                  <PageTransition>
                    <PortfolioPage />
                  </PageTransition>
                } />
                <Route path="/contact" element={
                  <PageTransition>
                    <ContactPage />
                  </PageTransition>
                } />
                <Route path="/speed-test" element={
                  <PageTransition>
                    <SpeedTestPage />
                  </PageTransition>
                } />
                <Route path="/comments" element={
                  <PageTransition>
                    <CommentsPage />
                  </PageTransition>
                } />
                <Route path="*" element={
                  <PageTransition>
                    <NotFoundPage />
                  </PageTransition>
                } />
              </Routes>
            </main>
          </Suspense>
        </AnimatePresence>
        <BackToTop />
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
