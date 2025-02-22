import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorSchemes, ColorScheme, defaultScheme } from './colors';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof colorSchemes[ColorScheme]['colors'];
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
  theme: colorSchemes[defaultScheme].colors,
  colorScheme: defaultScheme,
  setColorScheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(defaultScheme);

  useEffect(() => {
    // Load saved preferences
    Promise.all([
      AsyncStorage.getItem('isDarkMode'),
      AsyncStorage.getItem('colorScheme'),
    ])
      .then(([savedTheme, savedScheme]) => {
        if (savedTheme !== null) {
          setIsDarkMode(JSON.parse(savedTheme));
        }
        if (savedScheme !== null && savedScheme in colorSchemes) {
          setColorScheme(savedScheme as ColorScheme);
        }
      })
      .catch((error: Error) => {
        console.error('Error loading theme preferences:', error);
      });
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      AsyncStorage.setItem('isDarkMode', JSON.stringify(newValue))
        .catch((error: Error) => {
          console.error('Error saving theme preference:', error);
        });
      return newValue;
    });
  };

  const handleSetColorScheme = (scheme: ColorScheme) => {
    setColorScheme(scheme);
    AsyncStorage.setItem('colorScheme', scheme)
      .catch((error: Error) => {
        console.error('Error saving color scheme:', error);
      });
  };

  const theme = isDarkMode 
    ? colorSchemes[colorScheme].darkColors 
    : colorSchemes[colorScheme].colors;

  return (
    <ThemeContext.Provider 
      value={{ 
        isDarkMode, 
        toggleTheme, 
        theme,
        colorScheme,
        setColorScheme: handleSetColorScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}; 