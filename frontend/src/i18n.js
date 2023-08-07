import i18next from "i18next";

import { initReactI18next } from "react-i18next";
import translationEN from "./locale/en.json";
import translationAR from "./locale/ar.json";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: document.querySelector("html").lang,
    fallbaking: "en",
  });

export default i18next;
