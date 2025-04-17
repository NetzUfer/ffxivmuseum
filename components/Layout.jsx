import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ParticleBackground from './ParticleBackground';

const Layout = ({ children, pageTitle }) => {
  return (
    <div className="min-h-screen bg-eorzea-dark text-eorzea-light">
      <Header />
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
      <Footer />
    </div>
  );
};

export default Layout;
