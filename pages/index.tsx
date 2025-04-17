import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';
import ExhibitionCard from '../components/ExhibitionCard';
import EventCard from '../components/EventCard';
import ParticleBackground from '../components/ParticleBackground';

const exhibitions = [
  {
    id: 1,
    title: 'Das Zeitalter der Allagans',
    description: 'Entdecken Sie die technologischen Wunder und die dunkle Geschichte des Allagischen Imperiums.',
    image: '/exhibitions/allagan-empire.jpg',
    dates: '1. - 30. Astralmond',
    featured: true,
  },
  {
    id: 2,
    title: 'Kulturen der Stadtstaaten',
    description: 'Eine vergleichende Ausstellung der einzigartigen Kulturen von Gridania, Ul\'dah und Limsa Lominsa.',
    image: '/exhibitions/city-states.jpg',
    dates: 'Dauerhaft',
    featured: true,
  },
  {
    id: 3,
    title: 'Primals: Götter und Monster',
    description: 'Die faszinierende und gefährliche Welt der Primae und ihre Auswirkungen auf Eorzea.',
    image: '/exhibitions/primals.jpg',
    dates: '15. Umbralmond - 15. Astralmond',
    featured: true,
  },
];

const events = [
  {
    id: 1,
    title: 'Vortrag: Die Geheimnisse von Azys Lla',
    date: '12. Astralmond, 19:00 Uhr',
    location: 'Haupthalle',
    image: '/events/azys-lla.jpg',
  },
  {
    id: 2,
    title: 'Workshop: Allagische Schriftzeichen',
    date: '15. Astralmond, 14:00 Uhr',
    location: 'Studiensaal',
    image: '/events/allagan-script.jpg',
  },
  {
    id: 3,
    title: 'Führung: Verborgene Symbole in Eorzea',
    date: '20. Astralmond, 16:00 Uhr',
    location: 'Treffpunkt: Eingang',
    image: '/events/symbols.jpg',
  },
];

const HomePage: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, threshold: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <Layout title="Eorzea Museum of History - Startseite">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-eorzea-dark/30 via-eorzea-dark/60 to-eorzea-dark z-10"></div>
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat z-0"></div>
        
        <div className="container relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 magical-text">
              Eorzea Museum of History
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Eine Reise durch die Geschichte, Kultur und Magie der Welt von Final Fantasy XIV
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/exhibitions">
                <a className="btn btn-primary">Ausstellungen entdecken</a>
              </Link>
              <Link href="/visit">
                <a className="btn btn-secondary">Besuch planen</a>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-eorzea-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="section bg-eorzea-darker">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="mb-6">Willkommen im Eorzea Museum of History</h2>
              <div className="flex justify-center mb-6">
                <img 
                  src="/curator.png" 
                  alt="Museumskurator" 
                  className="w-32 h-32 rounded-full border-4 border-eorzea-gold/50"
                />
              </div>
              <blockquote className="italic text-xl mb-6 relative">
                <span className="text-4xl text-eorzea-gold absolute top-0 left-0 transform -translate-x-6 -translate-y-2">"</span>
                Willkommen, Besucher! In diesen Hallen bewahren wir die Erinnerungen und das Wissen Eorzeas. Von den Tagen der Allagischen Dynastie bis zu den jüngsten Ereignissen des Siebten Zeitalters - hier findet Ihr die Wahrheit hinter den Legenden. Möge Euer Besuch sowohl lehrreich als auch erhellend sein.
                <span className="text-4xl text-eorzea-gold absolute bottom-0 right-0 transform translate-x-6 translate-y-2">"</span>
              </blockquote>
              <p className="text-eorzea-gold">— Moenbryda Wilfsunnwyn, Hauptkuratorin</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Exhibitions */}
      <section className="section bg-eorzea-dark" ref={ref}>
        <div className="container">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Aktuelle Ausstellungen</h2>
            <p className="max-w-3xl mx-auto">Entdecken Sie unsere faszinierenden Ausstellungen, die die reiche Geschichte und Kultur von Eorzea zum Leben erwecken.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exhibitions.map((exhibition, index) => (
              <motion.div
                key={exhibition.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={controls}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ExhibitionCard exhibition={exhibition} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/exhibitions">
              <a className="btn btn-secondary">Alle Ausstellungen ansehen</a>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section bg-eorzea-darker">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Kommende Veranstaltungen</h2>
            <p className="max-w-3xl mx-auto">Nehmen Sie an unseren interaktiven Veranstaltungen teil und vertiefen Sie Ihr Wissen über die Welt von Eorzea.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/events">
              <a className="btn btn-secondary">Alle Veranstaltungen ansehen</a>
            </Link>
          </div>
        </div>
      </section>

      {/* Museum Stats */}
      <section className="section bg-[url('/stats-bg.jpg')] bg-cover bg-center text-eorzea-light">
        <div className="bg-eorzea-dark/80 backdrop-blur-sm py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-cinzel text-eorzea-gold mb-2">1,000+</div>
                <div className="text-xl">Artefakte</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-cinzel text-eorzea-gold mb-2">12</div>
                <div className="text-xl">Ausstellungsräume</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-cinzel text-eorzea-gold mb-2">50+</div>
                <div className="text-xl
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import Layout from '../components/Layout';
import ExhibitionCard from '../components/ExhibitionCard';
import EventCard from '../components/EventCard';
import ParticleBackground from '../components/ParticleBackground';

const exhibitions = [
  {
    id: 1,
    title: 'Das Zeitalter der Allagans',
    description: 'Entdecken Sie die technologischen Wunder und die dunkle Geschichte des Allagischen Imperiums.',
    image: '/exhibitions/allagan-empire.jpg',
    dates: '1. - 30. Astralmond',
    featured: true,
  },
  {
    id: 2,
    title: 'Kulturen der Stadtstaaten',
    description: 'Eine vergleichende Ausstellung der einzigartigen Kulturen von Gridania, Ul\'dah und Limsa Lominsa.',
    image: '/exhibitions/city-states.jpg',
    dates: 'Dauerhaft',
    featured: true,
  },
  {
    id: 3,
    title: 'Primals: Götter und Monster',
    description: 'Die faszinierende und gefährliche Welt der Primae und ihre Auswirkungen auf Eorzea.',
    image: '/exhibitions/primals.jpg',
    dates: '15. Umbralmond - 15. Astralmond',
    featured: true,
  },
];

const events = [
  {
    id: 1,
    title: 'Vortrag: Die Geheimnisse von Azys Lla',
    date: '12. Astralmond, 19:00 Uhr',
    location: 'Haupthalle',
    image: '/events/azys-lla.jpg',
  },
  {
    id: 2,
    title: 'Workshop: Allagische Schriftzeichen',
    date: '15. Astralmond, 14:00 Uhr',
    location: 'Studiensaal',
    image: '/events/allagan-script.jpg',
  },
  {
    id: 3,
    title: 'Führung: Verborgene Symbole in Eorzea',
    date: '20. Astralmond, 16:00 Uhr',
    location: 'Treffpunkt: Eingang',
    image: '/events/symbols.jpg',
  },
];

const HomePage: React.FC = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, threshold: 0.3 });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <Layout title="Eorzea Museum of History - Startseite">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-eorzea-dark/30 via-eorzea-dark/60 to-eorzea-dark z-10"></div>
        <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat z-0"></div>
        
        <div className="container relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 magical-text">
              Eorzea Museum of History
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Eine Reise durch die Geschichte, Kultur und Magie der Welt von Final Fantasy XIV
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/exhibitions">
                <a className="btn btn-primary">Ausstellungen entdecken</a>
              </Link>
              <Link href="/visit">
                <a className="btn btn-secondary">Besuch planen</a>
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-eorzea-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="section bg-eorzea-darker">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="mb-6">Willkommen im Eorzea Museum of History</h2>
              <div className="flex justify-center mb-6">
                <img 
                  src="/curator.png" 
                  alt="Museumskurator" 
                  className="w-32 h-32 rounded-full border-4 border-eorzea-gold/50"
                />
              </div>
              <blockquote className="italic text-xl mb-6 relative">
                <span className="text-4xl text-eorzea-gold absolute top-0 left-0 transform -translate-x-6 -translate-y-2">"</span>
                Willkommen, Besucher! In diesen Hallen bewahren wir die Erinnerungen und das Wissen Eorzeas. Von den Tagen der Allagischen Dynastie bis zu den jüngsten Ereignissen des Siebten Zeitalters - hier findet Ihr die Wahrheit hinter den Legenden. Möge Euer Besuch sowohl lehrreich als auch erhellend sein.
                <span className="text-4xl text-eorzea-gold absolute bottom-0 right-0 transform translate-x-6 translate-y-2">"</span>
              </blockquote>
              <p className="text-eorzea-gold">— Moenbryda Wilfsunnwyn, Hauptkuratorin</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Exhibitions */}
      <section className="section bg-eorzea-dark" ref={ref}>
        <div className="container">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={controls}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Aktuelle Ausstellungen</h2>
            <p className="max-w-3xl mx-auto">Entdecken Sie unsere faszinierenden Ausstellungen, die die reiche Geschichte und Kultur von Eorzea zum Leben erwecken.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exhibitions.map((exhibition, index) => (
              <motion.div
                key={exhibition.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={controls}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ExhibitionCard exhibition={exhibition} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/exhibitions">
              <a className="btn btn-secondary">Alle Ausstellungen ansehen</a>
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section bg-eorzea-darker">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Kommende Veranstaltungen</h2>
            <p className="max-w-3xl mx-auto">Nehmen Sie an unseren interaktiven Veranstaltungen teil und vertiefen Sie Ihr Wissen über die Welt von Eorzea.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/events">
              <a className="btn btn-secondary">Alle Veranstaltungen ansehen</a>
            </Link>
          </div>
        </div>
      </section>

      {/* Museum Stats */}
      <section className="section bg-[url('/stats-bg.jpg')] bg-cover bg-center text-eorzea-light">
        <div className="bg-eorzea-dark/80 backdrop-blur-sm py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-4xl font-cinzel text-eorzea-gold mb-2">1,000+</div>
                <div className="text-xl">Artefakte</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-cinzel text-eorzea-gold mb-2">12</div>
                <div className="text-xl">Ausstellungsräume</div>
              </div>
              <div className="p-6">
                <div className="text-4xl font-cinzel text-eorzea-gold mb-2">50+</div>
                <div className="text-xl">Kulturen</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
