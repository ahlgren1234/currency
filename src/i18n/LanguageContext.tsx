import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n, { initializeLanguage, setLanguage, getLanguage, getSupportedLanguages } from './i18n';

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => Promise<void>;
  t: (scope: string, options?: any) => string;
  supportedLanguages: { [key: string]: string };
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: async () => {},
  t: (scope: string) => scope,
  supportedLanguages: getSupportedLanguages(),
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState(getLanguage());

  useEffect(() => {
    initializeLanguage().then(() => {
      setLanguageState(getLanguage());
    });
  }, []);

  const handleSetLanguage = async (newLanguage: string) => {
    await setLanguage(newLanguage);
    setLanguageState(newLanguage);
  };

  const t = (scope: string, options?: any) => {
    return i18n.t(scope, options);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
        supportedLanguages: getSupportedLanguages(),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}; 