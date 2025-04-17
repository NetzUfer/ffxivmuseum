import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Scroll-Effekt für den Header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-eorzea-dark/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/assets/logo.png" 
            alt="Eorzea Museum Logo" 
            className="h-12 mr-3 floating"
          />
          <div className="text-xl md:text-2xl font-cinzel font-semibold text-eorzea-gold">
            Eorzea Museum
          </div>
        </Link>
        
        <div className="flex items-center">
          <LanguageSwitcher />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-8 space-x-6">
            <Link to="/" className="nav-link">{t('nav_home')}</Link>
            <Link to="/team" className="nav-link">{t('nav_team')}</Link>
            <Link to="/friends" className="nav-link">{t('nav_friends')}</Link>
            <Link to="/exhibitions" className="nav-link">{t('nav_exhibitions')}</Link>
            <Link to="/visit" className="nav-link">{t('nav_visit')}</Link>
            <Link to="/contact" className="nav-link">{t('nav_contact')}</Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden ml-4 text-eorzea-light hover:text-eorzea-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-eorzea-dark/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="block py-2 text-eorzea-light hover:text-eorzea-gold" onClick={() => setMobileMenuOpen(false)}>
              {t('nav_home')}
            </Link>
            <Link to="/team" className="block py-2 text-eorzea-light hover:text-eorzea-gold" onClick={() => setMobileMenuOpen(false)}>
              {t('nav_team')}
            </Link>
            <Link to="/friends" className="block py-2 text-eorzea-light hover:text-eorzea-gold" onClick={() => setMobileMenuOpen(false)}>
              {t('nav_friends')}
            </Link>
            <Link to="/exhibitions" className="block py-2 text-eorzea-light hover:text-eorzea-gold" onClick={() => setMobileMenuOpen(false)}>
              {t('nav_exhibitions')}
            </Link>
            <Link to="/visit" className="block py-2 text-eorzea-light hover:text-eorzea-gold" onClick={() => setMobileMenuOpen(false)}>
              {t('nav_visit')}
            </Link>
            <Link to="/contact" className="block py-2 text-eorzea-light hover:text-eorzea-gold" onClick={() => setMobileMenuOpen(false)}>
              {t('nav_contact')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
