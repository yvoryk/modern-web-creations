import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

// Fix for Instagram in-app browser
// This will force a small delay before rendering to prevent flickering
const renderApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Failed to find the root element');
  }
  
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <Router>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Router>
    </React.StrictMode>
  );
};

// Check if running in Instagram browser and apply special handling
const isInstagramBrowser = /Instagram/.test(navigator.userAgent);
if (isInstagramBrowser) {
  // Add Instagram-specific class to body
  document.body.classList.add('instagram-browser');
  
  // Small delay for Instagram browser to stabilize
  setTimeout(renderApp, 50);
} else {
  // Normal rendering for other browsers
  renderApp();
}

// Measure performance but don't log to console in production
reportWebVitals(process.env.NODE_ENV === 'development' 
  ? (metric) => console.log(metric) 
  : undefined
);

// Add window type for gtag
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: any) => void;
  }
}
