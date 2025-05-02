import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLightbulb, 
  faStar, 
  faHandshake, 
  faRocket
} from '@fortawesome/free-solid-svg-icons';
import {
  faLinkedinIn,
  faTwitter,
  faGithub
} from '@fortawesome/free-brands-svg-icons';

// Components
import Section from '../components/common/Section';
import Button from '../components/common/Button';
import { Image } from '../components/common';

// Import the image directly
import YaroslavImage from '../Images/Yaroslav.Voryk.Picture.jpg';

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

// Story Section
const StoryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const StoryImage = styled.div`
  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: ${({ theme }) => theme.shadow};
  }
  
  @media (max-width: 992px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const StoryContent = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.text};
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.textLight};
    line-height: 1.8;
  }
`;

// Values Section
const ValuesContainer = styled.div`
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

const ValueCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ValueIcon = styled.div`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 1.5rem;
`;

const ValueTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const ValueDescription = styled.p`
  color: ${({ theme }) => theme.textLight};
  line-height: 1.6;
`;

// Stats Section
const StatsContainer = styled.div`
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

const StatItem = styled.div`
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.p`
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  font-weight: 500;
`;

// Team Section
const TeamContainer = styled.div`
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

const TeamCard = styled(motion.div)`
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const TeamImageContainer = styled.div`
  height: 300px;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
`;

const TeamContent = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const TeamName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const TeamPosition = styled.p`
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  margin-bottom: 1rem;
`;

const TeamBio = styled.p`
  color: ${({ theme }) => theme.textLight};
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TeamSocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;

// Brands Section
const BrandsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin-top: 2rem;
`;

const BrandItem = styled.div`
  padding: 1rem;
  
  img {
    max-width: 150px;
    height: auto;
    filter: grayscale(100%);
    opacity: 0.6;
    transition: all 0.3s ease;
    
    &:hover {
      filter: grayscale(0);
      opacity: 1;
    }
  }
`;

const AboutPage: React.FC = () => {
  const values = [
    {
      icon: <FontAwesomeIcon icon={faLightbulb} />,
      title: 'Innovation',
      description: 'We embrace cutting-edge technologies and creative solutions to deliver exceptional results for our clients.'
    },
    {
      icon: <FontAwesomeIcon icon={faStar} />,
      title: 'Quality',
      description: 'We are committed to excellence in every aspect of our work, from code quality to design aesthetics.'
    },
    {
      icon: <FontAwesomeIcon icon={faHandshake} />,
      title: 'Partnership',
      description: 'We build lasting relationships with our clients based on trust, transparency, and mutual success.'
    },
    {
      icon: <FontAwesomeIcon icon={faRocket} />,
      title: 'Impact',
      description: 'We measure our success by the positive impact our work has on our clients\' businesses and users.'
    }
  ];
  
  const stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '30+', label: 'Happy Clients' },
    { number: '3+', label: 'Years of Experience' },
    { number: '3', label: 'Team Members' }
  ];
  
  const team = [
    {
      name: 'Yaroslav Voryk',
      position: 'Founder & CEO',
      bio: 'Full-stack developer and web development expert with a passion for creating exceptional digital experiences that help businesses grow and succeed online.',
      image: YaroslavImage,
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com'
      }
    },
    {
      name: 'Aliaksandra Antsipava',
      position: 'Lead Designer',
      bio: 'Creative UI/UX designer passionate about creating beautiful, user-friendly interfaces that drive engagement.',
      image: '//https://randomuser.me/api/portraits/women/44.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com'
      }
    },
    {
      name: 'Michael Chen',
      position: 'Lead Developer',
      bio: 'Full-stack developer specializing in React and Node.js with a focus on performance optimization.',
      image: '//https://randomuser.me/api/portraits/men/22.jpg',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com'
      }
    }
  ];
  
  const brands = [
    { name: 'Company 1', logo: 'https://placehold.co/150x80/f8f9fa/6c757d?text=Company+1' },
    { name: 'Company 2', logo: 'https://placehold.co/150x80/f8f9fa/6c757d?text=Company+2' },
    { name: 'Company 3', logo: 'https://placehold.co/150x80/f8f9fa/6c757d?text=Company+3' },
    { name: 'Company 4', logo: 'https://placehold.co/150x80/f8f9fa/6c757d?text=Company+4' },
    { name: 'Company 5', logo: 'https://placehold.co/150x80/f8f9fa/6c757d?text=Company+5' }
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
            About Us
          </PageTitle>
          <PageDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Learn more about our company, our mission, and the talented team behind Modern Web Creations.
          </PageDescription>
        </div>
      </PageHero>
      
      <Section>
        <StoryContainer>
          <StoryImage>
            <Image 
              src="https://img.freepik.com/free-vector/tiny-business-people-working-together_74855-5933.jpg" 
              alt="Our small team of three working together"
              lazy={true}
              aspectRatio="16/9"
              objectFit="cover"
            />
          </StoryImage>
          <StoryContent>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Our Story
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Modern Web Creations was founded by Yaroslav Voryk with a simple mission: to help businesses succeed in the digital world through exceptional web design and development.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Based in St. Petersburg, Florida, but serving clients all over the world, we've grown into a small but mighty team of three dedicated professionals who are passionate about creating stunning, high-performance websites and web applications.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Today, we've worked with clients from local St. Petersburg businesses to international companies, always maintaining our commitment to quality, innovation, and exceptional service no matter where our clients are located.
            </motion.p>
          </StoryContent>
        </StoryContainer>
      </Section>
      
      <Section title="Our Values" subtitle="The principles that guide our work and define our company culture" centered light={false}>
        <ValuesContainer>
          {values.map((value, index) => (
            <ValueCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ValueIcon>{value.icon}</ValueIcon>
              <ValueTitle>{value.title}</ValueTitle>
              <ValueDescription>{value.description}</ValueDescription>
            </ValueCard>
          ))}
        </ValuesContainer>
      </Section>
      
      <Section>
        <StatsContainer>
          {stats.map((stat, index) => (
            <StatItem key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsContainer>
      </Section>
      
      <Section title="Our Team" subtitle="Meet the talented people behind Modern Web Creations" centered>
        <TeamContainer>
          {team.map((member, index) => (
            <TeamCard
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TeamImageContainer>
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  lazy={true}
                  objectFit="cover"
                  height="300px"
                />
              </TeamImageContainer>
              <TeamContent>
                <TeamName>{member.name}</TeamName>
                <TeamPosition>{member.position}</TeamPosition>
                <TeamBio>{member.bio}</TeamBio>
                <TeamSocialLinks>
                  <SocialLink href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </SocialLink>
                  <SocialLink href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                  </SocialLink>
                  <SocialLink href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                  </SocialLink>
                </TeamSocialLinks>
              </TeamContent>
            </TeamCard>
          ))}
        </TeamContainer>
      </Section>
      
      <Section title="Trusted By" subtitle="Companies who have trusted us with their digital presence" centered light={false}>
        <BrandsContainer>
          {brands.map((brand, index) => (
            <BrandItem key={index}>
              <img src={brand.logo} alt={brand.name} />
            </BrandItem>
          ))}
        </BrandsContainer>
      </Section>
      
      <Section>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2>Ready to Work with Us?</h2>
          <p style={{ margin: '1.5rem 0' }}>
            Let's collaborate to create an exceptional web experience for your business.
          </p>
          <Button to="/contact" size="large">
            Get in Touch
          </Button>
        </div>
      </Section>
    </>
  );
};

export default AboutPage; 