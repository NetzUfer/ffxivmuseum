import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from '../UI/LanguageSwitcher';

const Header = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { path: '/', label: 'nav_home' },
    { path: '/about', label: 'nav_about' },
    { path: '/exhibitions', label: 'nav_exhibitions' },
    { path: '/collections', label: 'nav_collections' },
    { path: '/events', label: 'nav_events' },
    { path: '/visit', label: 'nav_visit' },
    { path: '/support', label: 'nav_support' },
    { path: '/shop', label: 'nav_shop' },
    { path: '/education', label: 'nav_education' },
    { path: '/team', label: 'nav_team' },
    { path: '/friends', label: 'nav_friends' },
    { path: '/tours', label: 'nav_tours' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 
      ${isScrolled ? 'bg-eorzea-dark/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Museum Logo" 
              className="h-12 w-auto animate-float"
            />
            <span className="text-xl font-cinzel text-eorzea-gold">
              Eorzea Museum
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="nav-link text-eorzea-light hover:text-eorzea-gold transition-colors duration-300"
              >
                {t(item.label)}
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-eorzea-light hover:text-eorzea-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-3 py-2 text-eorzea-light hover:text-eorzea-gold transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(item.label)}
                </Link>
              ))}
              <div className="px-3 py-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
