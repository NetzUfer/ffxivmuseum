import React, { createContext, useState, useContext, useEffect } from 'react';

// Erstellen des Kontexts
const LanguageContext = createContext();

// Übersetzungen
const translations = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_team: "Our Team",
    nav_friends: "Friends' Association",
    nav_exhibitions: "Exhibitions",
    nav_visit: "Visit Us",
    nav_contact: "Contact",
    
    // Common
    view_more: "View More",
    view_all: "View All",
    read_more: "Read More",
    
    // Team Section
    team_title: "Our Team",
    team_subtitle: "Meet the dedicated curators, historians, and staff who bring the history of Eorzea to life.",
    curator: "Curator",
    historian: "Historian",
    archivist: "Archivist",
    guide: "Guide",
    researcher: "Researcher",
    conservator: "Conservator",
    
    // Friends Section
    friends_title: "Friends' Association",
    friends_subtitle: "Our supporters who help preserve the rich history and culture of Eorzea.",
    patron: "Patron",
    benefactor: "Benefactor",
    supporter: "Supporter",
    
    // Exhibition Section
    exhibitions_title: "Our Exhibitions",
    exhibitions_subtitle: "Explore our current and upcoming exhibitions showcasing the wonders of Eorzea.",
    permanent: "Permanent Exhibition",
    temporary: "Temporary Exhibition",
    upcoming: "Upcoming Exhibition",
    
    // Footer
    footer_rights: "All rights reserved",
    footer_disclaimer: "Final Fantasy XIV and all related marks are property of Square Enix Co., Ltd."
  },
  de: {
    // Navigation
    nav_home: "Startseite",
    nav_team: "Unser Team",
    nav_friends: "Freundeskreis",
    nav_exhibitions: "Ausstellungen",
    nav_visit: "Besuch",
    nav_contact: "Kontakt",
    
    // Common
    view_more: "Mehr anzeigen",
    view_all: "Alle anzeigen",
    read_more: "Weiterlesen",
    
    // Team Section
    team_title: "Unser Team",
    team_subtitle: "Lernen Sie die engagierten Kuratoren, Historiker und Mitarbeiter kennen, die die Geschichte Eorzeas zum Leben erwecken.",
    curator: "Kurator",
    historian: "Historiker",
    archivist: "Archivar",
    guide: "Führer",
    researcher: "Forscher",
    conservator: "Konservator",
    
    // Friends Section
    friends_title: "Freundeskreis",
    friends_subtitle: "Unsere Unterstützer, die helfen, die reiche Geschichte und Kultur Eorzeas zu bewahren.",
    patron: "Schirmherr",
    benefactor: "Wohltäter",
    supporter: "Unterstützer",
    
    // Exhibition Section
    exhibitions_title: "Unsere Ausstellungen",
    exhibitions_subtitle: "Entdecken Sie unsere aktuellen und kommenden Ausstellungen, die die Wunder Eorzeas präsentieren.",
    permanent: "Dauerausstellung",
    temporary: "Temporäre Ausstellung",
    upcoming: "Kommende Ausstellung",
    
    // Footer
    footer_rights: "Alle Rechte vorbehalten",
    footer_disclaimer: "Final Fantasy XIV und alle zugehörigen Marken sind Eigentum von Square Enix Co., Ltd."
  }
};

// Provider-Komponente
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('de'); // Deutsch als Standardsprache
  
  // Beim ersten Laden die gespeicherte Sprachpräferenz abrufen
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  // Sprache ändern
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };
  
  // Übersetzungsfunktion
  const t = (key) => {
    return translations[language][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook für einfachen Zugriff auf den Kontext
export const useLanguage = () => useContext(LanguageContext);
