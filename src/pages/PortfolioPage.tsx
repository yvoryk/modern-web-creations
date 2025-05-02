import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

// Components
import Section from '../components/common/Section';
import Button from '../components/common/Button';

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

// Filter
const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: 0.5rem 1.5rem;
  margin: 0.5rem;
  background-color: ${({ theme, $isActive }) => 
    $isActive ? theme.primary : 'transparent'};
  color: ${({ theme, $isActive }) => 
    $isActive ? 'white' : theme.text};
  border: 2px solid ${({ theme, $isActive }) => 
    $isActive ? theme.primary : theme.border};
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme, $isActive }) => 
      $isActive ? theme.primaryHover : theme.cardBackground};
  }
`;

// Portfolio Grid
const PortfolioGrid = styled(motion.div)`
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

const ProjectCard = styled(motion.div)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadow};
  height: 300px;
  cursor: pointer;
`;

const ProjectImage = styled.div<{ $image: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  
  ${ProjectCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  opacity: 1;
  transition: opacity 0.3s ease;
  
  ${ProjectCard}:hover & {
    opacity: 1;
  }
`;

const ProjectTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ProjectCategory = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
`;

const ProjectDescription = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Modal
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  max-width: 1000px;
  width: 100%;
  overflow: hidden;
  position: relative;
  
  @media (max-width: 768px) {
    margin: 2rem;
  }
`;

const ModalClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 2px;
    background-color: white;
  }
  
  &::before {
    transform: rotate(45deg);
  }
  
  &::after {
    transform: rotate(-45deg);
  }
`;

const ModalImageContainer = styled.div`
  width: 100%;
  height: 500px;
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalDetails = styled.div`
  padding: 2rem;
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const ModalMeta = styled.div`
  display: flex;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  margin-right: 2rem;
  margin-bottom: 1rem;
  
  h4 {
    font-size: 0.9rem;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textLight};
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.text};
  }
`;

const ModalDescription = styled.div`
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 1rem;
  }
`;

const TechStack = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.25rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.text};
  }
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechItem = styled.span`
  background-color: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  padding: 0.4rem 1rem;
  border-radius: 30px;
  font-size: 0.9rem;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ProjectActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const PortfolioPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  const filters = [
    { id: 'all', name: 'All' },
    { id: 'website', name: 'Websites' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'redesign', name: 'Redesigns' },
    { id: 'app', name: 'Web Apps' }
  ];
  
  const projects = [
    {
      id: 1,
      title: "Luxury Fashion E-Commerce",
      category: "ecommerce",
      categories: ["E-Commerce", "Website"],
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      client: "FashionElegance",
      year: "2023",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      description: "A high-end fashion e-commerce platform with advanced filtering, wishlist functionality, and seamless checkout integration. The platform includes a custom CMS for product management and inventory tracking.",
      challenge: "The client needed a premium shopping experience that matched their brand identity while ensuring seamless performance across all devices.",
      solution: "We developed a custom e-commerce solution with a focus on visual presentation and user experience. The implementation includes high-performance image loading, advanced product filtering, and a streamlined checkout process.",
      url: "https://fashionelegance.com"
    },
    {
      id: 2,
      title: "Corporate Website Redesign",
      category: "redesign",
      categories: ["Redesign", "Website"],
      image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      client: "Global Innovations Inc.",
      year: "2023",
      technologies: ["Next.js", "Tailwind CSS", "GraphQL", "Contentful"],
      description: "A complete redesign of a corporate website for a global technology firm, focusing on modern design, performance optimization, and enhanced user experience.",
      challenge: "The client's existing website was outdated, slow, and difficult to navigate, resulting in high bounce rates and poor user engagement.",
      solution: "We redesigned the site with a modern aesthetic, intuitive navigation, and optimized performance. The new site includes interactive elements, case studies, and a resource center to engage visitors.",
      url: "https://globalinnovations.co"
    },
    {
      id: 3,
      title: "Health & Fitness Web App",
      category: "app",
      categories: ["Web App", "Software"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      client: "FitLife",
      year: "2022",
      technologies: ["React", "Firebase", "Chart.js", "PWA", "Stripe"],
      description: "A comprehensive fitness tracking web application that allows users to track workouts, nutrition, and progress. The app includes personalized workout plans, meal tracking, and progress visualization.",
      challenge: "Creating an intuitive and engaging platform that motivates users to track their fitness journey while providing valuable insights and personalized recommendations.",
      solution: "We developed a progressive web app with offline functionality, interactive dashboards, and gamification elements to encourage user engagement. The app syncs with popular fitness devices and provides AI-powered recommendations.",
      url: "https://fitlifeapp.co"
    },
    {
      id: 4,
      title: "Restaurant Ordering System",
      category: "app",
      categories: ["Web App", "E-Commerce"],
      image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      client: "Gourmet Bites",
      year: "2023",
      technologies: ["Vue.js", "Express", "MongoDB", "Socket.io", "Stripe"],
      description: "An online ordering system for a restaurant chain, including menu management, real-time order tracking, and loyalty program integration.",
      challenge: "The client needed a seamless ordering system that could handle peak-time traffic, integrate with their existing POS system, and provide a user-friendly experience.",
      solution: "We created a custom solution with real-time order updates, customizable menu items, and an intuitive ordering process. The system includes kitchen display integration and comprehensive analytics for the restaurant owners.",
      url: "https://gourmetbites.com"
    },
    {
      id: 5,
      title: "Real Estate Listings Website",
      category: "website",
      categories: ["Website", "Application"],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      client: "Prime Properties",
      year: "2022",
      technologies: ["React", "Node.js", "PostgreSQL", "Google Maps API", "AWS"],
      description: "A modern real estate listings website with advanced search features, virtual tours, and agent management. The platform includes a comprehensive property management system for agents and administrators.",
      challenge: "Developing a scalable platform that could handle thousands of property listings with complex search parameters and interactive features.",
      solution: "We built a responsive website with advanced filtering, map-based search, and virtual tour integration. The admin panel provides agents with detailed analytics and lead management tools.",
      url: "https://primeproperties.com"
    },
    {
      id: 6,
      title: "Educational Portal Redesign",
      category: "redesign",
      categories: ["Redesign", "Web App"],
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      client: "Learning Academy",
      year: "2022",
      technologies: ["React", "Django", "PostgreSQL", "Redis", "AWS"],
      description: "A complete overhaul of an educational portal serving thousands of students and educators. The redesign focused on improving usability, performance, and adding modern learning features.",
      challenge: "Transforming an outdated learning management system into a modern, interactive platform without disrupting ongoing courses and user data.",
      solution: "We implemented a phased redesign approach, starting with core functionality improvements and gradually introducing new features. The new platform includes interactive lessons, progress tracking, and comprehensive analytics for educators.",
      url: "https://learningacademy.edu"
    }
  ];
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  const openModal = (project: any) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };
  
  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };
  
  return (
    <>
      <PageHero>
        <div className="container">
          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Portfolio
          </PageTitle>
          <PageDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Explore our showcase of successful projects and see how we've helped businesses transform their digital presence.
          </PageDescription>
        </div>
      </PageHero>
      
      <Section>
        <FilterContainer>
          {filters.map(filter => (
            <FilterButton 
              key={filter.id}
              $isActive={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </FilterButton>
          ))}
        </FilterContainer>
        
        <PortfolioGrid
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <AnimatePresence>
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                layoutId={`project-${project.id}`}
                onClick={() => openModal(project)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <ProjectImage $image={project.image} />
                <ProjectOverlay>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectCategory>
                    {project.categories.join(' • ')}
                  </ProjectCategory>
                  <ProjectDescription>
                    {project.description.split('.')[0] + '.'}
                  </ProjectDescription>
                </ProjectOverlay>
                <ProjectActions>
                  <Button 
                    variant="solid" 
                    onClick={() => window.open(project.url, '_blank')}
                  >
                    View Project
                  </Button>
                </ProjectActions>
              </ProjectCard>
            ))}
          </AnimatePresence>
        </PortfolioGrid>
      </Section>
      
      <AnimatePresence>
        {selectedProject && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              layoutId={`project-${selectedProject.id}`}
              onClick={e => e.stopPropagation()}
            >
              <ModalClose onClick={closeModal} />
              <ModalImageContainer>
                <ModalImage src={selectedProject.image} alt={selectedProject.title} />
              </ModalImageContainer>
              <ModalDetails>
                <ModalTitle>{selectedProject.title}</ModalTitle>
                
                <ModalMeta>
                  <MetaItem>
                    <h4>Client</h4>
                    <p>{selectedProject.client}</p>
                  </MetaItem>
                  <MetaItem>
                    <h4>Year</h4>
                    <p>{selectedProject.year}</p>
                  </MetaItem>
                  <MetaItem>
                    <h4>Category</h4>
                    <p>{selectedProject.categories.join(', ')}</p>
                  </MetaItem>
                </ModalMeta>
                
                <ModalDescription>
                  <p>{selectedProject.description}</p>
                  <h3>The Challenge</h3>
                  <p>{selectedProject.challenge}</p>
                  <h3>Our Solution</h3>
                  <p>{selectedProject.solution}</p>
                </ModalDescription>
                
                <TechStack>
                  <h3>Technologies Used</h3>
                  <TechList>
                    {selectedProject.technologies.map((tech: string, index: number) => (
                      <TechItem key={index}>{tech}</TechItem>
                    ))}
                  </TechList>
                </TechStack>
                
                <ModalActions>
                  <Button 
                    variant="solid"
                    onClick={() => window.open(selectedProject.url, '_blank', 'noopener,noreferrer')}
                  >
                    Visit Website <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </Button>
                  <Button 
                    variant="outline" 
                    to="/contact"
                  >
                    Request Similar Project
                  </Button>
                </ModalActions>
              </ModalDetails>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
      
      <Section light={false}>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2>Ready to Build Your Dream Project?</h2>
          <p style={{ margin: '1.5rem 0' }}>
            Interested in working together? We'd love to hear about your project and how we can help bring your vision to life.
          </p>
          <Button to="/contact" size="large">
            Start a Project
          </Button>
        </div>
      </Section>
    </>
  );
};

export default PortfolioPage; 