import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Layout from '../components/Layout';
import ParticleBackground from '../components/ParticleBackground';
import ExhibitionCard from '../components/ExhibitionCard';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-eorzea-dark/30 via-eorzea-dark/60 to-eorzea-dark z-10"></div>
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat z-0"></div>
        
        <div className="container relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-cinzel mb-6 magical-text">
            {t('welcome_title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {t('welcome_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/exhibitions" className="btn btn-primary">
              {t('explore_exhibitions')}
            </Link>
            <Link to="/visit" className="btn btn-secondary">
              {t('plan_visit')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Exhibitions */}
      <section className="py-16 md:py-24 bg-eorzea-darker">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-cinzel text-center mb-12 magical-text">
            {t('featured_exhibitions')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder Exhibition Cards */}
            {[1, 2, 3].map((i) => (
              <ExhibitionCard
                key={i}
                title={`Exhibition Title ${i}`}
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                image={`/exhibitions/exhibition-${i}.jpg`}
                link={`/exhibitions/${i}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 md:py-24 bg-eorzea-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-cinzel text-center mb-12 magical-text">
            {t('latest_news')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder News Cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card p-6">
                <h3 className="text-xl font-cinzel text-eorzea-gold mb-4">
                  News Title {i}
                </h3>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <Link to="/news" className="text-eorzea-gold hover:underline">
                  {t('read_more')}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
