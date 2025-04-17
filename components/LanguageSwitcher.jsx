import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();
  
  return (
    <div className="language-switcher">
      <button 
        className={`language-btn ${language === 'de' ? 'active' : ''}`}
        onClick={() => changeLanguage('de')}
      >
        DE
      </button>
      <span className="language-divider">|</span>
      <button 
        className={`language-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
