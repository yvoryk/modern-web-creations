import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Import stylish fonts */
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  /* Optimize viewport height for mobile */
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
    
    /* Fix for mobile 100vh issue */
    --vh: 1vh;
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    touch-action: manipulation; /* Improve touch responsiveness */
    
    /* Mobile optimization for momentum scrolling */
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
    
    /* Prevent pull-to-refresh on mobile */
    overscroll-behavior-y: contain;
    
    /* Prevent text size adjustments */
    -webkit-text-size-adjust: 100%;
  }
  
  /* Fix for 100vh issues on mobile */
  .full-height {
    height: 100vh; /* Fallback */
    height: calc(var(--vh, 1vh) * 100);
  }
  
  a {
    text-decoration: none;
    color: inherit;
    touch-action: manipulation; /* Improve touch responsiveness */
  }
  
  ul, ol {
    list-style: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
    display: block; /* Prevent layout shifts */
    
    /* Prevent dragging on mobile */
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
  
  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    touch-action: manipulation; /* Improve touch responsiveness */
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
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
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
      transform: scale(1.03);
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
  
  /* Animation utility classes with performance optimizations */
  .fade-in {
    animation: fadeIn 0.5s ease-in-out;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
    
    @media (max-width: 768px) {
      animation-duration: 0.3s; /* Faster on mobile */
      will-change: opacity;
      animation-fill-mode: backwards; /* Prevent initial flash */
    }
  }
  
  .slide-up {
    animation: slideInUp 0.6s ease-out;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
    
    @media (max-width: 768px) {
      animation-duration: 0.4s; /* Faster on mobile */
      will-change: transform, opacity;
      animation-fill-mode: backwards; /* Prevent initial flash */
    }
  }
  
  .slide-left {
    animation: slideInLeft 0.6s ease-out;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
    
    @media (max-width: 768px) {
      animation-duration: 0.4s; /* Faster on mobile */
      will-change: transform, opacity;
      animation-fill-mode: backwards; /* Prevent initial flash */
    }
  }
  
  .slide-right {
    animation: slideInRight 0.6s ease-out;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
    
    @media (max-width: 768px) {
      animation-duration: 0.4s; /* Faster on mobile */
      will-change: transform, opacity;
      animation-fill-mode: backwards; /* Prevent initial flash */
    }
  }
  
  .pulse {
    animation: pulse 2s ease-in-out infinite;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
    
    @media (max-width: 768px) {
      animation-duration: 3s; /* Slower on mobile to reduce CPU usage */
      animation-play-state: paused; /* Only animate when visible */
    }
  }
  
  /* Optimize gradient animations for mobile */
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
      background-size: 150% auto; /* Smaller gradient range to reduce GPU usage */
    }
  }
  
  /* Apply optimizations to all gradient text variants */
  .gradient-text-blue, 
  .gradient-text-purple, 
  .gradient-text-rainbow, 
  .gradient-text-sunset, 
  .gradient-text-neon {
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
      background-size: 150% auto; /* Smaller gradient range to reduce GPU usage */
    }
  }
  
  /* Optimize gradient backgrounds for mobile */
  .gradient-bg-blue,
  .gradient-bg-yellow,
  .gradient-bg-rainbow,
  .gradient-bg-purple,
  .gradient-bg-cyan,
  .gradient-bg-sunset,
  .gradient-bg-pastel,
  .gradient-bg-ocean {
    background-size: 200% 200%;
    animation: gradientAnimation 8s ease infinite;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
      background-position: 0% 50%;
    }
    
    @media (max-width: 768px) {
      animation-duration: 12s; /* Slower on mobile */
      background-size: 150% 150%; /* Smaller gradient range to reduce GPU usage */
    }
  }
  
  /* Special handling for neon effects */
  .gradient-bg-neon {
    background-size: 200% 200%;
    animation: gradientAnimation 8s ease infinite, hue-rotate 15s linear infinite;
    
    @media (prefers-reduced-motion: reduce) {
      animation: none;
      background-position: 0% 50%;
    }
    
    @media (max-width: 768px) {
      animation: gradientAnimation 12s ease infinite; /* Only one animation on mobile */
      background-size: 150% 150%; /* Smaller gradient range */
    }
  }
  
  /* Optimize border gradients for mobile */
  .gradient-border,
  .gradient-border-blue {
    &::before {
      animation: gradientAnimation 5s ease infinite;
      
      @media (prefers-reduced-motion: reduce) {
        animation: none;
        background-position: 0% 50%;
      }
      
      @media (max-width: 768px) {
        animation-duration: 8s; /* Slower on mobile */
      }
    }
  }
  
  /* Glass morphism utility class - optimize for mobile */
  .glass, .dark-glass {
    backdrop-filter: blur(10px);
    
    @media (max-width: 768px) {
      backdrop-filter: blur(5px); /* Reduced blur for better performance */
    }
  }
`;

export default GlobalStyles; 