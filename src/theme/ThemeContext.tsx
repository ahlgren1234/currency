import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, darkColors } from './colors';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof colors;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
  theme: colors,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load saved theme preference
    AsyncStorage.getItem('isDarkMode')
      .then((value: string | null) => {
        if (value !== null) {
          setIsDarkMode(JSON.parse(value));
        }
      })
      .catch((error: Error) => {
        console.error('Error loading theme preference:', error);
      });
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      // Save theme preference
      AsyncStorage.setItem('isDarkMode', JSON.stringify(newValue))
        .catch((error: Error) => {
          console.error('Error saving theme preference:', error);
        });
      return newValue;
    });
  };

  const theme = isDarkMode ? darkColors : colors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 