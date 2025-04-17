import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ParticleBackground from '../UI/ParticleBackground';

const Layout = ({ children, pageTitle, showHero = false }) => {
  return (
    <div className="min-h-screen bg-eorzea-dark text-eorzea-light font-nunito">
      <Header />
      
      {showHero && (
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-eorzea-dark/30 via-eorzea-dark/60 to-eorzea-dark z-10"></div>
          <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat z-0"></div>
          {children}
        </div>
      )}
      
      {!showHero && (
        <main className="pt-20">
          {pageTitle && (
            <div className="page-title-container relative overflow-hidden py-24 bg-eorzea-darker">
              <ParticleBackground />
              <div className="container mx-auto px-4 relative z-10">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-cinzel text-center text-eorzea-gold magical-text">
                  {pageTitle}
                </h1>
              </div>
            </div>
          )}
          {children}
        </main>
      )}
      
      <Footer />
    </div>
  );
};

export default Layout;
