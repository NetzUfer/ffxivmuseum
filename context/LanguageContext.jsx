import React, { createContext, useState, useContext, useEffect } from 'react';

// Sprachdaten
const translations = {
  en: {
    // Navigation
    nav_home: "Home",
    nav_exhibitions: "Exhibitions",
    nav_collections: "Collections",
    nav_events: "Events",
    nav_visit: "Visit",
    nav_support: "Support",
    nav_shop: "Shop",
    nav_education: "Education",
    
    // Homepage
    welcome_title: "Welcome to the Eorzea Museum of History",
    welcome_subtitle: "A journey through the history, culture, and magic of Final Fantasy XIV",
    explore_exhibitions: "Explore Exhibitions",
    plan_visit: "Plan Your Visit",
    
    // Exhibitions
    exhibitions_title: "Current Exhibitions",
    exhibitions_subtitle: "Discover our fascinating exhibitions that bring the rich history and culture of Eorzea to life.",
    view_all_exhibitions: "View All Exhibitions",
    
    // Collections
    collections_title: "Artifact Collections",
    collections_subtitle: "Explore our vast collection of artifacts from across the realm.",
    search_artifacts: "Search Artifacts",
    
    // Events
    events_title: "Upcoming Events",
    events_subtitle: "Join our interactive events and deepen your knowledge of the world of Eorzea.",
    view_all_events: "View All Events",
    
    // Visit
    visit_title: "Plan Your Visit",
    visit_subtitle: "Find us in the Lavender Beds and explore our museum.",
    opening_hours: "Opening Hours",
    location: "Location",
    
    // Support
    support_title: "Support the Museum",
    support_subtitle: "Help us preserve the history and culture of Eorzea for future generations.",
    donate: "Donate",
    wishlist: "Wishlist",
    
    // Shop
    shop_title: "Museum Shop",
    shop_subtitle: "Take home a piece of Eorzean history.",
    view_all_products: "View All Products",
    
    // Education
    education_title: "Educational Resources",
    education_subtitle: "Deepen your knowledge of Eorzean history and culture.",
    lore_guides: "Lore Guides",
    interactive_maps: "Interactive Maps",
    quizzes: "Quizzes",
    
    // Footer
    footer_contact: "Contact",
    footer_social: "Social Media",
    footer_copyright: "© 2023 Eorzea Museum of History. All rights reserved.",
    footer_disclaimer: "Final Fantasy XIV and all associated brands are property of Square Enix Co., Ltd."
  },
  de: {
    // Navigation
    nav_home: "Startseite",
    nav_exhibitions: "Ausstellungen",
    nav_collections: "Sammlungen",
    nav_events: "Veranstaltungen",
    nav_visit: "Besuch",
    nav_support: "Unterstützung",
    nav_shop: "Shop",
    nav_education: "Bildung",
    
    // Homepage
    welcome_title: "Willkommen im Eorzea Museum of History",
    welcome_subtitle: "Eine Reise durch die Geschichte, Kultur und Magie von Final Fantasy XIV",
    explore_exhibitions: "Ausstellungen entdecken",
    plan_visit: "Besuch planen",
    
    // Exhibitions
    exhibitions_title: "Aktuelle Ausstellungen",
    exhibitions_subtitle: "Entdecken Sie unsere faszinierenden Ausstellungen, die die reiche Geschichte und Kultur von Eorzea zum Leben erwecken.",
    view_all_exhibitions: "Alle Ausstellungen ansehen",
    
    // Collections
    collections_title: "Artefaktsammlungen",
    collections_subtitle: "Erkunden Sie unsere umfangreiche Sammlung von Artefakten aus dem gesamten Reich.",
    search_artifacts: "Artefakte durchsuchen",
    
    // Events
    events_title: "Kommende Veranstaltungen",
    events_subtitle: "Nehmen Sie an unseren interaktiven Veranstaltungen teil und vertiefen Sie Ihr Wissen über die Welt von Eorzea.",
    view_all_events: "Alle Veranstaltungen ansehen",
    
    // Visit
    visit_title: "Besuch planen",
    visit_subtitle: "Finden Sie uns in den Lavender Beds und erkunden Sie unser Museum.",
    opening_hours: "Öffnungszeiten",
    location: "Standort",
    
    // Support
    support_title: "Unterstützen Sie das Museum",
    support_subtitle: "Helfen Sie uns, die Geschichte und Kultur von Eorzea für kommende Generationen zu bewahren.",
    donate: "Spenden",
    wishlist: "Wunschliste",
    
    // Shop
    shop_title: "Museumsshop",
    shop_subtitle: "Nehmen Sie ein Stück eorzäischer Geschichte mit nach Hause.",
    view_all_products: "Alle Produkte ansehen",
    
    // Education
    education_title: "Bildungsressourcen",
    education_subtitle: "Vertiefen Sie Ihr Wissen über die Geschichte und Kultur Eorzeas.",
    lore_guides: "Lore-Führer",
    interactive_maps: "Interaktive Karten",
    quizzes: "Quiz",
    
    // Footer
    footer_contact: "Kontakt",
    footer_social: "Soziale Medien",
    footer_copyright: "© 2023 Eorzea Museum of History. Alle Rechte vorbehalten.",
    footer_disclaimer: "Final Fantasy XIV und alle zugehörigen Marken sind Eigentum von Square Enix Co., Ltd."
  }
};

// Sprachkontext erstellen
const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('de'); // Standardsprache ist Deutsch
  const [translations, setTranslations] = useState({});
  
  // Sprachdaten laden
  useEffect(() => {
    // In einer echten Anwendung würden wir die Sprachdaten von einer API laden
    setTranslations(translations);
  }, []);
  
  // Sprache ändern
  const changeLanguage = (lang) => {
    setLanguage(lang);
    // Speichern der Sprachpräferenz im localStorage
    localStorage.setItem('preferredLanguage', lang);
  };
  
  // Beim ersten Laden die gespeicherte Sprachpräferenz abrufen
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);
  
  // Text für den aktuellen Schlüssel und die aktuelle Sprache abrufen
  const t = (key) => {
    return translations[language]?.[key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
