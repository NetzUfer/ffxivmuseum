import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const navItems = [
  "nav_home", "nav_about", "nav_exhibitions", "nav_collections", "nav_events", "nav_visit",
  "nav_support", "nav_shop", "nav_education", "nav_team", "nav_friends", "nav_tours",
  "nav_facilities", "nav_special", "nav_transport", "nav_accessibility", "nav_services"
];

const Header = () => {
  const { t, language, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed w-full z-50 bg-eorzea-dark/90 backdrop-blur shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="Museum Logo" className="h-10 w-10 rounded-full border-2 border-eorzea-gold" />
          <span className="font-cinzel text-2xl text-eorzea-gold">Eorzea Museum</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          {navItems.map((key) => (
            <a key={key} href={`/${key.replace("nav_", "")}`} className="nav-link text-eorzea-light hover:text-eorzea-gold transition">{t(key)}</a>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <button onClick={() => changeLanguage("en")} className={`px-2 ${language === "en" ? "text-eorzea-gold" : "text-eorzea-light"}`}>EN</button>
          <span className="text-eorzea-gold">|</span>
          <button onClick={() => changeLanguage("de")} className={`px-2 ${language === "de" ? "text-eorzea-gold" : "text-eorzea-light"}`}>DE</button>
          <button className="md:hidden ml-4" onClick={() => setOpen(!open)}>
            <span className="text-eorzea-gold text-2xl">&#9776;</span>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-eorzea-dark/95 px-4 py-2 space-y-2">
          {navItems.map((key) => (
            <a key={key} href={`/${key.replace("nav_", "")}`} className="block text-eorzea-light hover:text-eorzea-gold">{t(key)}</a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
