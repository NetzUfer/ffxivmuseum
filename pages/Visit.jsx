import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Layout from "../components/Layout";
import ParticleBackground from "../components/ParticleBackground";

// Placeholder icons (replace with SVGs or icon components in real use)
const icons = {
  cafe: "☕",
  shop: "🛍️",
  rest: "🛋️",
  cloakroom: "🧥",
  accessibility: "♿",
  parking: "🅿️",
};

const amenities = [
  { key: "cafe", en: "Café", de: "Café", desc: { en: "Enjoy Eorzean treats and drinks.", de: "Genießen Sie eorzäische Spezialitäten und Getränke." } },
  { key: "shop", en: "Gift Shop", de: "Souvenirshop", desc: { en: "Find exclusive memorabilia.", de: "Exklusive Andenken entdecken." } },
  { key: "rest", en: "Rest Areas", de: "Ruhezonen", desc: { en: "Relax in themed lounges.", de: "Entspannen Sie in thematischen Lounges." } },
  { key: "cloakroom", en: "Cloakroom", de: "Garderobe", desc: { en: "Store your belongings safely.", de: "Verstauen Sie Ihre Sachen sicher." } },
  { key: "accessibility", en: "Accessibility", de: "Barrierefreiheit", desc: { en: "Full access for all visitors.", de: "Voller Zugang für alle Besucher." } },
  { key: "parking", en: "Parking", de: "Parken", desc: { en: "Spacious parking available.", de: "Großzügige Parkmöglichkeiten." } },
];

const quickInfo = [
  {
    title: { en: "Opening Hours", de: "Öffnungszeiten" },
    content: { en: "Daily: 10:00 - 22:00 (Eorzea Time)", de: "Täglich: 10:00 - 22:00 (Eorzea-Zeit)" },
  },
  {
    title: { en: "Ticket Prices", de: "Eintrittspreise" },
    content: { en: "Adults: 500 gil, Children: 200 gil", de: "Erwachsene: 500 Gil, Kinder: 200 Gil" },
  },
  {
    title: { en: "Contact", de: "Kontakt" },
    content: { en: "Linkpearl: Eorzean Historians", de: "Linkperle: Eorzean Historians" },
  },
];

const tours = [
  {
    title: { en: "Allagan Wonders Tour", de: "Allagische Wunder Tour" },
    schedule: { en: "Mon, Wed, Fri - 14:00", de: "Mo, Mi, Fr - 14:00" },
    highlights: {
      en: ["Crystal Tower", "Omega Relics", "Aetherochemical Research Facility"],
      de: ["Kristallturm", "Omega-Relikte", "Ätherochemisches Forschungslabor"],
    },
    narrative: {
      en: "Step into the world of the Allagans and discover their lost technology with our expert guides.",
      de: "Tauchen Sie ein in die Welt der Allager und entdecken Sie ihre verlorene Technologie mit unseren Experten.",
    },
    image: "/tours/allagan.jpg",
  },
  {
    title: { en: "Primals & Myths", de: "Primae & Mythen" },
    schedule: { en: "Tue, Thu, Sat - 16:00", de: "Di, Do, Sa - 16:00" },
    highlights: {
      en: ["Ifrit's Chamber", "Shiva's Shrine", "Lore of the Twelve"],
      de: ["Ifrits Kammer", "Shivas Schrein", "Mythen der Zwölf"],
    },
    narrative: {
      en: "Unravel the legends of Eorzea's gods and monsters in this immersive lore tour.",
      de: "Entschlüsseln Sie die Legenden von Eorzeas Göttern und Monstern auf dieser immersiven Lore-Tour.",
    },
    image: "/tours/primals.jpg",
  },
];

const events = [
  {
    title: { en: "Starlight Celebration", de: "Sternenlichtfest" },
    date: { en: "Dec 20, 2023", de: "20. Dez 2023" },
    desc: {
      en: "A festive event with music, gifts, and special exhibits.",
      de: "Ein festliches Event mit Musik, Geschenken und Sonderausstellungen.",
    },
  },
  {
    title: { en: "Allagan Technology Day", de: "Tag der Allagischen Technik" },
    date: { en: "Jan 15, 2024", de: "15. Jan 2024" },
    desc: {
      en: "Workshops and talks on ancient Allagan inventions.",
      de: "Workshops und Vorträge zu allagischen Erfindungen.",
    },
  },
];

const accessibility = [
  {
    title: { en: "Wheelchair Access", de: "Rollstuhlgerecht" },
    desc: {
      en: "All areas are accessible by wheelchair.",
      de: "Alle Bereiche sind rollstuhlgerecht zugänglich.",
    },
  },
  {
    title: { en: "Audio Guides", de: "Audioguides" },
    desc: {
      en: "Available in multiple languages.",
      de: "In mehreren Sprachen verfügbar.",
    },
  },
  {
    title: { en: "Visual Aids", de: "Visuelle Hilfen" },
    desc: {
      en: "Large print and tactile maps available.",
      de: "Großdruck und tastbare Karten verfügbar.",
    },
  },
  {
    title: { en: "Assistance Staff", de: "Hilfspersonal" },
    desc: {
      en: "Staff trained to assist visitors with special needs.",
      de: "Personal ist für besondere Bedürfnisse geschult.",
    },
  },
];

const visitorServices = [
  {
    title: { en: "Guided Tours", de: "Führungen" },
    desc: {
      en: "Book a tour with our expert guides.",
      de: "Buchen Sie eine Führung mit unseren Experten.",
    },
    contact: "tours@eorzea-museum.com",
  },
  {
    title: { en: "Group Bookings", de: "Gruppenbuchungen" },
    desc: {
      en: "Special rates for groups of 10 or more.",
      de: "Sonderpreise für Gruppen ab 10 Personen.",
    },
    contact: "groups@eorzea-museum.com",
  },
  {
    title: { en: "Lost & Found", de: "Fundsachen" },
    desc: {
      en: "Report or retrieve lost items at the info desk.",
      de: "Melden oder holen Sie Fundsachen an der Info ab.",
    },
    contact: "info@eorzea-museum.com",
  },
  {
    title: { en: "Customer Support", de: "Kundendienst" },
    desc: {
      en: "Contact us for any questions or assistance.",
      de: "Kontaktieren Sie uns bei Fragen oder für Hilfe.",
    },
    contact: "support@eorzea-museum.com",
  },
];

const faqs = [
  {
    q: { en: "Can I bring my own food?", de: "Darf ich eigenes Essen mitbringen?" },
    a: {
      en: "Outside food is not permitted, but our café offers a wide selection.",
      de: "Mitgebrachte Speisen sind nicht gestattet, aber unser Café bietet eine große Auswahl.",
    },
  },
  {
    q: { en: "Are pets allowed?", de: "Sind Haustiere erlaubt?" },
    a: {
      en: "Only service animals are permitted inside the museum.",
      de: "Nur Assistenztiere sind im Museum erlaubt.",
    },
  },
];

const Visit = () => {
  const { language } = useLanguage();
  const [expandedTour, setExpandedTour] = useState(null);

  return (
    <Layout pageTitle={language === "de" ? "Besuch" : "Visit"}>
      <ParticleBackground />
      {/* Quick Info Cards */}
      <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickInfo.map((info, i) => (
          <div
            key={i}
            className="glass-card p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-glow"
          >
            <h3 className="text-xl font-cinzel text-eorzea-gold mb-2">{info.title[language]}</h3>
            <p className="text-lg">{info.content[language]}</p>
          </div>
        ))}
      </section>

      {/* Guided Tours */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-cinzel text-eorzea-gold mb-8 magical-text">
          {language === "de" ? "Geführte Touren" : "Guided Tours"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tours.map((tour, i) => (
            <div key={i} className="glass-card p-6 flex flex-col">
              <img
                src={tour.image}
                alt={tour.title[language]}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-cinzel text-eorzea-gold mb-2">{tour.title[language]}</h3>
              <p className="mb-2">
                <strong>{language === "de" ? "Zeit:" : "Schedule:"}</strong> {tour.schedule[language]}
              </p>
              <button
                className="btn btn-secondary mb-2 self-start"
                onClick={() => setExpandedTour(expandedTour === i ? null : i)}
              >
                {expandedTour === i
                  ? language === "de"
                    ? "Weniger anzeigen"
                    : "Show Less"
                  : language === "de"
                  ? "Mehr erfahren"
                  : "Learn More"}
              </button>
              {expandedTour === i && (
                <div className="mt-2">
                  <p className="mb-2">{tour.narrative[language]}</p>
                  <ul className="list-disc list-inside text-eorzea-gold mb-2">
                    {tour.highlights[language].map((hl, idx) => (
                      <li key={idx}>{hl}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-cinzel text-eorzea-gold mb-8 magical-text">
          {language === "de" ? "Ausstattung" : "Facilities"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {amenities.map((a) => (
            <div
              key={a.key}
              className="glass-card flex flex-col items-center p-6 text-center transition-transform duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-3">{icons[a.key]}</div>
              <h3 className="text-lg font-cinzel text-eorzea-gold mb-2">{a[language]}</h3>
              <p>{a.desc[language]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Special Events */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-cinzel text-eorzea-gold mb-8 magical-text">
          {language === "de" ? "Sonderveranstaltungen" : "Special Events"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {events.map((event, i) => (
            <div key={i} className="glass-card p-6">
              <h3 className="text-xl font-cinzel text-eorzea-gold mb-2">{event.title[language]}</h3>
              <p className="mb-2">
                <strong>{language === "de" ? "Datum:" : "Date:"}</strong> {event.date[language]}
              </p>
              <p>{event.desc[language]}</p>
            </div>
          ))}
        </div>
        {/* Placeholder Calendar */}
        <div className="glass-card p-6 text-center">
          <h4 className="text-lg font-cinzel text-eorzea-gold mb-2">
            {language === "de" ? "Veranstaltungskalender" : "Event Calendar"}
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-eorzea-dark/70 rounded-lg px-4 py-2 text-eorzea-gold"
              >
                {language === "de"
                  ? `Platzhalter-Event ${i + 1}`
                  : `Placeholder Event ${i + 1}`}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-cinzel text-eorzea-gold mb-8 magical-text">
          {language === "de" ? "Anreise" : "Transportation"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-cinzel text-eorzea-gold mb-2">
              {language === "de" ? "In-Game Koordinaten" : "In-Game Coordinates"}
            </h3>
            <p>
              {language === "de"
                ? "Lavender Beds, Bezirk 12, Grundstück 30"
                : "Lavender Beds, Ward 12, Plot 30"}
            </p>
            <h3 className="text-lg font-cinzel text-eorzea-gold mt-6 mb-2">
              {language === "de" ? "Reale Adresse" : "Real-World Address"}
            </h3>
            <p>
              {language === "de"
                ? "123 Eorzea-Straße, Gridania, Fantasyland"
                : "123 Eorzea Street, Gridania, Fantasyland"}
            </p>
            <h3 className="text-lg font-cinzel text-eorzea-gold mt-6 mb-2">
              {language === "de" ? "Anreisehinweise" : "Directions"}
            </h3>
            <p>
              {language === "de"
                ? "Mit dem Luftschiff nach Gridania, dann dem Pfad zu den Lavender Beds folgen."
                : "Take the airship to Gridania, then follow the path to the Lavender Beds."}
            </p>
          </div>
          <div>
            {/* Placeholder Map */}
            <div className="glass-card p-4 flex flex-col items-center">
              <div className="w-full h-64 bg-eorzea-blue/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-eorzea-gold text-2xl">
                  {language === "de" ? "Kartenplatzhalter" : "Map Placeholder"}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="bg-eorzea-gold/20 px-2 py-1 rounded">
                  {language === "de" ? "Museum" : "Museum"}
                </span>
                <span className="bg-eorzea-green/20 px-2 py-1 rounded">
                  {language === "de" ? "Teleport" : "Teleport"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-cinzel text-eorzea-gold mb-8 magical-text">
          {language === "de" ? "Barrierefreiheit" : "Accessibility"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {accessibility.map((a, i) => (
            <div key={i} className="glass-card p-6">
              <h3 className="text-lg font-cinzel text-eorzea-gold mb-2">{a.title[language]}</h3>
              <p>{a.desc[language]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visitor Services */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-cinzel text-eorzea-gold mb-8 magical-text">
          {language === "de" ? "Besucherservice" : "Visitor Services"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {visitorServices.map((s, i) => (
            <div key={i} className="glass-card p-6">
              <h3 className="text-lg font-cinzel text-eorzea-gold mb-2">{s.title[language]}</h3>
              <p className="mb-2">{s.desc[language]}</p>
              <p>
                <strong>Email:</strong> <a href={`mailto:${s.contact}`} className="text-eorzea-gold hover:underline">{s.contact}</a>
              </p>
            </div>
          ))}
        </div>
        <div className="glass-card p-6">
          <h4 className="text-lg font-cinzel text-eorzea-gold mb-2">
            {language === "de" ? "Häufige Fragen" : "Frequently Asked Questions"}
          </h4>
          <ul className="space-y-4">
            {faqs.map((faq, i) => (
              <li key={i}>
                <strong>{faq.q[language]}</strong>
                <br />
                {faq.a[language]}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Visit;
