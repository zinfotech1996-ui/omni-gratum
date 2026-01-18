'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Translation keys and values
const translations = {
  de: {
    'nav.home': 'Startseite',
    'nav.about': 'Über uns',
    'nav.services': 'Leistungen',
    'nav.area': 'Einsatzgebiet',
    'nav.customers': 'Kunden',
    'nav.contact': 'Kontakt',
    'nav.employeeLogin': 'Mitarbeiter Login',
    'nav.logout': 'Abmelden',
    'hero.title': 'Willkommen bei Omni Gratum',
    'hero.subtitle': 'Professionelle Lösungen für Ihr Unternehmen',
    'about.title': 'Über uns',
    'services.title': 'Leistungen',
    'area.title': 'Einsatzgebiet',
    'customers.title': 'Kunden',
    'contact.title': 'Kontakt',
    'footer.copyright': 'Alle Rechte vorbehalten',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.services': 'Services',
    'nav.area': 'Service Area',
    'nav.customers': 'Customers',
    'nav.contact': 'Contact',
    'nav.employeeLogin': 'Employee Login',
    'nav.logout': 'Logout',
    'hero.title': 'Welcome to Omni Gratum',
    'hero.subtitle': 'Professional solutions for your business',
    'about.title': 'About Us',
    'services.title': 'Services',
    'area.title': 'Service Area',
    'customers.title': 'Customers',
    'contact.title': 'Contact',
    'footer.copyright': 'All rights reserved',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À Propos',
    'nav.services': 'Services',
    'nav.area': 'Zone de Service',
    'nav.customers': 'Clients',
    'nav.contact': 'Contact',
    'nav.employeeLogin': 'Connexion Employé',
    'nav.logout': 'Déconnexion',
    'hero.title': 'Bienvenue chez Omni Gratum',
    'hero.subtitle': 'Des solutions professionnelles pour votre entreprise',
    'about.title': 'À Propos',
    'services.title': 'Services',
    'area.title': 'Zone de Service',
    'customers.title': 'Clients',
    'contact.title': 'Contact',
    'footer.copyright': 'Tous droits réservés',
  },
};

type Language = 'de' | 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language | null;
    return savedLanguage || 'de';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['de']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
