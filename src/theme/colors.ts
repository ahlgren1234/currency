// Orange Theme
const orangeColors = {
  primary: '#FF7B3D',
  secondary: '#FFB088',
  background: '#F9F9F9',
  white: '#FFFFFF',
  black: '#000000',
  text: '#2D3436',
  gray: '#636E72',
  lightGray: '#B2BEC3',
  error: '#FF5252',
  success: '#00C49A',
  card: '#FFFFFF',
  shadow: 'rgba(255, 123, 61, 0.15)',
};

// Purple Theme
const purpleColors = {
  primary: '#6C5CE7',
  secondary: '#A8A5E6',
  background: '#F9F9F9',
  white: '#FFFFFF',
  black: '#000000',
  text: '#2D3436',
  gray: '#636E72',
  lightGray: '#B2BEC3',
  error: '#FF5252',
  success: '#00C49A',
  card: '#FFFFFF',
  shadow: 'rgba(108, 92, 231, 0.15)',
};

// Teal Theme
const tealColors = {
  primary: '#00B2B2',
  secondary: '#66E0E0',
  background: '#F9F9F9',
  white: '#FFFFFF',
  black: '#000000',
  text: '#2D3436',
  gray: '#636E72',
  lightGray: '#B2BEC3',
  error: '#FF5252',
  success: '#00C49A',
  card: '#FFFFFF',
  shadow: 'rgba(0, 178, 178, 0.15)',
};

export const colorSchemes = {
  orange: {
    name: 'Orange Sunset',
    colors: orangeColors,
    darkColors: {
      ...orangeColors,
      background: '#1A1A1A',
      card: '#2D2D2D',
      text: '#FFFFFF',
      gray: '#A0A0A0',
      lightGray: '#666666',
      shadow: 'rgba(255, 123, 61, 0.25)',
    },
  },
  purple: {
    name: 'Royal Purple',
    colors: purpleColors,
    darkColors: {
      ...purpleColors,
      background: '#1A1A1A',
      card: '#2D2D2D',
      text: '#FFFFFF',
      gray: '#A0A0A0',
      lightGray: '#666666',
      shadow: 'rgba(108, 92, 231, 0.25)',
    },
  },
  teal: {
    name: 'Ocean Teal',
    colors: tealColors,
    darkColors: {
      ...tealColors,
      background: '#1A1A1A',
      card: '#2D2D2D',
      text: '#FFFFFF',
      gray: '#A0A0A0',
      lightGray: '#666666',
      shadow: 'rgba(0, 178, 178, 0.25)',
    },
  },
};

export type ColorScheme = keyof typeof colorSchemes;
export const defaultScheme: ColorScheme = 'orange';

// For backward compatibility and type safety
export const colors = colorSchemes[defaultScheme].colors;
export const darkColors = colorSchemes[defaultScheme].darkColors; 