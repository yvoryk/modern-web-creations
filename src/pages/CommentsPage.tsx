import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Section, Button, Image } from '../components/common';

// Styled Components
const CommentsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 0;
`;

const CommentsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CommentCard = styled.div`
  background: ${({ theme }) => theme.cardBackground || theme.background};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadow};
  }
`;

const CommentText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
  font-style: italic;
`;

const CommentAuthor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const CommentCompany = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.secondary};
  margin-bottom: 0.2rem;
`;

const CommentRating = styled.div`
  color: #ffcc00;
  font-size: 0.8rem;
  display: flex;
  gap: 0.2rem;
`;

const CommentDate = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.tertiary || theme.textLight};
  margin-top: 0.3rem;
`;

const AddCommentSection = styled.div`
  background: ${({ theme }) => theme.backgroundAlt};
  padding: 2rem;
  border-radius: 12px;
  margin-top: 2rem;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FormLabel = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.3rem;
`;

const FormInput = styled.input`
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.primary}30;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.primary}30`};
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.primary}30;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.primary}30`};
  }
`;

const RatingSelector = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const StarIcon = styled.div<{ active: boolean }>`
  color: ${({ active }) => active ? '#ffcc00' : '#d1d1d1'};
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SubmitButton = styled(Button)`
  align-self: flex-start;
  margin-top: 1rem;
`;

const SuccessMessage = styled(motion.div)`
  background-color: rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.5);
  padding: 1rem;
  border-radius: 8px;
  color: #2ecc71;
  margin-bottom: 1.5rem;
`;

// Sample data - make testimonials simpler and update dates
const initialTestimonials = [
  {
    id: 1,
    text: "Great site. Fast and looks good. Easy to navigate. Very happy with the result.",
    name: "Sarah W.",
    company: "Wilson Consulting",
    avatar: "",
    rating: 5,
    date: "2024-04-15"
  },
  {
    id: 2,
    text: "Online store working perfectly. Sales up since launch. Customer feedback positive.",
    name: "Mike R.",
    company: "Urban Apparel",
    avatar: "",
    rating: 5,
    date: "2024-04-10"
  },
  {
    id: 3,
    text: "Quick service. Website easy to update ourselves now. Saves time and money.",
    name: "Anna M.",
    company: "Green Valley Nursery",
    avatar: "",
    rating: 5,
    date: "2024-04-01"
  },
  {
    id: 4,
    text: "Professional looking site at good price. Already getting new clients from Google searches.",
    name: "James L.",
    company: "Pacific Design",
    avatar: "",
    rating: 4,
    date: "2024-03-25"
  },
  {
    id: 5,
    text: "Proud of my new site. Patient with revisions. Perfect fit for my business.",
    name: "Emma G.",
    company: "Clarity Coaching",
    avatar: "",
    rating: 5,
    date: "2024-03-18"
  },
  {
    id: 6,
    text: "Not tech-savvy but they made it simple. Can update site myself now. Great support.",
    name: "Thomas W.",
    company: "Wright Home Inspections",
    avatar: "",
    rating: 5,
    date: "2024-03-12"
  },
  {
    id: 7,
    text: "Fixed speed issues. Mobile works well. Very responsive team.",
    name: "Lauren K.",
    company: "Petals Flower Shop",
    avatar: "",
    rating: 4,
    date: "2024-03-05"
  },
  {
    id: 8,
    text: "Fair prices. Delivered on time. New booking system working perfectly.",
    name: "Daniel J.",
    company: "Sunset Tours",
    avatar: "",
    rating: 5,
    date: "2024-02-27"
  },
  {
    id: 9,
    text: "Understood our B2B needs. Clients impressed with new site.",
    name: "Rachel P.",
    company: "Industrial Solutions",
    avatar: "",
    rating: 5,
    date: "2024-02-15"
  },
  {
    id: 10,
    text: "Simple, fast website. Does exactly what we need without unnecessary features.",
    name: "Kevin M.",
    company: "Local Plumbing",
    avatar: "",
    rating: 5,
    date: "2024-02-10"
  },
  {
    id: 11,
    text: "Redesign has helped our SEO a lot. Traffic increasing weekly. Very pleased.",
    name: "Sandra T.",
    company: "Pet Supplies Direct",
    avatar: "",
    rating: 4,
    date: "2024-02-08"
  },
  {
    id: 12,
    text: "Smooth process from start to finish. Site looks modern and works on all devices.",
    name: "Brian Y.",
    company: "Coast Financial",
    avatar: "",
    rating: 5,
    date: "2024-02-05"
  },
  {
    id: 13,
    text: "Affordable quality. Exceeded expectations. Would recommend to anyone.",
    name: "Natalie C.",
    company: "Sunrise Bakery",
    avatar: "",
    rating: 5,
    date: "2024-02-03"
  }
];

interface Testimonial {
  id: number;
  text: string;
  name: string;
  company: string;
  avatar: string;
  rating: number;
  date: string;
}

const CommentsPage: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    // Try to get testimonials from localStorage
    const saved = localStorage.getItem('testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    text: '',
    rating: 5
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Save testimonials to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
  }, [testimonials]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.text) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Create new testimonial
    const newTestimonial: Testimonial = {
      id: Date.now(),
      text: formData.text,
      name: formData.name,
      company: formData.company,
      avatar: "",
      rating: formData.rating,
      date: new Date().toISOString().split('T')[0]
    };
    
    // Add to testimonials list
    setTestimonials(prev => [newTestimonial, ...prev]);
    
    // Reset form
    setFormData({
      name: '',
      company: '',
      text: '',
      rating: 5
    });
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  return (
    <div>
      <Section 
        title="Client Testimonials"
        subtitle="Read what our clients have to say about our web development services and share your own experience."
        centered
      >
        <CommentsContainer>
          {showSuccess && (
            <SuccessMessage
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              Thank you for sharing your feedback! Your testimonial has been added.
            </SuccessMessage>
          )}
          
          <AddCommentSection>
            <h3>Share Your Experience</h3>
            <CommentForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel htmlFor="name">Your Name *</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="company">Company (Optional)</FormLabel>
                <FormInput
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel htmlFor="text">Your Feedback *</FormLabel>
                <FormTextarea
                  id="text"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Rating</FormLabel>
                <RatingSelector>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      active={star <= formData.rating}
                      onClick={() => handleRatingChange(star)}
                    >
                      <FontAwesomeIcon icon={faStar} />
                    </StarIcon>
                  ))}
                </RatingSelector>
              </FormGroup>
              
              <SubmitButton
                type="submit"
                variant="gradient"
                gradientType="blue"
                size="medium"
                icon={<FontAwesomeIcon icon={faPaperPlane} />}
              >
                Submit Testimonial
              </SubmitButton>
            </CommentForm>
          </AddCommentSection>
          
          <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>What Our Clients Say</h3>
          <CommentsList>
            {testimonials.map((testimonial) => (
              <CommentCard key={testimonial.id}>
                <CommentText>"{testimonial.text}"</CommentText>
                <CommentAuthor>
                  <CommentInfo>
                    <CommentName>{testimonial.name}</CommentName>
                    {testimonial.company && (
                      <CommentCompany>{testimonial.company}</CommentCompany>
                    )}
                    <CommentRating>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FontAwesomeIcon key={i} icon={faStar} />
                      ))}
                    </CommentRating>
                    <CommentDate>{testimonial.date}</CommentDate>
                  </CommentInfo>
                </CommentAuthor>
              </CommentCard>
            ))}
          </CommentsList>
        </CommentsContainer>
      </Section>
    </div>
  );
};

export default CommentsPage; 