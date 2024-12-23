import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Définissez vos traductions ici
const resources = {
  
};

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: {
        accueil: "الرئيسية",
        decouvrir: "اكتشاف",
        apropos: "حول",
        faq: "الأسئلة الشائعة",
        avis: "آراء",
        publier: "انشر ممتلكاتك",
        login: "دخول",
        langue: "اختر لغتك",
        Arabe: "العربية",
        Français: "الفرنسية",
      },
    },
    fr: {
      translation: {
        accueil: "Accueil",
        decouvrir: "Découvrir",
        apropos: "À propos",
        faq: "FAQ",
        avis: "Avis",
        publier: "+ Publier votre bien",
        login: "Se connecter",
        langue: "Choisissez votre langue",
        Arabe: "Arabe",
        Français: "Français",
      },
    },
  },
  lng: "fr", // Langue par défaut
  fallbackLng: "fr", // Langue de secours
  interpolation: {
    escapeValue: false, // React se charge de l'échappement des valeurs
  },
});

export default i18n;
