import { useMemo } from 'react';

// Import all translation files
import en from '../translations/en.json';
import ml from '../translations/ml.json';
import hi from '../translations/hi.json';
import ta from '../translations/ta.json';
import te from '../translations/te.json';
import kn from '../translations/kn.json';
import gu from '../translations/gu.json';
import or from '../translations/or.json';
import bn from '../translations/bn.json';
import mr from '../translations/mr.json';
import pa from '../translations/pa.json';

const translations = {
  en,
  ml,
  hi,
  ta,
  te,
  kn,
  gu,
  or,
  bn,
  mr,
  pa,
};

type TranslationKey = string;
type LanguageCode = keyof typeof translations;

export const useTranslation = (languageCode: string) => {
  const t = useMemo(() => {
    const lang = languageCode as LanguageCode;
    const selectedTranslations = translations[lang] || translations.en;
    
    return (key: TranslationKey): string => {
      const keys = key.split('.');
      let value: any = selectedTranslations;
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      // Fallback to English if translation not found
      if (!value && lang !== 'en') {
        let englishValue: any = translations.en;
        for (const k of keys) {
          englishValue = englishValue?.[k];
        }
        value = englishValue;
      }
      
      return value || key;
    };
  }, [languageCode]);

  return { t };
};