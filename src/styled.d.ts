import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    primaryLight: string;
    primaryHover: string;
    secondary: string;
    secondaryHover: string;
    accent: string;
    background: string;
    cardBackground: string;
    text: string;
    textLight: string;
    border: string;
    shadow: string;
    success: string;
    error: string;
    warning: string;
  }
} 