import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptopCode, 
  faPaintBrush, 
  faShoppingCart, 
  faSearch, 
  faRocket, 
  faChartLine, 
  faArrowRight,
  faStar
} from '@fortawesome/free-solid-svg-icons';

// Components
import { Section, Button, GradientText, Image } from '../components/common';
import Card from '../components/common/Card';

// Lazy-loaded components
const AnimatedHeading = lazy(() => import('../components/common/AnimatedHeading').then(module => ({ default: module.default })));

// Hero Section
const HeroSection = styled.section`
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.background};
  overflow: hidden;
  
  @media (max-width: 768px) {
    min-height: 600px;
    height: auto;
    padding: 120px 0 80px;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const HeroText = styled.div`
  text-align: center;
  max-width: 800px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  
  span {
    color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.textLight};
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
  }
`;

const HeroImage = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  
  img {
    max-width: 550px;
    width: 100%;
  }
  
  @media (max-width: 992px) {
    justify-content: center;
    
    img {
      max-width: 450px;
    }
  }
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
  
  .shape1 {
    position: absolute;
    top: -100px;
    right: -100px;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: linear-gradient(45deg, ${({ theme }) => theme.primaryLight}22, ${({ theme }) => theme.primary}22);
  }
  
  .shape2 {
    position: absolute;
    bottom: -150px;
    left: -150px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: linear-gradient(45deg, ${({ theme }) => theme.secondary}22, ${({ theme }) => theme.secondaryHover}22);
  }
`;

// Services Section
const ServicesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

// Portfolio Section
const PortfolioGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const PortfolioViewAll = styled(motion.div)`
  text-align: center;
  margin-top: 3rem;
`;

// Testimonials
const TestimonialsWrapper = styled.div`
  padding: 2rem 0;
`;

const TestimonialCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.background};
  padding: 2rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  margin: 2rem 0;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-size: 5rem;
    line-height: 1;
    color: ${({ theme }) => theme.primary}22;
    font-family: Georgia, serif;
  }
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const TestimonialAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
`;

const TestimonialInfo = styled.div``;

const TestimonialName = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
`;

const TestimonialCompany = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textLight};
`;

const TestimonialRating = styled.div`
  color: ${({ theme }) => theme.accent};
  margin-top: 0.5rem;
`;

// CTA Section
const CTAWrapper = styled.div`
  background-color: ${({ theme }) => theme.primary};
  padding: 4rem 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const CTATitle = styled.h2`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CTAText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto 2rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const FeatureImage = styled.div`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  
  @media (max-width: 992px) {
    margin-top: 20px;
    width: 100%;
  }
`;

// Fallback component for lazy loading
const LoadingFallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  font-size: 18px;
  opacity: 0.8;
`;

const HomePage: React.FC = () => {
  const services = [
    {
      icon: <FontAwesomeIcon icon={faLaptopCode} />,
      title: 'Web Development',
      subtitle: 'Professional, responsive websites built with modern technologies.',
      description: 'We create custom, responsive websites using the latest technologies like React, Next.js, and more. Our sites are optimized for performance and SEO.'
    },
    {
      icon: <FontAwesomeIcon icon={faPaintBrush} />,
      title: 'Web Design',
      subtitle: 'Beautiful, user-friendly designs tailored to your brand.',
      description: 'Our design team creates stunning visuals and intuitive interfaces that represent your brand and engage your audience.'
    },
    {
      icon: <FontAwesomeIcon icon={faShoppingCart} />,
      title: 'E-Commerce Solutions',
      subtitle: 'Powerful online stores to grow your business.',
      description: 'Build a powerful online store with secure payment processing, inventory management, and a seamless checkout experience.'
    },
    {
      icon: <FontAwesomeIcon icon={faRocket} />,
      title: 'Website Redesign',
      subtitle: 'Transform your outdated website into a modern masterpiece.',
      description: "We'll transform your outdated website into a modern, high-performing digital platform that drives results."
    },
    {
      icon: <FontAwesomeIcon icon={faSearch} />,
      title: 'SEO Optimization',
      subtitle: 'Improve your visibility and reach more customers.',
      description: "Our SEO services help improve your website's visibility in search engines, driving more organic traffic to your business."
    },
    {
      icon: <FontAwesomeIcon icon={faChartLine} />,
      title: 'Performance Optimization',
      subtitle: 'Speed up your site for better user experience and SEO.',
      description: "We optimize your website's performance for faster loading times, better user experience, and improved search engine rankings."
    }
  ];
  
  const projects = [
    {
      title: 'E-Commerce Platform',
      subtitle: 'Full-stack development',
      image: 'https://images.unsplash.com/photo-1629118236741-a41fa7ff2e80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Corporate Website',
      subtitle: 'Web design & development',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      title: 'Mobile App Interface',
      subtitle: 'UI/UX design',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];
  
  const testimonials = [
    // Empty array - testimonials removed
  ];
  
  return (
    <>
      <HeroSection>
        <BackgroundShapes>
          <div className="shape1"></div>
          <div className="shape2"></div>
        </BackgroundShapes>
        
        <HeroContent>
          <HeroText>
            <Suspense fallback={<LoadingFallback>Loading...</LoadingFallback>}>
              <AnimatedHeading
                level="h1"
                gradient="rainbow"
                fontSize="4rem"
                fontWeight={800}
                letterSpacing="-0.02em"
              >
                Modern Web Solutions for Your Business
              </AnimatedHeading>
            </Suspense>
            <HeroSubtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We create stunning, high-performance websites and web applications that help your business grow.
            </HeroSubtitle>
            <HeroButtons
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <Button 
                variant="gradient" 
                gradientType="rainbow" 
                size="large"
                to="/contact"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="large"
                to="/portfolio"
              >
                View Our Work
              </Button>
            </HeroButtons>
          </HeroText>
        </HeroContent>
      </HeroSection>
      
      <Section 
        title="Our Services" 
        subtitle="We offer a wide range of web development and design services"
        centered
      >
        <ServicesGrid
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card hoverable>
            <div>
              <FontAwesomeIcon icon={faPaintBrush} style={{ 
                fontSize: "2.5rem", 
                marginBottom: "1rem", 
                color: "#FF5F6D",
                filter: "drop-shadow(0 4px 6px rgba(255, 95, 109, 0.3))"
              }} />
              <h3>Web Design</h3>
              <p>Stunning, eye-catching designs that captivate your audience and reflect your brand's unique identity and values.</p>
            </div>
          </Card>
          <Card hoverable>
            <div>
              <FontAwesomeIcon icon={faLaptopCode} style={{ 
                fontSize: "2.5rem", 
                marginBottom: "1rem", 
                color: "#4158D0",
                filter: "drop-shadow(0 4px 6px rgba(65, 88, 208, 0.3))"
              }} />
              <h3>Web Development</h3>
              <p>Custom-built, high-performance solutions using cutting-edge technology that deliver exceptional user experience and results.</p>
            </div>
          </Card>
          <Card hoverable>
            <div>
              <FontAwesomeIcon icon={faShoppingCart} style={{ 
                fontSize: "2.5rem", 
                marginBottom: "1rem", 
                color: "#00C9A7",
                filter: "drop-shadow(0 4px 6px rgba(0, 201, 167, 0.3))"
              }} />
              <h3>E-Commerce</h3>
              <p>100% satisfaction guarantee or you pay nothing. Built to convert visitors into loyal customers and maximize your sales.</p>
            </div>
          </Card>
          <Card hoverable>
            <div>
              <FontAwesomeIcon icon={faSearch} style={{ 
                fontSize: "2.5rem", 
                marginBottom: "1rem", 
                color: "#FF8B22",
                filter: "drop-shadow(0 4px 6px rgba(255, 139, 34, 0.3))"
              }} />
              <h3>SEO</h3>
              <p>Dominate search results with our proven strategies that increase your visibility, drive targeted traffic, and grow your business.</p>
            </div>
          </Card>
          <Card hoverable>
            <div>
              <FontAwesomeIcon icon={faRocket} style={{ 
                fontSize: "2.5rem", 
                marginBottom: "1rem", 
                color: "#8E2DE2",
                filter: "drop-shadow(0 4px 6px rgba(142, 45, 226, 0.3))"
              }} />
              <h3>Performance Optimization</h3>
              <p>Lightning-fast loading times and smooth performance that keep visitors engaged and improve your conversion rates significantly.</p>
            </div>
          </Card>
          <Card hoverable>
            <div>
              <FontAwesomeIcon icon={faChartLine} style={{ 
                fontSize: "2.5rem", 
                marginBottom: "1rem", 
                color: "#3498DB", 
                filter: "drop-shadow(0 4px 6px rgba(52, 152, 219, 0.3))"
              }} />
              <h3>Digital Marketing</h3>
              <p>Cross-platform excellence guaranteed - our websites and apps work flawlessly on all devices, from desktops to smartphones.</p>
            </div>
            </Card>
        </ServicesGrid>
      </Section>
      
      <Section 
        title="Featured Projects" 
        subtitle="Take a look at some of our recent work that showcases our expertise and capabilities."
        centered
        light={false}
      >
        <PortfolioGrid
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link to={`/portfolio/${project.title.replace(/\s+/g, '-').toLowerCase()}`} style={{ textDecoration: 'none' }}>
                <Card
              image={project.image}
                  hoverable
                >
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                </Card>
              </Link>
            </motion.div>
          ))}
        </PortfolioGrid>
        
        <PortfolioViewAll
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button 
            variant="gradient" 
            gradientType="blue"
            size="medium"
            to="/portfolio"
          >
            View All Projects
          </Button>
        </PortfolioViewAll>
      </Section>
      
      <Section 
        title={
          <Link to="/comments" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            What Our Clients Say
          </Link>
        }
        subtitle="Don't just take our word for it - hear from some of our satisfied clients about their experience working with us."
        centered
      >
        <TestimonialsWrapper>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', padding: '2rem 0' }}
          >
            <p>View our testimonials page to read feedback from our clients.</p>
          </motion.div>
        </TestimonialsWrapper>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button 
            variant="gradient" 
            gradientType="blue"
            size="medium"
            to="/comments"
            icon={<FontAwesomeIcon icon={faArrowRight} />}
            iconPosition="right"
          >
            Read More Testimonials
          </Button>
        </div>
      </Section>
      
      <Section>
        <CTAWrapper>
          <CTATitle>Ready to Transform Your Web Presence?</CTATitle>
          <CTAText>
            Let's work together to create a website that not only looks great but also drives results for your business.
          </CTAText>
          <Button size="large" variant="solid">
            Get a Free Consultation
          </Button>
        </CTAWrapper>
      </Section>
    </>
  );
};

export default HomePage; 