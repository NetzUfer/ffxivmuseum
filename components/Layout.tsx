import React, { ReactNode, useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Eorzea Museum of History' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-eorzea-dark text-eorzea-light font-eorzea">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Museum of Eorzean History and Culture" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-eorzea-dark/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center">
              <motion.img 
                src="/museum-logo.png" 
                alt="Eorzea Museum Logo" 
                className="h-12 mr-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl md:text-2xl font-semibold text-eorzea-gold"
              >
                Eorzea Museum
              </motion.div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {[
              { name: 'Startseite', path: '/' },
              { name: 'Über Uns', path: '/about' },
              { name: 'Ausstellungen', path: '/exhibitions' },
              { name: 'Sammlungen', path: '/collections' },
              { name: 'Veranstaltungen', path: '/events' },
              { name: 'Besuch', path: '/visit' },
              { name: 'Unterstützung', path: '/support' },
              { name: 'Shop', path: '/shop' },
              { name: 'Bildung', path: '/education' },
            ].map((link, index) => (
              <Link href={link.path} key={index}>
                <a className="nav-link relative text-eorzea-light hover:text-eorzea-gold transition-colors duration-300">
                  {link.name}
                  <span className="nav-link-underline"></span>
                </a>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-eorzea-light hover:text-eorzea-gold"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-eorzea-dark/95 backdrop-blur-md"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {[
                { name: 'Startseite', path: '/' },
                { name: 'Über Uns', path: '/about' },
                { name: 'Ausstellungen', path: '/exhibitions' },
                { name: 'Sammlungen', path: '/collections' },
                { name: 'Veranstaltungen', path: '/events' },
                { name: 'Besuch', path: '/visit' },
                { name: 'Unterstützung', path: '/support' },
                { name: 'Shop', path: '/shop' },
                { name: 'Bildung', path: '/education' },
              ].map((link, index) => (
                <Link href={link.path} key={index}>
                  <a 
                    className="block py-2 text-eorzea-light hover:text-eorzea-gold transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </header>

      <main>
        {children}
      </main>

      <footer className="bg-eorzea-darker text-eorzea-light py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-eorzea-gold mb-4">Eorzea Museum</h3>
              <p className="mb-4">Bewahrung der Geschichte und Kultur von Eorzea für kommende Generationen.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-eorzea-light hover:text-eorzea-gold transition-colors">
                  <span className="sr-only">Discord</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
                <a href="#" className="text-eorzea-light hover:text-eorzea-gold transition-colors">
                  <span className="sr-only">X (Twitter)</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-eorzea-gold mb-4">Öffnungszeiten</h3>
              <p className="mb-2">Täglich: 10:00 - 22:00 Uhr (Eorzea-Zeit)</p>
              <p className="mb-4">Sonderöffnungszeiten an Festtagen</p>
              <p className="mb-2">Standort: Lavender Beds, Bezirk 12, Grundstück 30</p>
              <p>Alle Stadtstaaten-Ätheryten verbunden</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-eorzea-gold mb-4">Kontakt</h3>
              <p className="mb-2">Linkperle: Eorzean Historians</p>
              <p className="mb-2">Kurator: Minfilia Warde</p>
              <p>Für Anfragen: /tell Kurator Minfilia</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-eorzea-gold/30 text-center">
            <p>&copy; {new Date().getFullYear()} Eorzea Museum of History. Alle Rechte vorbehalten.</p>
            <p className="text-sm mt-2">Final Fantasy XIV und alle zugehörigen Marken sind Eigentum von Square Enix Co., Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
