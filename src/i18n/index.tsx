import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupportedLanguage } from '../types';
import { translations, Translations } from './translations';

interface I18nContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
}

const STORAGE_LANG_KEY = '@tapzacare_language';

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_LANG_KEY).then(savedLang => {
      if (savedLang && (savedLang === 'en' || savedLang === 'hi' || savedLang === 'te')) {
        setLanguageState(savedLang as SupportedLanguage);
      }
    }).catch(() => {
      // ignore storage failure, keep default
    });
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    AsyncStorage.setItem(STORAGE_LANG_KEY, lang).catch(() => {});
  };

  const t = translations[language] || translations.en;

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  return useContext(I18nContext);
};
