import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// Add translations
const resources = {
    en: {
        translation: {
            "navbar.signIn": "Sign in",
            "navbar.account": "Account",
            "navbar.searchHint":"Search for items"
        }
    },
    ar: {
        translation: {
            "navbar.signIn": "تسجيل الدخول",
            "navbar.account": "حساب",
            "navbar.searchHint":"إبحث عن منتجات"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false // React already escapes values
        }
    });
export default i18n