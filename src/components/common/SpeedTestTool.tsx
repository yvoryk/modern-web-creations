import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faSpinner, 
  faCheck, 
  faTimes, 
  faExclamationTriangle,
  faInfoCircle,
  faArrowRight,
  faRocket,
  faBolt,
  faLightbulb,
  faDesktop,
  faMobile
} from '@fortawesome/free-solid-svg-icons';

// Styled Components
const SpeedTestContainer = styled.div`
  background: ${({ theme }) => theme.gradientMixed};
  background-size: 200% 200%;
  animation: gradientBg 15s ease infinite;
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow};
  padding: 2.5rem;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  
  @keyframes gradientBg {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: ${({ theme }) => theme.secondary};
    z-index: 5;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -80px;
    right: -80px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: ${({ theme }) => theme.secondary};
    opacity: 0.1;
    z-index: 0;
  }
  
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    z-index: 0;
    opacity: 0.1;
  }
  
  .blob-1 {
    top: -150px;
    left: -100px;
    width: 400px;
    height: 400px;
    background: ${({ theme }) => theme.primary};
  }
  
  .blob-2 {
    bottom: -150px;
    right: -100px;
    width: 350px;
    height: 350px;
    background: ${({ theme }) => theme.secondary};
  }
  
  .noise {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    opacity: 0.03;
    mix-blend-mode: overlay;
    z-index: 1;
    pointer-events: none;
  }
  
  .content {
    position: relative;
    z-index: 2;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  
  svg {
    color: ${({ theme }) => theme.secondary};
    filter: drop-shadow(0 0 10px ${({ theme }) => theme.secondary}80);
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 80%;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  backdrop-filter: blur(10px);
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.secondary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.secondary}33;
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const InputIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.secondary};
  
  @media (max-width: 768px) {
    top: 0.85rem;
    transform: none;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.gradientYellow};
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    bottom: -50%;
    left: -50%;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
    transform: rotate(25deg) translate(-600px, 0px);
    transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    
    &::after {
      transform: rotate(25deg) translate(300px, 0px);
    }
  }
  
  &:disabled {
    background: ${({ theme }) => theme.border};
    cursor: not-allowed;
    transform: none;
    
    &::after {
      display: none;
    }
  }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 2rem;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${({ active }) => active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  color: ${({ active }) => active ? 'white' : 'rgba(255, 255, 255, 0.7)'};
  border: none;
  border-bottom: 3px solid ${({ active, theme }) => active ? theme.secondary : 'transparent'};
  font-size: 1rem;
  font-weight: ${({ active }) => active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.05);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  color: ${({ theme }) => theme.secondary};
  
  svg {
    font-size: 2rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 0 10px ${({ theme }) => theme.secondary}40);
  }
  
  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

const ResultsContainer = styled.div`
  margin-top: 1rem;
  position: relative;
`;

const ScoreCard = styled(motion.div)<{ score: number }>`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadowLight};
  border-left: 5px solid ${({ score }) => 
    score >= 90 ? '#4caf50' : // Green for excellent
    score >= 70 ? '#ff9800' : // Orange for average
    '#f44336'                // Red for poor
  };
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${({ score }) => 
      score >= 90 ? '#4caf5020' : 
      score >= 70 ? '#ff980020' : 
      '#f4433620'
    };
    right: -20px;
    top: -20px;
    z-index: 0;
  }
`;

const ScoreCircle = styled.div<{ score: number }>`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  background: ${({ score }) => 
    score >= 90 ? 'linear-gradient(135deg, #4caf50, #2e7d32)' : 
    score >= 70 ? 'linear-gradient(135deg, #ff9800, #ef6c00)' : 
    'linear-gradient(135deg, #f44336, #c62828)'
  };
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 4px 10px ${({ score }) => 
    score >= 90 ? '#4caf5050' : 
    score >= 70 ? '#ff980050' : 
    '#f4433650'
  };
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px dashed white;
    opacity: 0.2;
    animation: spin 30s linear infinite;
  }
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const ScoreInfo = styled.div`
  flex: 1;
  position: relative;
  z-index: 1;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: white;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
  }
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const MetricCard = styled.div<{ status: 'good' | 'average' | 'poor' }>`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.25rem;
  box-shadow: ${({ theme }) => theme.shadowLight};
  border-top: 3px solid ${({ status }) => 
    status === 'good' ? '#4caf50' : 
    status === 'average' ? '#ff9800' : 
    '#f44336'
  };
  transition: transform 0.3s ease;
  backdrop-filter: blur(5px);
  
  &:hover {
    transform: translateY(-5px);
    background-color: rgba(255, 255, 255, 0.15);
  }
  
  h4 {
    font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    
    svg {
      color: ${({ status }) => 
        status === 'good' ? '#4caf50' : 
        status === 'average' ? '#ff9800' : 
        '#f44336'
      };
      filter: drop-shadow(0 0 3px ${({ status }) => 
        status === 'good' ? '#4caf5080' : 
        status === 'average' ? '#ff980080' : 
        '#f4433680'
      });
    }
  }
  
  p {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .value {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-top: 0.75rem;
    padding-left: 0.25rem;
    border-left: 3px solid ${({ status }) => 
      status === 'good' ? '#4caf5050' : 
      status === 'average' ? '#ff980050' : 
      '#f4433650'
    };
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
`;

const RecommendationsSection = styled.div`
  margin-top: 2.5rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: white;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    
    svg {
      color: ${({ theme }) => theme.secondary};
      filter: drop-shadow(0 0 5px ${({ theme }) => theme.secondary}40);
    }
  }
`;

const RecommendationItem = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: ${({ theme }) => theme.shadowLight};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
  
  &:hover {
    transform: translateX(5px);
    box-shadow: ${({ theme }) => theme.shadow};
    background-color: rgba(255, 255, 255, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => theme.secondary};
    opacity: 0.5;
    left: 0.5rem;
    top: 1.5rem;
  }
  
  h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    color: white;
    padding-left: 1rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  
  p {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    padding-left: 1rem;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: rgba(255, 255, 255, 0.7);
  position: relative;
  
  svg {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.secondary};
    filter: drop-shadow(0 2px 5px ${({ theme }) => theme.secondary}40);
  }
  
  h3 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: white;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
  
  p {
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
  }
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    z-index: -1;
    filter: blur(40px);
  }
  
  &::before {
    background: ${({ theme }) => theme.secondary};
    opacity: 0.15;
    top: 20px;
    left: 15%;
  }
  
  &::after {
    background: ${({ theme }) => theme.primary};
    opacity: 0.15;
    bottom: 20px;
    right: 15%;
  }
`;

const ShinyIcon = styled(motion.div)`
  position: relative;
  color: ${({ theme }) => theme.secondary};
  font-size: 3rem;
  
  &::after {
    content: '';
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    background: radial-gradient(${({ theme }) => theme.secondary}30, transparent 70%);
    border-radius: 50%;
    z-index: -1;
  }
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: rgba(255, 67, 54, 0.1);
  border-left: 4px solid ${({ theme }) => theme.error};
  border-radius: 8px;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  backdrop-filter: blur(5px);
  
  svg {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.error};
  }
`;

// Types
type ScoreResult = {
  score: number;
  metrics: {
    fcp: { value: number; status: 'good' | 'average' | 'poor' };
    lcp: { value: number; status: 'good' | 'average' | 'poor' };
    cls: { value: number; status: 'good' | 'average' | 'poor' };
    tti: { value: number; status: 'good' | 'average' | 'poor' };
    tbt: { value: number; status: 'good' | 'average' | 'poor' };
    si: { value: number; status: 'good' | 'average' | 'poor' };
  };
  recommendations: string[];
};

// Mock API response function
const getMockPerformanceScore = (url: string): Promise<ScoreResult> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!url.match(/^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/)) {
        reject(new Error('Please enter a valid URL'));
        return;
      }
      
      // Generate random scores for demonstration
      const desktopScore = Math.floor(Math.random() * 50) + 50; // 50-99
      
      const getStatus = (value: number, metric: string): 'good' | 'average' | 'poor' => {
        switch(metric) {
          case 'fcp':
            return value < 1.8 ? 'good' : value < 3 ? 'average' : 'poor';
          case 'lcp':
            return value < 2.5 ? 'good' : value < 4 ? 'average' : 'poor';
          case 'cls':
            return value < 0.1 ? 'good' : value < 0.25 ? 'average' : 'poor';
          case 'tti':
            return value < 3.8 ? 'good' : value < 7.3 ? 'average' : 'poor';
          case 'tbt':
            return value < 200 ? 'good' : value < 600 ? 'average' : 'poor';
          case 'si':
            return value < 3.4 ? 'good' : value < 5.8 ? 'average' : 'poor';
          default:
            return 'average';
        }
      };
      
      // Mock metrics
      const fcp = Math.random() * 3 + 0.5; // 0.5-3.5s
      const lcp = Math.random() * 4 + 1; // 1-5s
      const cls = Math.random() * 0.3; // 0-0.3
      const tti = Math.random() * 6 + 1; // 1-7s
      const tbt = Math.random() * 800; // 0-800ms
      const si = Math.random() * 6 + 1; // 1-7s
      
      const recommendations = [
        'Optimize image sizes and use modern formats like WebP',
        'Minify JavaScript and CSS files',
        'Implement lazy loading for below-the-fold content',
        'Use a Content Delivery Network (CDN) for faster resource delivery',
        'Reduce server response time by optimizing backend code',
        'Eliminate render-blocking resources',
        'Reduce unused JavaScript and CSS',
        'Implement proper browser caching'
      ];
      
      // Randomly select 3-5 recommendations
      const shuffled = recommendations.sort(() => 0.5 - Math.random());
      const selectedRecommendations = shuffled.slice(0, Math.floor(Math.random() * 3) + 3);
      
      resolve({
        score: desktopScore,
        metrics: {
          fcp: { value: fcp, status: getStatus(fcp, 'fcp') },
          lcp: { value: lcp, status: getStatus(lcp, 'lcp') },
          cls: { value: cls, status: getStatus(cls, 'cls') },
          tti: { value: tti, status: getStatus(tti, 'tti') },
          tbt: { value: tbt, status: getStatus(tbt, 'tbt') },
          si: { value: si, status: getStatus(si, 'si') }
        },
        recommendations: selectedRecommendations
      });
    }, 2000); // Simulate API delay
  });
};

const SpeedTestTool: React.FC = () => {
  const [url, setUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'desktop' | 'mobile'>('desktop');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ScoreResult | null>(null);

  const handleSubmit = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    // Basic URL validation
    if (!url.match(/^(http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getMockPerformanceScore(url);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during the speed test');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <FontAwesomeIcon icon={faCheck} />;
      case 'average':
        return <FontAwesomeIcon icon={faExclamationTriangle} />;
      case 'poor':
        return <FontAwesomeIcon icon={faTimes} />;
      default:
        return null;
    }
  };

  const getMetricName = (key: string) => {
    switch (key) {
      case 'FCP': return 'First Contentful Paint';
      case 'LCP': return 'Largest Contentful Paint';
      case 'CLS': return 'Cumulative Layout Shift';
      case 'TTI': return 'Time to Interactive';
      case 'TBT': return 'Total Blocking Time';
      case 'SI': return 'Speed Index';
      default: return key;
    }
  };

  const formatMetricValue = (key: string, value: string | number) => {
    switch (key) {
      case 'FCP':
      case 'LCP':
      case 'TTI':
      case 'SI':
        return `${value}s`;
      case 'TBT':
        return `${value}ms`;
      case 'CLS':
        return `${value}`;
      default:
        return value;
    }
  };

  return (
    <SpeedTestContainer>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <div className="noise"></div>
      <div className="content">
        <Title>
          <FontAwesomeIcon icon={faBolt} />
          Website Speed Test
        </Title>
        <Description>
          Test your website's performance on mobile and desktop. Get insights on loading speed and recommendations to improve your site's performance.
        </Description>
        
        <InputGroup>
          <InputIcon>
            <FontAwesomeIcon icon={faBolt} />
          </InputIcon>
          <Input 
            type="text" 
            placeholder="Enter website URL (e.g., example.com)" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin /> Testing...
              </>
            ) : (
              <>
                Test Speed <FontAwesomeIcon icon={faArrowRight} />
              </>
            )}
          </Button>
        </InputGroup>
        
        {error && (
          <ErrorMessage>
            <FontAwesomeIcon icon={faTimes} /> {error}
          </ErrorMessage>
        )}
        
        {result || loading ? (
          <>
            <Tabs>
              <Tab 
                active={activeTab === 'desktop'} 
                onClick={() => setActiveTab('desktop')}
              >
                <FontAwesomeIcon icon={faDesktop} /> Desktop
              </Tab>
              <Tab 
                active={activeTab === 'mobile'} 
                onClick={() => setActiveTab('mobile')}
              >
                <FontAwesomeIcon icon={faMobile} /> Mobile
              </Tab>
            </Tabs>
            
            {loading ? (
              <LoadingContainer>
                <FontAwesomeIcon icon={faSpinner} spin />
                <p>Testing your website's performance...</p>
              </LoadingContainer>
            ) : result && (
              <ResultsContainer>
                <ScoreCard 
                  score={result.score}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ScoreCircle score={result.score}>
                    {result.score}
                  </ScoreCircle>
                  <ScoreInfo>
                    <h3>Performance Score</h3>
                    <p>
                      {result.score >= 90 
                        ? 'Excellent! Your website is performing very well.'
                        : result.score >= 70
                        ? 'Good, but there\'s room for improvement.'
                        : 'Poor performance. Your website needs optimization.'}
                    </p>
                  </ScoreInfo>
                </ScoreCard>
                
                <MetricsGrid>
                  {Object.entries(result.metrics).map(([key, { value, status }]) => (
                    <MetricCard key={key} status={status}>
                      <h4>
                        {getStatusIcon(status)} {getMetricName(key)}
                      </h4>
                      <p>{key === 'CLS' ? 'Lower is better' : 'Faster is better'}</p>
                      <div className="value">{formatMetricValue(key, value)}</div>
                    </MetricCard>
                  ))}
                </MetricsGrid>
                
                {result.recommendations.length > 0 && (
                  <RecommendationsSection>
                    <h3>
                      <FontAwesomeIcon icon={faLightbulb} /> Recommendations
                    </h3>
                    
                    {result.recommendations.map((rec, index) => (
                      <RecommendationItem key={index}>
                        <h4>{rec}</h4>
                        <p>Implementing this recommendation can help improve your website's performance and user experience.</p>
                      </RecommendationItem>
                    ))}
                  </RecommendationsSection>
                )}
              </ResultsContainer>
            )}
          </>
        ) : (
          <NoResults>
            <ShinyIcon
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut"
              }}
            >
              <FontAwesomeIcon icon={faRocket} />
            </ShinyIcon>
            <h3>Enter a URL to Test</h3>
            <p>
              Find out how your website performs and get actionable recommendations to improve its speed and user experience.
            </p>
          </NoResults>
        )}
      </div>
    </SpeedTestContainer>
  );
};

export default SpeedTestTool; 