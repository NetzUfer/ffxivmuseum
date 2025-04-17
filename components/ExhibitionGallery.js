import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import GlassCard from './GlassCard';

// Beispieldaten für 45 Ausstellungen
const generateExhibitions = () => {
  const types = ['permanent', 'temporary', 'upcoming'];
  const exhibitions = [];
  
  // Ausstellungstitel
  const exhibitionTitles = {
    en: [
      'The Allagan Empire: Technology and Downfall',
      'Primals: Gods and Monsters',
      'City-States of Eorzea: A Cultural Comparison',
      'The Dragonsong War: A Thousand Years of Conflict',
      'Ascians and the Rejoining',
      'The Warriors of Light Through History',
      'Garlemald: Rise and Fall of an Empire',
      'The Scions of the Seventh Dawn',
      'Hydaelyn and Zodiark: The Divine Conflict',
      'Aether: The Lifeblood of Eorzea',
      'The First Reflection: World of Eternal Light',
      'Amaurot: The Lost Civilization',
      'Beastmen Tribes and Their Cultures',
      'The Weapons Project: Garlean War Machines',
