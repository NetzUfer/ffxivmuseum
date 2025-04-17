import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import GlassCard from './GlassCard';

// Beispieldaten für 36 Freundeskreis-Mitglieder
const generateFriendsMembers = () => {
  const roles = ['patron', 'benefactor', 'supporter'];
  const friendsMembers = [];
  
  // Vornamen für verschiedene Rassen aus FFXIV
  const firstNames = [
    'Ryne', 'Gaia', 'Emet-Selch', 'Hythlodaeus', 'Venat', 'Hermes',
    'Elidibus', 'Lahabrea', 'Igeyorhm', 'Nabriales', 'Mitron', 'Loghrif',
    'Fandaniel', 'Azem', 'G\'raha', 'Lyna', 'Chai-Nuzz', 'Dulia-Chai',
    'Alphinaud', 'Alisaie', 'Thancred', 'Y\'shtola', 'Urianger', 'Krile',
    'Tataru', 'Minfilia', 'Moenbryda', 'Papalymo', 'Yda', 'Lyse',
    'Hien', 'Yugiri', 'Gosetsu', 'Cirina', 'Sadu', 'Magnai'
  ];
  
  // Nachnamen für verschiedene Rassen aus FFXIV
  const lastNames = [
    'Oracle', 'Shadowkeeper', 'Galvus', 'Ancient', 'Venat', 'Hermes',
    'Emissary', 'Speaker', 'Igeyorhm', 'Nabriales', 'Mitron', 'Loghrif',
    'Fandaniel', 'Azem', 'Tia', 'Lyna', 'Chai', 'Chai',
    'Leveilleur', 'Leveilleur', 'Waters', 'Rhul', 'Augurelt', 'Baldesion',
    'Taru', 'Warde', 'Wilfsunnwyn', 'Totolymo', 'Hext', 'Hext',
    'Rijin', 'Mistwalker', 'Everborn', 'Mol', 'Dotharl', 'Oronir'
  ];
  
  // 36 Freundeskreis-Mitglieder generieren
  for (let i = 1; i <= 36; i++) {
    const firstNameIndex = Math.floor(Math.random() * firstNames.length);
    const lastNameIndex = Math.floor(Math.random() * lastNames.length);
    const roleIndex = Math.floor(Math.random() * roles.length);
    
    friendsMembers.push({
      id: i,
      firstName: firstNames[firstNameIndex],
      lastName: lastNames[lastNameIndex],
      role: roles[roleIndex],
      image: `/assets/friends/friend-${(i % 15) + 1}.jpg` // Zyklisch durch 15 Bilder rotieren
    });
  }
  
  return friendsMembers;
};

const friendsMembers = generateFriendsMembers();

const FriendsSection = () => {
  const { t } = useLanguage();
  const [visibleCount, setVisibleCount] = useState(12);
  
  const loadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 12, friendsMembers.length));
  };
  
  return (
    <section className="py-16 md:py-24 bg-eorzea-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cinzel text-eorzea-gold mb-4 magical-text">
            {t('friends_title')}
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            {t('friends_subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friendsMembers.slice(0, visibleCount).map(member => (
            <GlassCard key={member.id} className="friend-card">
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
        
        {visibleCount < friendsMembers.length && (
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

export default FriendsSection;
