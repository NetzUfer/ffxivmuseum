import React from "react";
import { useLanguage } from "../context/LanguageContext";
import ParticleBackground from "../components/ParticleBackground";
import WeatherAurora from "../components/WeatherAurora";
import SoundtrackPlayer from "../components/SoundtrackPlayer";
import ArtifactShowcase from "../components/ArtifactShowcase";
import LoreQuiz from "../components/LoreQuiz";
import VirtualTour from "../components/VirtualTour";
import QuickInfoCards from "../components/QuickInfoCards";

const Home = () => {
  const { t } = useLanguage();
  return (
    <div className="relative min-h-screen bg-eorzea-dark text-eorzea-light">
      <ParticleBackground />
      <WeatherAurora />
      <SoundtrackPlayer />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-24 bg-[url('/hero-bg.jpg')] bg-cover bg-center">
          <h1 className="text-5xl md:text-6xl font-cinzel text-eorzea-gold mb-6 magical-text">{t("welcome")}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/exhibitions" className="btn btn-primary">{t("cta_explore")}</a>
            <a href="/tours" className="btn btn-secondary">{t("cta_tour")}</a>
          </div>
        </section>
        {/* Quick Info Cards */}
        <QuickInfoCards />
        {/* Animated Artifact Showcase */}
        <section className="py-16 container mx-auto">
          <h2 className="text-3xl font-cinzel text-eorzea-gold mb-8 magical-text">Featured Artifacts</h2>
          <ArtifactShowcase />
        </section>
        {/* Announcements */}
        <section className="py-16 container mx-auto">
          <h2 className="text-3xl font-cinzel text-eorzea-gold mb-8 magical-text">Announcements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1,2].map(i => (
              <div key={i} className="glass-card p-6">
                <h3 className="text-xl font-cinzel text-eorzea-gold mb-2">Announcement {i}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi vel consectetur.</p>
              </div>
            ))}
          </div>
        </section>
        {/* Lore Quiz */}
        <section className="py-16 container mx-auto">
          <h2 className="text-3xl font-cinzel text-eorzea-gold mb-8 magical-text">Test Your Lore Knowledge</h2>
          <LoreQuiz />
        </section>
        {/* Virtual Tour */}
        <section className="py-16 container mx-auto">
          <h2 className="text-3xl font-cinzel text-eorzea-gold mb-8 magical-text">Virtual Museum Tour</h2>
          <VirtualTour />
        </section>
      </main>
    </div>
  );
};
export default Home;
