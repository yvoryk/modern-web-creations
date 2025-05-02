import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    primaryLight: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    accent: string;
    tertiary: string;
    background: string;
    backgroundAlt: string;
    text: string;
    textLight: string;
    textDark: string;
    border: string;
    boxShadow: string;
    shadow: string;
    shadowLight: string;
    cardBackground: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    yellow: string;
    blue: string;
    green: string;
    red: string;
    purple: string;
    gradient: string;
    gradientBlue: string;
    gradientYellow: string;
    gradientMixed: string;
    gradientPurple: string;
    gradientCyan: string;
    gradientRed: string;
    gradientGreen: string;
    gradientSunset: string;
    gradientFrost: string;
    gradientRainbow: string;
    glassBackground: string;
    headerBackground: string;
    header: string;
    centered: boolean;
  }
}

export const lightTheme: DefaultTheme = {
  primary: '#0075FF',       // Vibrant blue
  primaryLight: '#4A9EFF',  // Lighter blue
  primaryHover: '#005BC2',  // Darker blue
  secondary: '#FFD200',     // Bright yellow
  secondaryHover: '#FFAA00', // Golden yellow
  accent: '#FFE047',        // Light yellow
  tertiary: '#00C2FF',      // Light blue
  background: '#FFFFFF',
  backgroundAlt: '#F8FAFF', // Slight blue tint
  text: '#2A2A2A',
  textLight: '#666666',
  textDark: '#111111',
  border: '#E5E5E5',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  shadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
  shadowLight: '0 5px 15px rgba(0, 0, 0, 0.05)',
  cardBackground: '#FFFFFF',
  success: '#00C853',
  error: '#FF3D00',
  warning: '#FF9800',
  info: '#2196F3',
  yellow: '#FFD200',
  blue: '#0075FF',
  green: '#00C853',
  red: '#D50000',
  purple: '#AA00FF',
  gradient: 'linear-gradient(120deg, #0075FF, #00C2FF, #0075FF)',
  gradientBlue: 'linear-gradient(135deg, #0075FF 0%, #00AAFF 50%, #4A9EFF 100%)',
  gradientYellow: 'linear-gradient(135deg, #FFD200 0%, #FFAA00 50%, #FFE047 100%)',
  gradientMixed: 'linear-gradient(135deg, #0075FF 0%, #00C2FF 35%, #7A73FF 65%, #FFD200 100%)',
  gradientPurple: 'linear-gradient(135deg, #AA00FF 0%, #CC66FF 50%, #DD88FF 100%)',
  gradientCyan: 'linear-gradient(135deg, #00C2FF 0%, #00E5FF 50%, #66F2FF 100%)',
  gradientRed: 'linear-gradient(135deg, #D50000 0%, #FF1744 50%, #FF5252 100%)',
  gradientGreen: 'linear-gradient(135deg, #00C853 0%, #00E676 50%, #69F0AE 100%)',
  gradientSunset: 'linear-gradient(135deg, #FFD200 0%, #FFAA00 50%, #FF9800 100%)',
  gradientFrost: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 50%, #03A9F4 100%)',
  gradientRainbow: 'linear-gradient(135deg, #0075FF 0%, #00C2FF 25%, #FFD200 50%, #FFAA00 75%, #0075FF 100%)',
  glassBackground: 'rgba(255, 255, 255, 0.7)',
  headerBackground: 'rgba(240, 247, 255, 0.9)',
  header: '#FFFFFF',
  centered: true,
};

export const darkTheme: DefaultTheme = {
  primary: '#0088FF',       // Brighter blue for dark mode
  primaryLight: '#66BBFF',  // Lighter blue for dark mode
  primaryHover: '#00AAFF',  // Darker blue for dark mode
  secondary: '#FFD200',     // Bright yellow
  secondaryHover: '#FFAA00', // Golden yellow
  accent: '#FFE673',        // Brighter yellow accent for dark mode
  tertiary: '#00C2FF',      // Light blue
  background: '#0A1A2F',    // Dark blue background
  backgroundAlt: '#152A40', // Dark blue undertone
  text: '#F0F0F0',
  textLight: '#A0A0A0',
  textDark: '#FFFFFF',
  border: '#1E3A5F',        // Blue-tinted border
  boxShadow: '0 8px 30px rgba(0, 136, 255, 0.2)',
  shadow: '0 10px 30px rgba(0, 136, 255, 0.2)',
  shadowLight: '0 5px 15px rgba(0, 136, 255, 0.1)',
  cardBackground: '#152A40',
  success: '#00E676',
  error: '#FF5722',
  warning: '#FF9800',
  info: '#2196F3',
  yellow: '#FFD200',
  blue: '#0088FF',
  green: '#00C853',
  red: '#D50000',
  purple: '#AA00FF',
  gradient: 'linear-gradient(120deg, #0088FF, #00D2FF, #0088FF)',
  gradientBlue: 'linear-gradient(135deg, #0088FF 0%, #00CCFF 50%, #66BBFF 100%)',
  gradientYellow: 'linear-gradient(135deg, #FFD200 0%, #FFAA00 50%, #FFE673 100%)',
  gradientMixed: 'linear-gradient(135deg, #0088FF 0%, #00D2FF 35%, #FFD200 65%, #FFAA00 100%)',
  gradientPurple: 'linear-gradient(135deg, #AA00FF 0%, #D880FF 50%, #E6ABFF 100%)',
  gradientCyan: 'linear-gradient(135deg, #00D2FF 0%, #00E5FF 50%, #80EEFF 100%)',
  gradientRed: 'linear-gradient(135deg, #FF3D00 0%, #FF5722 50%, #FF8A65 100%)',
  gradientGreen: 'linear-gradient(135deg, #00E676 0%, #00C853 50%, #69F0AE 100%)',
  gradientSunset: 'linear-gradient(135deg, #FFD200 0%, #FFAA00 50%, #FF9800 100%)',
  gradientFrost: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 50%, #03A9F4 100%)',
  gradientRainbow: 'linear-gradient(135deg, #0088FF 0%, #00D2FF 25%, #FFD200 50%, #FFAA00 75%, #0088FF 100%)',
  glassBackground: 'rgba(10, 26, 47, 0.85)',
  headerBackground: 'rgba(10, 26, 47, 0.9)',
  header: '#0A1A2F',
  centered: true,
}; 