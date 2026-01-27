import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      about: 'About',
      vision: 'Vision & Mission',
      members: 'Organisation Members',
      resources: 'Resources',
      gallery: 'Gallery',
      blog: 'Blog & News',
      contact: 'Contact',
      
      // Districts
      districts: {
        title: 'Karnataka Districts',
        bengaluru: 'Bengaluru Urban',
        mysuru: 'Mysuru',
        mangaluru: 'Dakshina Kannada',
        belagavi: 'Belagavi',
        hubli: 'Hubli-Dharwad',
      },
      
      // Homepage
      hero: {
        title: 'Empowering Education Across Karnataka',
        subtitle: 'Building a brighter future through quality education and community engagement',
      },
      testimonials: {
        title: 'What People Say',
      },
      circulars: {
        title: 'Latest Circulars',
      },
      
      // Resources
      resourcesPage: {
        title: 'Educational Resources',
        subtitle: 'Access quality learning materials and resources',
        subjects: 'Subjects',
      },
      
      // Gallery
      galleryPage: {
        title: 'Photo Gallery',
        subtitle: 'Moments from our educational journey',
      },
      
      // Blog
      blogPage: {
        title: 'News & Updates',
        subtitle: 'Latest news and press coverage',
      },
      
      // Contact
      contactPage: {
        title: 'Get in Touch',
        subtitle: 'We\'d love to hear from you',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message',
      },
      
      // Common
      learnMore: 'Learn More',
      download: 'Download',
      viewAll: 'View All',
    },
  },
  kn: {
    translation: {
      // Navigation
      home: 'ಮುಖಪುಟ',
      about: 'ನಮ್ಮ ಬಗ್ಗೆ',
      vision: 'ದೃಷ್ಟಿ ಮತ್ತು ಉದ್ದೇಶ',
      members: 'ಸಂಘಟನಾ ಸದಸ್ಯರು',
      resources: 'ಸಂಪನ್ಮೂಲಗಳು',
      gallery: 'ಗ್ಯಾಲರಿ',
      blog: 'ಬ್ಲಾಗ್ ಮತ್ತು ಸುದ್ದಿ',
      contact: 'ಸಂಪರ್ಕಿಸಿ',
      
      // Districts
      districts: {
        title: 'ಕರ್ನಾಟಕ ಜಿಲ್ಲೆಗಳು',
        bengaluru: 'ಬೆಂಗಳೂರು ನಗರ',
        mysuru: 'ಮೈಸೂರು',
        mangaluru: 'ದಕ್ಷಿಣ ಕನ್ನಡ',
        belagavi: 'ಬೆಳಗಾವಿ',
        hubli: 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ',
      },
      
      // Homepage
      hero: {
        title: 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ಶಿಕ್ಷಣವನ್ನು ಬಲಪಡಿಸುವುದು',
        subtitle: 'ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ ಮತ್ತು ಸಮುದಾಯ ಸಹಭಾಗಿತ್ವದ ಮೂಲಕ ಉಜ್ವಲ ಭವಿಷ್ಯವನ್ನು ನಿರ್ಮಿಸುವುದು',
      },
      testimonials: {
        title: 'ಜನರು ಏನು ಹೇಳುತ್ತಾರೆ',
      },
      circulars: {
        title: 'ಇತ್ತೀಚಿನ ಪರಿಪತ್ರಗಳು',
      },
      
      // Resources
      resourcesPage: {
        title: 'ಶೈಕ್ಷಣಿಕ ಸಂಪನ್ಮೂಲಗಳು',
        subtitle: 'ಗುಣಮಟ್ಟದ ಕಲಿಕಾ ಸಾಮಗ್ರಿಗಳು ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳನ್ನು ಪ್ರವೇಶಿಸಿ',
        subjects: 'ವಿಷಯಗಳು',
      },
      
      // Gallery
      galleryPage: {
        title: 'ಫೋಟೋ ಗ್ಯಾಲರಿ',
        subtitle: 'ನಮ್ಮ ಶೈಕ್ಷಣಿಕ ಪ್ರಯಾಣದ ಕ್ಷಣಗಳು',
      },
      
      // Blog
      blogPage: {
        title: 'ಸುದ್ದಿ ಮತ್ತು ನವೀಕರಣಗಳು',
        subtitle: 'ಇತ್ತೀಚಿನ ಸುದ್ದಿ ಮತ್ತು ಪತ್ರಿಕಾ ವರದಿಗಳು',
      },
      
      // Contact
      contactPage: {
        title: 'ಸಂಪರ್ಕದಲ್ಲಿರಿ',
        subtitle: 'ನಿಮ್ಮಿಂದ ಕೇಳಲು ನಾವು ಇಷ್ಟಪಡುತ್ತೇವೆ',
        name: 'ಹೆಸರು',
        email: 'ಇಮೇಲ್',
        message: 'ಸಂದೇಶ',
        send: 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
      },
      
      // Common
      learnMore: 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
      download: 'ಡೌನ್‌ಲೋಡ್',
      viewAll: 'ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ',
    },
  },
  ur: {
    translation: {
      // Navigation
      home: 'گھر',
      about: 'کے بارے میں',
      vision: 'وژن اور مشن',
      members: 'تنظیم کے اراکین',
      resources: 'وسائل',
      gallery: 'گیلری',
      blog: 'بلاگ اور خبریں',
      contact: 'رابطہ کریں',
      
      // Districts
      districts: {
        title: 'کرناٹک اضلاع',
        bengaluru: 'بنگلور شہری',
        mysuru: 'میسور',
        mangaluru: 'دکشنا کنڑ',
        belagavi: 'بلگاوی',
        hubli: 'ہبلی-دھاروار',
      },
      
      // Homepage
      hero: {
        title: 'کرناٹک میں تعلیم کو بااختیار بنانا',
        subtitle: 'معیاری تعلیم اور کمیونٹی کی شمولیت کے ذریعے روشن مستقبل کی تعمیر',
      },
      testimonials: {
        title: 'لوگ کیا کہتے ہیں',
      },
      circulars: {
        title: 'تازہ ترین سرکلرز',
      },
      
      // Resources
      resourcesPage: {
        title: 'تعلیمی وسائل',
        subtitle: 'معیاری سیکھنے کے مواد اور وسائل تک رسائی',
        subjects: 'مضامین',
      },
      
      // Gallery
      galleryPage: {
        title: 'فوٹو گیلری',
        subtitle: 'ہمارے تعلیمی سفر کے لمحات',
      },
      
      // Blog
      blogPage: {
        title: 'خبریں اور اپ ڈیٹس',
        subtitle: 'تازہ ترین خبریں اور پریس کوریج',
      },
      
      // Contact
      contactPage: {
        title: 'رابطے میں رہیں',
        subtitle: 'ہم آپ سے سننا پسند کریں گے',
        name: 'نام',
        email: 'ای میل',
        message: 'پیغام',
        send: 'پیغام بھیجیں',
      },
      
      // Common
      learnMore: 'مزید جانیے',
      download: 'ڈاؤن لوڈ',
      viewAll: 'سب دیکھیں',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
