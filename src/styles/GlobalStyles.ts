import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Import stylish fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  :root {
    /* Gradient CSS Variables */
    --gradient-blue: linear-gradient(135deg, #0075FF 0%, #00AAFF 50%, #4A9EFF 100%);
    --gradient-yellow: linear-gradient(135deg, #FFD200 0%, #FFAA00 50%, #FFE047 100%);
    --gradient-purple: linear-gradient(135deg, #8A2BE2 0%, #AA00FF 50%, #C71585 100%);
    --gradient-cyan: linear-gradient(135deg, #00FFFF 0%, #00C2FF 50%, #1E90FF 100%);
    --gradient-red: linear-gradient(135deg, #FF3D00 0%, #FF0000 50%, #B22222 100%);
    --gradient-green: linear-gradient(135deg, #00C853 0%, #4CAF50 50%, #009688 100%);
    --gradient-mixed: linear-gradient(135deg, #0075FF 0%, #00C2FF 35%, #7A73FF 65%, #FFD200 100%);
    --gradient-rainbow: linear-gradient(to right, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3);
    --gradient-frost: linear-gradient(135deg, #E0FFFF 0%, #87CEFA 50%, #1E90FF 100%);
    --gradient-sunset: linear-gradient(135deg, #FF7F00 0%, #FF4500 50%, #FF0000 100%);
    --gradient-neon: linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #FFFF00 100%);
    --gradient-pastel: linear-gradient(135deg, #FFD1DC 0%, #BFFCC6 30%, #C4E0FF 60%, #FFD1DC 100%);
    --gradient-ocean: linear-gradient(135deg, #006994 0%, #00BFFF 35%, #00008B 70%, #120A8F 100%);
    --gradient-fire: linear-gradient(135deg, #FFFF00 0%, #FFA500 25%, #FF4500 50%, #8B0000 100%);
    --gradient-cosmos: linear-gradient(135deg, #000033 0%, #191970 30%, #483D8B 50%, #9370DB 70%, #E6E6FA 100%);
    
    /* Font Families */
    --font-primary: 'Inter', 'Montserrat', sans-serif;
    --font-secondary: 'Poppins', sans-serif;
    --font-accent: 'Raleway', sans-serif;
    --font-modern: 'Space Grotesk', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    font-family: var(--font-primary);
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    line-height: 1.5;
    font-size: 16px;
    scroll-behavior: smooth;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  ul, ol {
    list-style: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }
  
  h1 {
    font-family: var(--font-modern);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  
  h2, h3 {
    font-family: var(--font-secondary);
    font-weight: 700;
    line-height: 1.2;
  }
  
  h4, h5, h6 {
    font-family: var(--font-accent);
    font-weight: 600;
    line-height: 1.3;
  }

  /* Custom cursor styling */
  .custom-cursor {
    cursor: none !important;
  }
  
  .custom-cursor * {
    cursor: none !important;
  }

  /* Enhanced Animation styles */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
  
  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  @keyframes hue-rotate {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
  
  @keyframes textShadowPulse {
    0% {
      text-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
    }
    50% {
      text-shadow: 0 0 12px rgba(255, 255, 255, 0.8);
    }
    100% {
      text-shadow: 0 0 4px rgba(255, 255, 255, 0.5);
    }
  }
  
  /* Animation utility classes */
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
    
    @media (max-width: 768px) {
      animation-duration: 0.3s; /* Faster on mobile */
    }
  }
  
  .slide-up {
    animation: slideInUp 0.6s ease-out;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
    
    @media (max-width: 768px) {
      animation-duration: 0.4s; /* Faster on mobile */
    }
  }
  
  .slide-left {
    animation: slideInLeft 0.6s ease-out;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
    
    @media (max-width: 768px) {
      animation-duration: 0.4s; /* Faster on mobile */
    }
  }
  
  .slide-right {
    animation: slideInRight 0.6s ease-out;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
    
    @media (max-width: 768px) {
      animation-duration: 0.4s; /* Faster on mobile */
    }
  }
  
  .pulse {
    animation: pulse 2s ease-in-out infinite;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
    
    @media (max-width: 768px) {
      animation-duration: 3s; /* Slower on mobile to reduce CPU usage */
    }
  }
  
  /* Typography utility classes */
  .text-montserrat {
    font-family: 'Montserrat', sans-serif;
  }
  
  .text-poppins {
    font-family: 'Poppins', sans-serif;
  }
  
  .text-raleway {
    font-family: 'Raleway', sans-serif;
  }
  
  .text-space {
    font-family: 'Space Grotesk', sans-serif;
  }
  
  .text-thin {
    font-weight: 300;
    letter-spacing: 0.02em;
  }
  
  .text-bold {
    font-weight: 700;
  }
  
  .text-extrabold {
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .text-shadow-glow {
    animation: textShadowPulse 3s ease-in-out infinite;
  }
  
  .text-uppercase {
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .text-spaced {
    letter-spacing: 0.1em;
  }
  
  /* Gradient text utility classes */
  .gradient-text {
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: gradientAnimation 5s ease infinite;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
      background-position: 0% 50%;
    }
    
    @media (max-width: 768px) {
      animation-duration: 8s; /* Slower on mobile */
    }
  }
  
  .gradient-text-blue {
    background: var(--gradient-blue);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: gradientAnimation 5s ease infinite;
  }
  
  .gradient-text-purple {
    background: var(--gradient-purple);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: gradientAnimation 5s ease infinite;
  }
  
  .gradient-text-rainbow {
    background: var(--gradient-rainbow);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: gradientAnimation 5s ease infinite;
  }
  
  .gradient-text-sunset {
    background: var(--gradient-sunset);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: gradientAnimation 5s ease infinite;
  }
  
  .gradient-text-neon {
    background: var(--gradient-neon);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    animation: gradientAnimation 5s ease infinite, hue-rotate 15s linear infinite;
  }
  
  /* Underline effects */
  .fancy-underline {
    position: relative;
    display: inline-block;
  }
  
  .fancy-underline::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--gradient-blue);
    background-size: 200% auto;
    animation: gradientAnimation 5s ease infinite;
    border-radius: 3px;
    transform: scaleX(0.6);
    transform-origin: center;
    transition: transform 0.3s ease;
  }
  
  .fancy-underline:hover::after {
    transform: scaleX(1);
  }
  
  /* Gradient background classes */
  .gradient-bg-blue {
    background: var(--gradient-blue);
    background-size: 200% 200%;
    animation: gradientAnimation 8s ease infinite;
  }
  
  .gradient-bg-yellow {
    background: var(--gradient-yellow);
    background-size: 200% 200%;
    animation: gradientAnimation 8s ease infinite;
  }
  
  .gradient-bg-rainbow {
    background: var(--gradient-rainbow);
    background-size: 200% 200%;
    animation: gradientAnimation 8s ease infinite;
  }
  
  .gradient-bg-purple {
    background: var(--gradient-purple);
    background-size: 200% 200%;
    animation: gradientAnimation 8s ease infinite;
  }
  
  .gradient-bg-cyan {
    background: var(--gradient-cyan);
    background-size: 200% 200%;
    animation: gradientAnimation 8s ease infinite;
  }
  
  .gradient-bg-sunset {
    background: var(--gradient-sunset);
    background-size: 200% 200%;
    animation: gradientAnimation 8s ease infinite;
  }
  
  .gradient-bg-neon {
    background: var(--gradient-neon);
    background-size: 200% 200%;
    animation: gradientAnimation 8s ease infinite, hue-rotate 15s linear infinite;
  }
  
  .gradient-bg-pastel {
    background: var(--gradient-pastel);
    background-size: 200% 200%;
    animation: gradientAnimation 8s ease infinite;
  }
  
  .gradient-bg-ocean {
    background: var(--gradient-ocean);
    background-size: 200% 200%;
    animation: gradientAnimation 8s ease infinite;
  }
  
  /* Border gradient utility classes */
  .gradient-border {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 2px;
      background: var(--gradient-rainbow);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: gradientAnimation 5s ease infinite;
      pointer-events: none;
    }
  }
  
  .gradient-border-blue {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 2px;
      background: var(--gradient-blue);
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: gradientAnimation 5s ease infinite;
      pointer-events: none;
    }
  }
  
  /* Glass morphism utility class */
  .glass {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Dark mode glass */
  .dark-glass {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  /* Gradient glow */
  .gradient-glow {
    position: relative;
    z-index: 1;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: inherit;
      background: inherit;
      filter: blur(15px);
      opacity: 0.7;
      z-index: -1;
    }
  }
`;

export default GlobalStyles; 