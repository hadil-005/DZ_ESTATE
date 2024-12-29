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
        publierp: "انشر ممتلكاتك",
        login: "دخول",
        langue: "اختر لغتك",
        Arabe: "العربية",
        Français: "الفرنسية",
        Publier: "نشر عقارك",
        Wilaya: "الولاية",
        Commune: "البلدية",
        Addresse: "الموقع الجغرافي (حسب خرائط Google)",
        Titre: "عنوان المنشور",
        Description: "الوصف",
        Surface: "المساحة",
        Prix: "السعر",
        wilaya: "يرجى إدخال الولاية",
        commune: "يرجى إدخال البلدية",
        addresse: "يرجى إدخال العنوان",
        titre: "يرجى إدخال العنوان",
        description: "يرجى إضافة وصف",
        prix: "يرجى إدخال السعر (دج)",
        surface: " يرجى إدخال المساحة(م²)",
        vendre: "للبيع",
        louer: "للكراء",
        publier: "نشر",
        photo: "إضافة صورة",
        Photos: "إضافة صور",
        vidéo: "إضافة فيديو",
        Vidéo: "إضافة مقاطع فيديو",
        select: "اختر",
        appa: "شقة",
        mai: "منزل",
        stu: "استوديو",
        villa: "فيلا",
        Type: "نوع العقار",
        ch: "عدد الغرف",
        jar: "مساحة الحديقة (م²)",
      },
    },
    fr: {
      translation: {
        accueil: "Accueil",
        decouvrir: "Découvrir",
        apropos: "À propos",
        faq: "FAQ",
        avis: "Avis",
        publierp: "+ Publier votre bien",
        login: "Se connecter",
        langue: "Choisissez votre langue",
        Arabe: "Arabe",
        Français: "Français",
        Publier: "Publier votre bien",
        Wilaya: " Wilaya",
        Commune: " Commune",
        Addresse: "Addresse(Celle de Google Maps)",
        Titre: "Titre de publication",
        wilaya: "veuillez saisie la wilaya ",
        commune: "veuillez saisie la commune",
        addresse: "veuillez saisie l'addresse",
        titre: "veuillez saisie le titre",
        description: "veuillez ajouter une description",
        prix: "veuillez saisie votre le prix (DA)",
        surface: "veuillez saisie votre la surface (m²)",
        vendre: " A vendre",
        louer: "A louer",
        publier: "Publier",
        photo: "Ajouter une photo",
        Photos: " Ajouter des photos",
        vidéo: "Ajouter une vidéo",
        Vidéo: " Ajouter des vidéos ",
        select: "Sélectionner",
        appa: " Appartement",
        mai: "Maison",
        stu: "Studio",
        villa: "Villa",
        Type: "Type",
        ch: "Nombre de chambres",
        jar: "Surface du jardin (en m²)",
        connectez_vous_publier: "Veuillez vous connecter pour publier un bien.",
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
