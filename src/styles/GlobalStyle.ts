import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --transition-speed: 0.3s;
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;
    --border-radius-xl: 16px;
    --border-radius-rounded: 9999px;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --cursor-visibility: auto;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent; /* Prevent tap highlight on mobile */
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => `${theme.primary} ${theme.backgroundAlt}`};
    font-size: 16px; /* Base font size */
    
    /* Adjust font size for mobile */
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
    transition: all var(--transition-speed) var(--ease-out);
    cursor: var(--cursor-visibility) !important;
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-size-adjust: 100%; /* Fix text resizing issues on orientation change */
  }

  /* Only apply cursor: none when the custom-cursor class is present */
  body.custom-cursor {
    cursor: none !important;
    
    /* apply to all elements only when custom cursor is enabled */
    * {
      cursor: none !important;
    }
    
    /* Special cursor handling for interactive elements */
    a, button, input[type="submit"], input[type="button"], 
    select, [role="button"], .clickable, 
    input, textarea, label, [tabindex], [onclick] {
      cursor: none !important;
    }
  }

  /* Default styles for elements when custom cursor is disabled */
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
    transition: color var(--transition-speed) var(--ease-out);
    
    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
    
    /* Make buttons/links larger touch targets on mobile */
    @media (max-width: 768px) {
      padding: 0.5rem;
      display: inline-block;
    }
  }

  button {
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    border-radius: var(--border-radius-md);
    transition: all var(--transition-speed) var(--ease-out);
    
    /* Larger touch targets on mobile */
    @media (max-width: 768px) {
      min-height: 44px;
      min-width: 44px;
    }
  }

  input, select, textarea {
    font-family: 'Poppins', sans-serif;
    border-radius: var(--border-radius-sm);
    border: 1px solid ${({ theme }) => theme.border};
    padding: 8px 12px;
    transition: all var(--transition-speed) var(--ease-out);
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 0 0 2px ${({ theme }) => `${theme.primary}20`};
    }
    
    /* Larger inputs on mobile */
    @media (max-width: 768px) {
      padding: 12px 16px;
      font-size: 16px; /* Prevent zoom on iOS */
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius-sm);
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    
    @media (max-width: 768px) {
      padding: 0 1rem;
    }
  }

  section {
    padding: 5rem 0;
    
    @media (max-width: 768px) {
      padding: 3rem 0;
    }
  }

  .card {
    background-color: ${({ theme }) => theme.cardBackground};
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-lg);
    }
    
    /* Prevent hover effects on touch devices */
    @media (hover: none) {
      &:hover {
        transform: none;
      }
    }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.backgroundAlt};
    border-radius: var(--border-radius-rounded);
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary};
    border-radius: var(--border-radius-rounded);
    
    &:hover {
      background: ${({ theme }) => theme.primaryHover};
    }
  }

  /* Optimize animations on low-power devices */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  
  /* Fix for 100vh issue on mobile browsers */
  .full-height {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
  }
  
  /* Fix for mobile viewport issues */
  @media screen and (max-width: 768px) {
    .container {
      overflow-x: hidden;
      width: 100%;
    }
    
    body {
      overflow-x: hidden;
      position: relative;
    }
  }
`;

// Add a function to fix the viewport height for mobile browsers
if (typeof window !== 'undefined') {
  // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  // We listen to the resize event
  window.addEventListener('resize', () => {
    // We execute the same script as before
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
}

export default GlobalStyle; 