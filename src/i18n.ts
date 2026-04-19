import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationRU from "./locales/ru/translation.json";
import translationEN from "./locales/en/translation.json";
import translationHE from "./locales/he/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: translationRU },
    en: { translation: translationEN },
    he: { translation: translationHE }
  },
  lng: localStorage.getItem("lang") ?? "ru",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
