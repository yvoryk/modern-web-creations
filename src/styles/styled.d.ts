import 'styled-components';

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
    header: string;
    headerBackground: string;
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
    glassBackground: string;
    centered: boolean;
  }
} 