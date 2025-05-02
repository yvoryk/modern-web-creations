import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptopCode, 
  faPaintBrush, 
  faShoppingCart, 
  faSearch, 
  faRocket, 
  faChartLine,
  faCode,
  faMobileAlt,
  faServer,
  faLock
} from '@fortawesome/free-solid-svg-icons';

// Components
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

// Page Hero
const PageHero = styled.div`
  background-color: ${({ theme }) => theme.cardBackground};
  padding: 8rem 0 5rem;
  text-align: center;
`;

const PageTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageDescription = styled(motion.p)`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  color: ${({ theme }) => theme.textLight};
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Service Category
const ServiceCategory = styled.div`
  margin-bottom: 5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${({ theme }) => theme.primary};
  }
`;

const ServicesGrid = styled.div`
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

// Pricing
const PricingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PricingCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.background};
  padding: 3rem 2rem;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow};
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  &.popular {
    border-top: 4px solid ${({ theme }) => theme.primary};
    transform: scale(1.05);
    
    @media (max-width: 992px) {
      transform: scale(1);
    }
    
    &::before {
      content: 'Most Popular';
      position: absolute;
      top: 15px;
      right: -35px;
      background-color: ${({ theme }) => theme.primary};
      color: white;
      padding: 0.25rem 3rem;
      transform: rotate(45deg);
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
`;

const PricingTitle = styled.h3`
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const PriceAmount = styled.div`
  font-size: 4rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
  
  span {
    font-size: 1.25rem;
    font-weight: 400;
    color: ${({ theme }) => theme.textLight};
  }
`;

const PricingDescription = styled.p`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.textLight};
`;

const PricingFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  
  li {
    padding: 0.75rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

// FAQ Section
const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const FAQQuestion = styled.h3`
  font-size: 1.1rem;
  padding: 1.5rem;
  margin: 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.text};
  
  &::after {
    content: '+';
    font-size: 1.5rem;
    color: ${({ theme }) => theme.primary};
  }
  
  &.active {
    &::after {
      content: '-';
    }
  }
`;

const FAQAnswer = styled.div`
  padding: 0 1.5rem 1.5rem;
  color: ${({ theme }) => theme.textLight};
`;

// Add a styled Button with margin top
const LearnMoreButton = styled(Button)`
  margin-top: 1rem;
`;

const ServicesPage: React.FC = () => {
  const mainServices = [
    {
      icon: <FontAwesomeIcon icon={faLaptopCode} />,
      title: 'Custom Web Development',
      description: 'We build custom websites tailored to your specific business needs using the latest technologies like React, Next.js, and more.'
    },
    {
      icon: <FontAwesomeIcon icon={faPaintBrush} />,
      title: 'Web Design',
      description: 'Our design team creates stunning, user-friendly designs that reflect your brand identity and engage your visitors.'
    },
    {
      icon: <FontAwesomeIcon icon={faShoppingCart} />,
      title: 'E-Commerce Solutions',
      description: 'We build powerful online stores with secure payment processing, inventory management, and seamless checkout experiences.'
    }
  ];
  
  const specializedServices = [
    {
      icon: <FontAwesomeIcon icon={faRocket} />,
      title: 'Website Redesign',
      description: 'Transform your outdated website into a modern, high-performing digital platform that drives results for your business.'
    },
    {
      icon: <FontAwesomeIcon icon={faSearch} />,
      title: 'SEO Optimization',
      description: "Improve your website's visibility in search engines with our comprehensive SEO services, driving more organic traffic to your business."
    },
    {
      icon: <FontAwesomeIcon icon={faChartLine} />,
      title: 'Performance Optimization',
      description: 'Speed up your website with our performance optimization services for faster loading times and improved user experience.'
    }
  ];
  
  const additionalServices = [
    {
      icon: <FontAwesomeIcon icon={faCode} />,
      title: 'Front-end Development',
      description: 'We create responsive and interactive user interfaces using modern JavaScript frameworks and libraries.'
    },
    {
      icon: <FontAwesomeIcon icon={faServer} />,
      title: 'Back-end Development',
      description: 'We build robust server-side applications with secure APIs and databases to power your digital platforms.'
    },
    {
      icon: <FontAwesomeIcon icon={faMobileAlt} />,
      title: 'Mobile-Responsive Design',
      description: 'We ensure your website looks and works perfectly on all devices, from desktop to smartphones.'
    },
    {
      icon: <FontAwesomeIcon icon={faLock} />,
      title: 'Security Implementation',
      description: 'We implement robust security measures to protect your website and user data from potential threats.'
    }
  ];
  
  const pricingPlans = [
    {
      title: 'Basic',
      price: '$999',
      description: 'Perfect for small businesses just getting started',
      features: [
        'Custom responsive design',
        'Up to 5 pages',
        'Contact form',
        'Mobile optimization',
        'Basic SEO setup',
        '1 month of support'
      ]
    },
    {
      title: 'Professional',
      price: '$2,499',
      description: 'Ideal for growing businesses that need more features',
      features: [
        'Custom responsive design',
        'Up to 10 pages',
        'Content Management System',
        'Contact form & Google Maps',
        'Complete SEO optimization',
        'Social media integration',
        '3 months of support'
      ],
      popular: true
    },
    {
      title: 'Enterprise',
      price: '$4,999+',
      description: 'For businesses requiring complex solutions',
      features: [
        'Custom responsive design',
        'Unlimited pages',
        'Advanced CMS with user roles',
        'E-commerce functionality',
        'Custom features development',
        'Advanced SEO & analytics',
        'Performance optimization',
        '6 months of support'
      ]
    }
  ];
  
  const faqItems = [
    {
      question: 'How long does it take to build a website?',
      answer: "The timeline varies depending on the complexity of the project. A simple website might take 2-4 weeks, while more complex sites with custom functionality could take 2-3 months. During our initial consultation, we'll provide a more accurate timeline based on your specific requirements."
    },
    {
      question: 'Do you only create new websites or can you redesign my existing site?',
      answer: 'We offer both services! Whether you need a brand new website or want to refresh your existing one, we can help. Our redesign process includes a thorough analysis of your current site to identify areas for improvement in terms of design, functionality, and performance.'
    },
    {
      question: 'What is your pricing structure?',
      answer: 'We price our projects based on the scope of work and complexity. Each project is unique, so we provide custom quotes after understanding your specific requirements. Our pricing is transparent with no hidden fees, and we offer different packages to suit various budgets.'
    },
    {
      question: 'Will my website be mobile-friendly?',
      answer: 'Absolutely! All our websites are built with a mobile-first approach, ensuring they look and function perfectly on all devices. With more than 50% of web traffic coming from mobile devices, having a responsive website is essential for success.'
    },
    {
      question: 'Do you provide ongoing maintenance after the website is launched?',
      answer: 'Yes, we offer various maintenance packages to keep your website secure, updated, and performing optimally. These packages include regular backups, security updates, performance monitoring, and technical support.'
    }
  ];

  return (
    <>
      <PageHero>
        <div className="container">
          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </PageTitle>
          <PageDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            We offer a comprehensive range of web development and design services to help your business thrive in the digital landscape.
          </PageDescription>
        </div>
      </PageHero>
      
      <Section>
        <ServiceCategory>
          <CategoryTitle>Core Services</CategoryTitle>
          <ServicesGrid>
            {mainServices.map((service, index) => (
              <Card key={index} hoverable>
                <div>
                  {service.icon}
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <LearnMoreButton to="/contact" variant="text">
                    Learn More
                  </LearnMoreButton>
                </div>
              </Card>
            ))}
          </ServicesGrid>
        </ServiceCategory>
        
        <ServiceCategory>
          <CategoryTitle>Specialized Services</CategoryTitle>
          <ServicesGrid>
            {specializedServices.map((service, index) => (
              <Card key={index} hoverable>
                <div>
                  {service.icon}
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <LearnMoreButton to="/contact" variant="text">
                    Learn More
                  </LearnMoreButton>
                </div>
              </Card>
            ))}
          </ServicesGrid>
        </ServiceCategory>
        
        <ServiceCategory>
          <CategoryTitle>Additional Services</CategoryTitle>
          <ServicesGrid>
            {additionalServices.map((service, index) => (
              <Card key={index} hoverable>
                <div>
                  {service.icon}
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <LearnMoreButton to="/contact" variant="text">
                    Learn More
                  </LearnMoreButton>
                </div>
              </Card>
            ))}
          </ServicesGrid>
        </ServiceCategory>
      </Section>
      
      <Section title="Our Pricing" subtitle="Transparent pricing with no hidden fees" centered light={false}>
        <PricingContainer>
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={index}
              className={plan.popular ? 'popular' : ''}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PricingTitle>{plan.title}</PricingTitle>
              <PriceAmount>
                {plan.price} <span>/ project</span>
              </PriceAmount>
              <PricingDescription>{plan.description}</PricingDescription>
              <PricingFeatures>
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </PricingFeatures>
              <Button 
                variant={plan.popular ? 'solid' : 'outline'} 
                fullWidth 
                to="/contact"
              >
                Get Started
              </Button>
            </PricingCard>
          ))}
        </PricingContainer>
      </Section>
      
      <Section title="Frequently Asked Questions" subtitle="Find answers to common questions about our services" centered>
        <FAQContainer>
          {faqItems.map((item, index) => (
            <FAQItem key={index}>
              <FAQQuestion>{item.question}</FAQQuestion>
              <FAQAnswer>
                <p>{item.answer}</p>
              </FAQAnswer>
            </FAQItem>
          ))}
        </FAQContainer>
      </Section>
      
      <Section light={false}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2>Ready to Start Your Project?</h2>
          <p style={{ margin: '1.5rem 0' }}>
            Contact us today for a free consultation. We'll discuss your project requirements and provide a custom quote.
          </p>
          <Button to="/contact" size="large">
            Get in Touch
          </Button>
        </div>
      </Section>
    </>
  );
};

export default ServicesPage; 