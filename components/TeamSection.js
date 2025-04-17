import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import GlassCard from './GlassCard';

// Beispieldaten für 61 Teammitglieder
const generateTeamMembers = () => {
  const roles = ['curator', 'historian', 'archivist', 'guide', 'researcher', 'conservator'];
  const teamMembers = [];
  
  // Vornamen für verschiedene Rassen aus FFXIV
  const firstNames = [
    'Alphinaud', 'Alisaie', 'Y\'shtola', 'Thancred', 'Urianger', 'Minfilia',
    'Lyse', 'Papalymo', 'Yda', 'Moenbryda', 'Krile', 'Tataru', 'F\'lhaminn',
    'Cid', 'Nero', 'Biggs', 'Wedge', 'Jessie', 'Hien', 'Yugiri', 'Gosetsu',
    'Aymeric', 'Estinien', 'Lucia', 'Haurchefant', 'Edmont', 'Artoirel',
    'Emmanellain', 'Nanamo', 'Raubahn', 'Pipin', 'Lolorito', 'Teledji',
    'Kan-E-Senna', 'Raya-O-Senna', 'A-Ruhn-Senna', 'Merlwyb', 'Eynzahr',
    'Jenlyns', 'Constaint', 'Mylla', 'Aldis', 'Cocobuki', 'Lalai',
    'Thubyrgeim', 'Shatotto', 'Matoya', 'Gerolt', 'Rowena', 'Godbert',
    'Julyan', 'Hildibrand', 'Nashu', 'Gilgamesh', 'Enkidu', 'Ultros',
    'Typhon', 'Gaius', 'Livia', 'Nero', 'Rhitahtyn', 'Lahabrea'
  ];
  
  // Nachnamen für verschiedene Rassen aus FFXIV
  const lastNames = [
    'Leveilleur', 'Rhul', 'Waters', 'Augurelt', 'Warde', 'Hext',
    'Totolymo', 'Molkoh', 'Wilfsunnwyn', 'Baldesion', 'Taru', 'Lominsa',
    'nan Garlond', 'tol Scaeva', 'Bastard', 'Wedge', 'Jaye', 'Rijin',
    'Brutus', 'Yuguiri', 'Everborn', 'de Borel', 'Wyrmblood', 'goe Junius',
    'Greystone', 'de Fortemps', 'de Fortemps', 'de Fortemps', 'ul Namo',
    'Aldynn', 'Tarupin', 'Nanarito', 'Adeledji', 'Senna', 'Senna',
    'Senna', 'Bloefhiswyn', 'Slafyrsyn', 'Brightheart', 'Constaint',
    'Morbolvache', 'Lanyitte', 'Cocobuki', 'Lalai', 'Thubwhatsit',
    'Shatotto', 'Matoya', 'Gerolt', 'Rowena', 'Manderville',
    'Manderville', 'Manderville', 'Mhakaracca', 'Gilgamesh', 'Enkidu',
    'Ultros', 'Typhon', 'van Baelsar', 'sas Junius', 'tol Scaeva', 'pyr Longus'
  ];
  
  // 61 Teammitglieder generieren
  for (let i = 1; i <= 61; i++) {
    const firstNameIndex = Math.floor(Math.random() * firstNames.length);
    const lastNameIndex = Math.floor(Math.random() * lastNames.length);
    const roleIndex = Math.floor(Math.random() * roles.length);
    
    teamMembers.push({
      id: i,
      firstName: firstNames[firstNameIndex],
      lastName: lastNames[lastNameIndex],
      role: roles[roleIndex],
      image: `/assets/team/member-${(i % 20) + 1}.jpg` // Zyklisch durch 20 Bilder rotieren
    });
  }
  
  return teamMembers;
};

const teamMembers = generateTeamMembers();

const TeamSection = () => {
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(12);
  
  const loadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 12, teamMembers.length));
  };
  
  return (
    <section className="py-16 md:py-24 bg-eorzea-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cinzel text-eorzea-gold mb-4 magical-text">
            {t('team_title')}
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            {t('team_subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {teamMembers.slice(0, visibleCount).map(member => (
            <GlassCard key={member.id} className="team-card">
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-t-lg">
                <img 
                  src={member.image} 
                  alt={`${member.firstName} ${member.lastName}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-cinzel text-eorzea-gold">
                  {member.firstName} {member.lastName}
                </h3>
                <p className="text-eorzea-light/80">
                  {t(member.role)}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>
        
        {visibleCount < teamMembers.length && (
          <div className="text-center mt-12">
            <button 
              className="btn btn-secondary"
              onClick={loadMore}
            >
              {t('view_more')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
