import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

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
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => `${theme.primary} ${theme.backgroundAlt}`};
  }

  body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.6;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
    transition: all var(--transition-speed) var(--ease-out);
    cursor: none !important; /* Hide default cursor with !important */
    /* add global style for all elements to ensure cursor hiding */
    * {
      cursor: none !important;
    }
  }

  /* Apply cursor: none to all interactive elements with !important to override browser defaults */
  a, button, input[type="submit"], input[type="button"], 
  select, [role="button"], .clickable, 
  input, textarea, label, [tabindex], [onclick] {
    cursor: none !important;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.primary};
    transition: color var(--transition-speed) var(--ease-out);
    
    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }

  button {
    font-family: 'Poppins', sans-serif;
    cursor: pointer;
    border-radius: var(--border-radius-md);
    transition: all var(--transition-speed) var(--ease-out);
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
  }

  section {
    padding: 5rem 0;
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

  @media (max-width: 768px) {
    section {
      padding: 3rem 0;
    }
  }
`;

export default GlobalStyle; 