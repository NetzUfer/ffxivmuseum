import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About Us",
    nav_exhibitions: "Exhibitions",
    nav_collections: "Collections",
    nav_events: "Events",
    nav_visit: "Visit",
    nav_support: "Support",
    nav_shop: "Shop",
    nav_education: "Education Resources",
    nav_team: "Team",
    nav_friends: "Friends' Association",
    nav_tours: "Guided Tours",
    nav_facilities: "Facilities",
    nav_special: "Special Events",
    nav_transport: "Transportation",
    nav_accessibility: "Accessibility",
    nav_services: "Visitor Services",
    welcome: "Welcome to the Eorzea Museum of History",
    cta_explore: "Explore Exhibitions",
    cta_tour: "Start Virtual Tour",
  },
  de: {
    nav_home: "Startseite",
    nav_about: "Über Uns",
    nav_exhibitions: "Ausstellungen",
    nav_collections: "Sammlungen",
    nav_events: "Veranstaltungen",
    nav_visit: "Besuch",
    nav_support: "Unterstützung",
    nav_shop: "Shop",
    nav_education: "Bildungsressourcen",
    nav_team: "Team",
    nav_friends: "Freundeskreis",
    nav_tours: "Führungen",
    nav_facilities: "Ausstattung",
    nav_special: "Sonderveranstaltungen",
    nav_transport: "Anreise",
    nav_accessibility: "Barrierefreiheit",
    nav_services: "Besucherservice",
    welcome: "Willkommen im Eorzea Museum of History",
    cta_explore: "Ausstellungen entdecken",
    cta_tour: "Virtuelle Tour starten",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored) setLanguage(stored);
  }, []);
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  const t = (key) => translations[language][key] || key;
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
