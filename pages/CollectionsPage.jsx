import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ArtifactViewer from '../components/ArtifactViewer';
import Layout from '../components/Layout';

// Beispiel-Artefakte
const sampleArtifacts = [
  {
    id: 1,
    name: {
      en: 'Allagan Tomestone of Poetics',
      de: 'Allagischer Foliant der Poetik'
    },
    description: {
      en: 'An ancient data storage device from the Allagan Empire, containing knowledge of magical arts and poetry.',
      de: 'Ein antisches Datenspeichergerät aus dem Allagischen Imperium, das Wissen über magische Künste und Poesie enthält.'
    },
    image: '/assets/artifacts/tomestone.jpg',
    model: '/assets/models/tomestone.glb',
    category: 'allagan',
    era: 'third-astral',
    location: 'azys-lla'
  },
  {
    id: 2,
    name: {
      en: 'Garlean Ceruleum Engine',
      de: 'Garleanischer Ceruleum-Motor'
    },
    description: {
      en: 'A sophisticated engine powered by ceruleum, showcasing Garlean technological prowess.',
      de: 'Ein hochentwickelter Motor, der mit Ceruleum betrieben wird und die technologische Überlegenheit der Garleaner demonstriert.'
    },
    image: '/assets/artifacts/ceruleum-engine.jpg',
    model: '/assets/models/ceruleum-engine.glb',
    category: 'garlean',
    era: 'modern',
    location: 'garlean-territories'
  },
  {
    id: 3,
    name: {
      en: 'Crystal of Light',
      de: 'Kristall des Lichts'
    },
    description: {
      en: 'A crystal blessed by Hydaelyn, the Mothercrystal. It resonates with the power of light.',
      de: 'Ein von Hydaelyn, dem Mutterkristall, gesegneter Kristall. Er resoniert mit der Kraft des Lichts.'
    },
    image: '/assets/artifacts/crystal-light.jpg',
    model: '/assets/models/crystal-light.glb',
    category: 'crystal',
    era: 'eternal',
    location: 'source'
  }
];

const CollectionsPage = () => {
  const { t, language } = useLanguage();
  const [artifacts, setArtifacts] = useState([]);
  const [filteredArtifacts, setFilteredArtifacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  
  // Artefakte laden
  useEffect(() => {
    // In einer echten Anwendung würden wir die Artefakte von einer API laden
    setArtifacts(sampleArtifacts);
    setFilteredArtifacts(sampleArtifacts);
  }, []);
  
  // Artefakte filtern
  useEffect(() => {
    let filtered = artifacts;
    
    // Nach Suchbegriff filtern
    if (searchTerm) {
      filtered = filtered.filter(artifact => 
        artifact.name[language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        artifact.description[language].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Nach Kategorie filtern
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(artifact => artifact.category === selectedCategory);
    }
    
    // Nach Ära filtern
    if (selectedEra !== 'all') {
      filtered = filtered.filter(artifact => artifact.era === selectedEra);
    }
    
    setFilteredArtifacts(filtered);
  }, [searchTerm, selectedCategory, selectedEra, artifacts, language]);
  
  // Artefakt auswählen für 3D-Ansicht
  const handleArtifactSelect = (artifact) => {
    setSelectedArtifact(artifact);
  };
  
  return (
    <Layout>
      <div className="pt-24 pb-16 bg-eorzea-darker">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-cinzel text-center mb-6">{t('collections_title')}</h1>
          <p className="text-center text-xl mb-12 max-w-3xl mx-auto">{t('collections_subtitle')}</p>
          
          {/* Suchleiste und Filter */}
          <div className="mb-12 bg-eorzea-dark/50 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  placeholder={t('search_artifacts')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 bg-eorzea-dark border border-eorzea-gold/30 rounded-md text-eorzea-light focus:border-eorzea-gold focus:outline-none"
                />
              </div>
              
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-eorzea-dark border border-eorzea-gold/30 rounded-md text-eorzea-light focus:border-eorzea-gold focus:outline-none"
                >
                  <option value="all">Alle Kategorien</option>
                  <option value="allagan">Allagisch</option>
                  <option value="garlean">Garleanisch</option>
                  <option value="crystal">Kristalle</option>
                </select>
                
                <select
                  value={selectedEra}
                  onChange={(e) => setSelectedEra(e.target.value)}
                  className="px-4 py-2 bg-eorzea-dark border border-eorzea-gold/30 rounded-md text-eorzea-light focus:border-eorzea-gold focus:outline-none"
                >
                  <option value="all">Alle Zeitalter</option>
                  <option value="third-astral">Drittes Astrales Zeitalter</option>
                  <option value="modern">Moderne</option>
                  <option value="eternal">Ewig</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* 3D-Viewer und Artefaktdetails */}
          {selectedArtifact && (
            <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-eorzea-dark/50 p-6 rounded-lg backdrop-blur-sm">
                <ArtifactViewer modelPath={selectedArtifact.model} />
              </div>
              
              <div className="bg-eorzea-dark/50 p-6 rounded-lg backdrop-blur-sm">
                <h2 className="text-2xl font-cinzel text-eorzea-gold mb-4">{selectedArtifact.name[language]}</h2>
                <p className="mb-6">{selectedArtifact.description[language]}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-cinzel text-eorzea-gold mb-2">Kategorie</h3>
                    <p>{selectedArtifact.category === 'allagan' ? 'Allagisch' : 
                       selectedArtifact.category === 'garlean' ? 'Garleanisch' : 'Kristall'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-cinzel text-eorzea-gold mb-2">Zeitalter</h3>
                    <p>{selectedArtifact.era === 'third-astral' ? 'Drittes Astrales Zeitalter' : 
                       selectedArtifact.era === 'modern' ? 'Moderne' : 'Ewig'}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-cinzel text-eorzea-gold mb-2">Fundort</h3>
                    <p>{selectedArtifact.location === 'azys-lla' ? 'Azys Lla' : 
                       selectedArtifact.location === 'garlean-territories' ? 'Garleanische Territorien' : 'The Source'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Artefaktliste */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtifacts.map(artifact => (
              <div 
                key={artifact.id} 
                className="bg-eorzea-dark/50 rounded-lg overflow-hidden border border-eorzea-gold/20 hover:border-eorzea-gold/50 transition-all cursor-pointer"
                onClick={() => handleArtifactSelect(artifact)}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={artifact.image} 
                    alt={artifact.name[language]} 
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-cinzel text-eorzea-gold mb-2">{artifact.name[language]}</h3>
                  <p className="text-sm line-clamp-3">{artifact.description[language]}</p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-eorzea-gold/70">
                      {artifact.category === 'allagan' ? 'Allagisch' : 
                       artifact.category === 'garlean' ? 'Garleanisch' : 'Kristall'}
                    </span>
                    
                    <button className="text-sm text-eorzea-gold hover:underline">
                      3D-Ansicht
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredArtifacts.length === 0 && (
            <div className="text-center py-12">
              <p>Keine Artefakte gefunden. Bitte versuchen Sie eine andere Suche.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CollectionsPage;
