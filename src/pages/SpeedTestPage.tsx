import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faLightbulb, faArrowRight, faBolt, faSpinner } from '@fortawesome/free-solid-svg-icons';

// Components
import { SpeedTestTool } from '../components/common';
import Section from '../components/common/Section';

// Page Hero
const PageHero = styled.div`
  background: ${({ theme }) => theme.gradientMixed};
  padding: 8rem 0 5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    z-index: 0;
    filter: blur(80px);
    opacity: 0.15;
  }
  
  &::before {
    background: ${({ theme }) => theme.primary};
    top: -80px;
    left: -50px;
  }
  
  &::after {
    background: ${({ theme }) => theme.secondary};
    bottom: -100px;
    right: -100px;
  }
  
  .radial-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 70% 30%, rgba(255, 210, 0, 0.1) 0%, rgba(0, 117, 255, 0.05) 50%, rgba(0, 0, 0, 0) 70%);
    pointer-events: none;
  }
  
  .gradient-line {
    position: absolute;
    height: 3px;
    background: linear-gradient(90deg, transparent, ${({ theme }) => theme.secondary}, transparent);
    width: 80%;
    bottom: 0;
    left: 10%;
    opacity: 0.4;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
`;

const PageTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: linear-gradient(to right, ${({ theme }) => theme.text}, ${({ theme }) => theme.primary});
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  
  svg {
    color: ${({ theme }) => theme.secondary};
    filter: drop-shadow(0 0 8px ${({ theme }) => theme.secondary}40);
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 4px;
    background: ${({ theme }) => theme.gradientYellow};
    border-radius: 4px;
  }
`;

const PageDescription = styled(motion.p)`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  color: ${({ theme }) => theme.textLight};
  position: relative;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FloatingIcon = styled(motion.div)<{ $top?: string, $left?: string, $right?: string, $color: string, $size?: string, $delay?: number }>`
  position: absolute;
  top: ${props => props.$top || 'auto'};
  left: ${props => props.$left || 'auto'};
  right: ${props => props.$right || 'auto'};
  color: ${props => props.$color};
  font-size: ${props => props.$size || '1.5rem'};
  opacity: 0.5;
  z-index: 0;
  filter: drop-shadow(0 0 10px ${props => props.$color}50);
`;

const InfoSection = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const InfoContent = styled.div`
  position: relative;
  z-index: 1;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.text};
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    svg {
      color: ${({ theme }) => theme.secondary};
      filter: drop-shadow(0 0 5px ${({ theme }) => theme.secondary}40);
    }
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.textLight};
    line-height: 1.8;
  }
`;

const InfoImage = styled.div`
  position: relative;
  z-index: 1;
  
  img {
    width: 100%;
    border-radius: 12px;
    box-shadow: ${({ theme }) => theme.shadow};
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    }
  }
  
  @media (max-width: 992px) {
    order: -1;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100px;
    height: 100px;
    background: ${({ theme }) => theme.gradientYellow};
    z-index: -1;
    border-radius: 12px;
    opacity: 0.3;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    right: -20px;
    width: 100px;
    height: 100px;
    background: ${({ theme }) => theme.gradientBlue};
    z-index: -1;
    border-radius: 12px;
    opacity: 0.3;
  }
`;

const FeatureList = styled.ul`
  margin-top: 1.5rem;
  padding-left: 0;
  list-style-type: none;
`;

const FeatureItem = styled.li`
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  position: relative;
  padding-left: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.secondary};
    border-radius: 50%;
    box-shadow: 0 0 8px ${({ theme }) => theme.secondary}80;
  }
  
  strong {
    color: ${({ theme }) => theme.text};
    position: relative;
    background: linear-gradient(to right, ${({ theme }) => theme.text}, ${({ theme }) => theme.primary}80);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: ${({ theme }) => theme.gradientBlue};
      opacity: 0.5;
    }
  }
`;

const HighlightedSection = styled(Section)`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.backgroundAlt};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      linear-gradient(135deg, ${({ theme }) => theme.primary}05 25%, transparent 25%) -50px 0,
      linear-gradient(225deg, ${({ theme }) => theme.primary}05 25%, transparent 25%) -50px 0,
      linear-gradient(315deg, ${({ theme }) => theme.primary}05 25%, transparent 25%),
      linear-gradient(45deg, ${({ theme }) => theme.primary}05 25%, transparent 25%);
    background-size: 100px 100px;
    opacity: 0.8;
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: ${({ theme }) => theme.gradientMixed};
  }
  
  .content-wrapper {
    position: relative;
    z-index: 1;
  }
  
  .glow-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    z-index: 0;
    
    &.blue {
      width: 300px;
      height: 300px;
      background: ${({ theme }) => theme.primary};
      opacity: 0.1;
      top: -150px;
      right: 10%;
    }
    
    &.yellow {
      width: 200px;
      height: 200px;
      background: ${({ theme }) => theme.secondary};
      opacity: 0.1;
      bottom: -100px;
      left: 15%;
    }
  }
`;

const GradientButton = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.gradientMixed};
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  gap: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(4px);
  }
`;

const floatingIconVariants = {
  animate: (custom: number) => ({
    y: [0, -10, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
      delay: custom,
    },
  }),
};

const SpeedTestPage: React.FC = () => {
  return (
    <>
      <PageHero>
        <div className="radial-overlay"></div>
        <HeroContent className="container">
          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FontAwesomeIcon icon={faRocket} /> Website Speed Test
          </PageTitle>
          <PageDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Test your website's performance and discover how to improve your loading speed, user experience, and SEO.
          </PageDescription>
          
          <FloatingIcon 
            $top="20%" 
            $left="15%" 
            $color="#0075FF80" 
            $size="1.5rem"
            $delay={0.5}
            variants={floatingIconVariants}
            animate="animate"
            custom={0}
          >
            <FontAwesomeIcon icon={faRocket} />
          </FloatingIcon>
          
          <FloatingIcon 
            $top="40%" 
            $right="20%" 
            $color="#FFD20080" 
            $size="2rem"
            $delay={1.2}
            variants={floatingIconVariants}
            animate="animate"
            custom={1.2}
          >
            <FontAwesomeIcon icon={faBolt} />
          </FloatingIcon>
          
          <FloatingIcon 
            $top="70%" 
            $left="25%" 
            $color="#0075FF70" 
            $size="1.2rem"
            $delay={0.8}
            variants={floatingIconVariants}
            animate="animate"
            custom={0.8}
          >
            <FontAwesomeIcon icon={faSpinner} />
          </FloatingIcon>
        </HeroContent>
        <div className="gradient-line"></div>
      </PageHero>
      
      <Section>
        <SpeedTestTool />
      </Section>
      
      <Section title="Why Website Speed Matters" subtitle="The impact of performance on user experience and business metrics" centered>
        <InfoSection>
          <InfoContent>
            <p>
              In today's fast-paced digital world, users expect websites to load quickly and respond immediately to their interactions. Website speed is not just a technical consideration—it's a critical factor that affects user experience, conversion rates, and even search engine rankings.
            </p>
            <p>
              Studies have consistently shown that even small delays in page load time can lead to significant increases in bounce rates and decreases in user engagement. Google has also made page speed a ranking factor for both desktop and mobile searches.
            </p>
            <FeatureList>
              <FeatureItem>
                <strong>User Experience:</strong> 53% of mobile site visitors leave a page that takes longer than 3 seconds to load.
              </FeatureItem>
              <FeatureItem>
                <strong>Conversion Rates:</strong> A 1-second delay in page response can result in a 7% reduction in conversions.
              </FeatureItem>
              <FeatureItem>
                <strong>SEO Performance:</strong> Faster sites rank higher in search results, leading to more organic traffic.
              </FeatureItem>
              <FeatureItem>
                <strong>Brand Perception:</strong> A fast, responsive website creates a positive impression of your brand and builds user trust.
              </FeatureItem>
            </FeatureList>
          </InfoContent>
          <InfoImage>
            <motion.img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
              alt="Website speed and performance analytics"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            />
          </InfoImage>
        </InfoSection>
      </Section>
      
      <HighlightedSection title="Our Performance Optimization Services" subtitle="Let us help you build a faster, more efficient website" centered light={false}>
        <div className="glow-orb blue"></div>
        <div className="glow-orb yellow"></div>
        <div className="content-wrapper">
          <InfoSection>
            <InfoImage>
              <motion.img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                alt="Website optimization services"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              />
            </InfoImage>
            <InfoContent>
              <h2>
                <FontAwesomeIcon icon={faLightbulb} />
                Expert Optimization
              </h2>
              <p>
                At Modern Web Creations, we specialize in optimizing website performance to deliver the best possible user experience. Our team of experts can analyze your existing website and implement proven strategies to improve loading times and overall performance.
              </p>
              <FeatureList>
                <FeatureItem>
                  <strong>Performance Audit:</strong> Comprehensive analysis of your website's current performance metrics and identification of bottlenecks.
                </FeatureItem>
                <FeatureItem>
                  <strong>Code Optimization:</strong> Streamlining HTML, CSS, and JavaScript to reduce file sizes and improve rendering times.
                </FeatureItem>
                <FeatureItem>
                  <strong>Image Optimization:</strong> Implementing modern image formats, compression techniques, and lazy loading strategies.
                </FeatureItem>
                <FeatureItem>
                  <strong>Server Optimization:</strong> Configuring caching, compression, and content delivery networks (CDNs) to serve content faster.
                </FeatureItem>
                <FeatureItem>
                  <strong>Core Web Vitals Optimization:</strong> Focusing on the metrics that matter most for search rankings and user experience.
                </FeatureItem>
              </FeatureList>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{ 
                  marginTop: '2rem',
                  textAlign: 'center'
                }}
              >
                <GradientButton href="/contact">
                  Get Started Today <FontAwesomeIcon icon={faArrowRight} />
                </GradientButton>
              </motion.div>
            </InfoContent>
          </InfoSection>
        </div>
      </HighlightedSection>
    </>
  );
};

export default SpeedTestPage; 