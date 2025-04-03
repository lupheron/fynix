import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uz from "./locales/uz.json";
import en from "./locales/en.json";
import ru from "./locales/ru.json";

i18n.use(initReactI18next).init({
    resources: {
        uz: { translation: uz },
        en: { translation: en },
        ru: { translation: ru }
    },
    lng: localStorage.getItem("lang") || "uz", // Set default language
    fallbackLng: "uz", // Fallback language
    interpolation: { escapeValue: false }
});

// Update HTML lang attribute when language changes
i18n.on("languageChanged", (lng) => {
    document.documentElement.lang = lng;
});

export default i18n;