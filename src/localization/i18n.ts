import i18n, { use } from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import translationArabic from './local/ar';
import translationEnglish from './local/en';

const resources = {
  ar: {
    translation: translationArabic,
  },
  en: {
    translation: translationEnglish,
  },
};
use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    react: { useSuspense: false },
  });

export default i18n;
