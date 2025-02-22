import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './translations/en';
import es from './translations/es';
import sv from './translations/sv';
import th from './translations/th';

const i18n = new I18n({
  en,
  es,
  sv,
  th,
});

i18n.defaultLocale = 'en';
i18n.enableFallback = true;

// Load saved language preference or use device locale
export const initializeLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('language');
    if (savedLanguage) {
      i18n.locale = savedLanguage;
    } else {
      // Get device locale (e.g., "en-US" or "es-ES")
      const deviceLocale = Localization.locale.split('-')[0];
      // Check if we support this language
      if (Object.keys(i18n.translations).includes(deviceLocale)) {
        i18n.locale = deviceLocale;
      } else {
        i18n.locale = 'en'; // Default to English
      }
      await AsyncStorage.setItem('language', i18n.locale);
    }
  } catch (error) {
    console.error('Error loading language preference:', error);
    i18n.locale = 'en';
  }
};

export const setLanguage = async (language: string) => {
  try {
    i18n.locale = language;
    await AsyncStorage.setItem('language', language);
  } catch (error) {
    console.error('Error saving language preference:', error);
  }
};

export const getLanguage = () => i18n.locale;

export const getSupportedLanguages = () => ({
  en: 'English',
  es: 'Español',
  sv: 'Svenska',
  th: 'ไทย',
});

export default i18n; 