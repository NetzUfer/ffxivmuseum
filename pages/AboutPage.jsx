import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Layout from '../components/Layout';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <Layout pageTitle={t('about_title')}>
      <div className="container mx-auto px-4 py-16">
        {/* Mission Statement */}
        <section className="mb-16">
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-cinzel text-eorzea-gold mb-6">
              {t('our_mission')}
            </h2>
            <p className="text-lg mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-lg">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </section>

        {/* History */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-cinzel text-center text-eorzea-gold mb-12">
            {t('our_history')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <img 
                src="/about/history-1.jpg" 
                alt="Museum History" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-cinzel text-eorzea-gold mb-4">
                The Founding
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="glass-card p-6">
              <img 
                src="/about/history-2.jpg" 
                alt="Museum Growth" 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h3 className="text-xl font-cinzel text-eorzea-gold mb-4">
                Growth and Development
              </h3>
              <p>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-3xl md:text-4xl font-cinzel text-center text-eorzea-gold mb-12">
            {t('our_values')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-eorzea-gold/20 flex items-center justify-center">
                  <span className="text-2xl text-eorzea-gold">0{i}</span>
                </div>
                <h3 className="text-xl font-cinzel text-eorzea-gold mb-4">
                  Value Title {i}
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;
