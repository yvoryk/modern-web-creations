import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faClock 
} from '@fortawesome/free-solid-svg-icons';

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

// Contact Grid
const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

// Contact Form
const ContactForm = styled(motion.form)`
  background-color: ${({ theme }) => theme.background};
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.text};
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
  font-weight: 500;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236c757d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 16px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}33;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormMessage = styled.div<{ $type: 'success' | 'error' }>`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  background-color: ${({ theme, $type }) => 
    $type === 'success' ? theme.success + '22' : theme.error + '22'};
  color: ${({ theme, $type }) => 
    $type === 'success' ? theme.success : theme.error};
  border: 1px solid ${({ theme, $type }) => 
    $type === 'success' ? theme.success : theme.error};
`;

// Contact Info
const ContactInfoContainer = styled(motion.div)`
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.text};
  }
`;

const InfoItems = styled.div`
  margin-bottom: 2.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  
  svg {
    color: ${({ theme }) => theme.primary};
    font-size: 1.5rem;
    margin-right: 1rem;
    margin-top: 0.25rem;
  }
`;

const InfoContent = styled.div`
  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.text};
  }
  
  p {
    color: ${({ theme }) => theme.textLight};
    line-height: 1.6;
  }
`;

// Map
const MapContainer = styled.div`
  width: 100%;
  height: 250px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
  
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

// FAQ
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

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    budget: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic form validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please fill out all required fields.'
      });
      return;
    }
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        budget: '',
        message: ''
      });
    }, 1000);
  };
  
  const faqItems = [
    {
      question: 'How do I request a quote for my project?',
      answer: 'You can request a quote by filling out the contact form on this page, calling us directly, or sending us an email. Please provide as much detail about your project as possible so we can give you an accurate estimate.'
    },
    {
      question: 'What information should I include in my inquiry?',
      answer: 'To help us better understand your needs, please include details about your project scope, timeline, budget range, and any specific requirements or features you\'d like to incorporate.'
    },
    {
      question: 'How quickly can I expect a response?',
      answer: 'We typically respond to all inquiries within 24-48 business hours. For urgent matters, we recommend calling us directly.'
    },
    {
      question: 'Do you work with clients outside of Florida?',
      answer: 'Absolutely! While we\'re based in St. Petersburg, Florida, we proudly serve clients all over the world. Our team is set up to collaborate remotely with clients from any location.'
    },
    {
      question: 'What happens after I submit my contact form?',
      answer: 'One of our team members will reach out to schedule an initial consultation to discuss your project in more detail. This helps us understand your needs better before providing recommendations and quotes.'
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
            Contact Us
          </PageTitle>
          <PageDescription
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Get in touch with our team to discuss your project or request a free quote. We'd love to hear from you!
          </PageDescription>
        </div>
      </PageHero>
      
      <Section>
        <ContactGrid>
          <ContactForm
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
          >
            <h2>Send Us a Message</h2>
            
            {formStatus.submitted && (
              <FormMessage $type={formStatus.success ? 'success' : 'error'}>
                {formStatus.message}
              </FormMessage>
            )}
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="name">Your Name *</FormLabel>
                <FormInput 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="email">Email Address *</FormLabel>
                <FormInput 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <FormInput 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <FormInput 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <FormLabel htmlFor="budget">Project Budget</FormLabel>
              <FormSelect 
                id="budget" 
                name="budget" 
                value={formData.budget}
                onChange={handleChange}
              >
                <option value="">Select a budget range</option>
                <option value="< $1,000">Less than $1,000</option>
                <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000+">$10,000+</option>
                <option value="Not sure">Not sure</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <FormLabel htmlFor="message">Your Message *</FormLabel>
              <FormTextarea 
                id="message" 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <Button type="submit" size="large">
              Send Message
            </Button>
          </ContactForm>
          
          <ContactInfoContainer
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2>Contact Information</h2>
            
              <InfoItem>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <InfoContent>
                  <h3>Our Location</h3>
                  <p>St. Petersburg, Florida<br />United States</p>
                  <p><small>Serving clients worldwide</small></p>
                </InfoContent>
              </InfoItem>
              
              <InfoItem>
                <FontAwesomeIcon icon={faPhone} />
                <InfoContent>
                  <h3>Phone Number</h3>
                  <p>+1 (727) 623-3424</p>
                </InfoContent>
              </InfoItem>
              
              <InfoItem>
                <FontAwesomeIcon icon={faEnvelope} />
                <InfoContent>
                  <h3>Email Address</h3>
                  <p>contact@modernwebcreations.com</p>
                </InfoContent>
              </InfoItem>
            
            <MapContainer>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112542.45222587935!2d-82.7603237705566!3d27.76538060000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2e19ba8a0795b%3A0x9b93279d3034e3cc!2sSt.%20Petersburg%2C%20FL!5e0!3m2!1sen!2sus!4v1710945320201!5m2!1sen!2sus" 
                title="Our Location"
                allowFullScreen
                loading="lazy"
              />
            </MapContainer>
          </ContactInfoContainer>
        </ContactGrid>
      </Section>
      
      <Section title="Frequently Asked Questions" subtitle="Find answers to common questions about contacting us" centered light={false}>
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
    </>
  );
};

export default ContactPage; 