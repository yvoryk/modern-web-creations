import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './context/ThemeContext';

// Performance monitoring function
const sendToAnalytics = (metric: any) => {
  // In production, you would send metrics to your analytics service
  console.log(metric);
  
  // Send to Google Analytics if available
  if (window.gtag) {
    window.gtag('event', 'web-vitals', {
      event_category: 'Web Vitals',
      event_label: metric.name,
      value: Math.round(metric.value),
      non_interaction: true,
    });
  }
};

// Root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

// Render application with StrictMode for better development experience
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Measure and report performance metrics
reportWebVitals(sendToAnalytics);

// Add window type for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: any) => void;
  }
}
