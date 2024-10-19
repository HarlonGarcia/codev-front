import { initReactI18next } from 'react-i18next';

import i18next from 'i18next';

import en from './languages/en.json';
import pt from './languages/pt.json';

i18next.use(initReactI18next).init({
  resources: {
    en,
    pt,
  },
  ns: ['translation'],
  debug: false,
  lng: 'pt',
  fallbackLng: 'pt',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    format: (value, format) => {
      if ('uppercase' === format) {
        return `${value || ''}`.toUpperCase();
      }

      return value;
    },
  },


});