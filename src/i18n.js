import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en/translation.json';
import hi from '@/locales/hi/translation.json';

// Retrieve the language from local storage or use the default 'en'
const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        hi: {
            translation: hi,
        },
    },
    lng: savedLanguage.slice(0, 2).toLowerCase(), // Use the saved language
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
