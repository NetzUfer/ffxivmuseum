import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Konfiguration für die Karte
mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // In einer echten Anwendung würde dies aus Umgebungsvariablen kommen

const InteractiveMap = ({ initialCenter = [0, 0], initialZoom = 5 }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [activeMarker, setActiveMarker] = useState(null);
  
  // Beispieldaten für Marker auf der Karte
  const markers = [
    {
      id: 'museum',
      name: 'Eorzea Museum of History',
      description: 'Hauptstandort des Museums in den Lavender Beds',
      coordinates: [-0.5, 0.8],
      icon: 'museum'
    },
    {
      id: 'gridania',
      name: 'Gridania',
      description: 'Die Waldstadt und Heimat der Elementargeister',
      coordinates: [-0.2, 0.6],
      icon: 'city'
    },
    {
      id: 'uldah',
      name: 'Ul\'dah',
      description: 'Die Wüstenstadt der Händler und Gladiatoren',
      coordinates: [-0.8, -0.3],
      icon: 'city'
    },
    {
      id: 'limsa',
      name: 'Limsa Lominsa',
      description: 'Die maritime Stadtstadt der Seefahrer und ehemaligen Piraten',
      coordinates: [-1.2, 0.4],
      icon: 'city'
    },
    {
      id: 'ishgard',
      name: 'Ishgard',
      description: 'Die Hochlandstadt im ewigen Konflikt mit den Drachen',
      coordinates: [0.3, 0.9],
      icon: 'castle'
    },
    {
      id: 'azyslla',
      name: 'Azys Lla',
      description: 'Fliegende Insel allagischer Technologie',
      coordinates: [0.7, -0.5],
      icon: 'landmark'
    }
  ];
  
  useEffect(() => {
    if (map.current) return; // Karte nur einmal initialisieren
    
    // Benutzerdefinierter Kartenstil für Final Fantasy Ästhetik
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'eorzea-map': {
            type: 'image',
            url: '/maps/eorzea-map.jpg', // Pfad zur Eorzea-Karte
            coordinates: [
              [-2, 2], // Oben links [Längengrad, Breitengrad]
              [2, 2],  // Oben rechts
              [2, -2], // Unten rechts
              [-2, -2] // Unten links
            ]
          }
        },
        layers: [
          {
            id: 'eorzea-layer',
            type: 'raster',
            source: 'eorzea-map',
            paint: {
              'raster-fade-duration': 0
            }
          }
        ]
      },
      center: initialCenter,
      zoom: initialZoom
    });
    
    // Karte laden
    map.current.on('load', () => {
      // Marker hinzufügen
      markers.forEach(marker => {
        // Benutzerdefiniertes Marker-Element erstellen
        const el = document.createElement('div');
        el.className = `marker marker-${marker.icon}`;
        el.style.backgroundImage = `url(/icons/${marker.icon}.svg)`;
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.backgroundSize = '100%';
        el.style.cursor = 'pointer';
        
        // Magischen Glüheffekt hinzufügen
        el.style.filter = 'drop-shadow(0 0 5px rgba(201, 166, 107, 0.7))';
        
        // Marker zur Karte hinzufügen
        const mapMarker = new mapboxgl.Marker(el)
          .setLngLat(marker.coordinates)
          .addTo(map.current);
        
        // Event-Listener für Hover-Effekt
        el.addEventListener('mouseenter', () => {
          el.style.filter = 'drop-shadow(0 0 10px rgba(201, 166, 107, 1))';
          el.style.transform = 'scale(1.2)';
        });
        
        el.addEventListener('mouseleave', () => {
          if (activeMarker !== marker.id) {
            el.style.filter = 'drop-shadow(0 0 5px rgba(201, 166, 107, 0.7))';
            el.style.transform = 'scale(1)';
          }
        });
        
        // Event-Listener für Klick
        el.addEventListener('click', () => {
          setActiveMarker(marker.id);
          
          // Popup mit Informationen anzeigen
          new mapboxgl.Popup({ offset: 25, className: 'eorzea-popup' })
            .setLngLat(marker.coordinates)
            .setHTML(`
              <h3>${marker.name}</h3>
              <p>${marker.description}</p>
              ${marker.id === 'museum' ? '<a href="/visit" class="popup-link">Besuch planen</a>' : ''}
            `)
            .addTo(map.current);
            
          // Zur Position zoomen
          map.current.flyTo({
            center: marker.coordinates,
            zoom: 7,
            duration: 1500,
            essential: true
          });
        });
      });
      
      // Magische Partikeleffekte auf der Karte
      addParticleEffects();
    });
    
    // Partikeleffekte zur Karte hinzufügen
    function addParticleEffects() {
      const canvas = document.createElement('canvas');
      canvas.width = mapContainer.current.clientWidth;
      canvas.height = mapContainer.current.clientHeight;
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '1';
      mapContainer.current.appendChild(canvas);
      
      const ctx = canvas.getContext('2d');
      
      // Partikel erstellen
      const particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: 'rgba(201, 166, 107, ' + (Math.random() * 0.5 + 0.2) + ')',
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25
        });
      }
      
      // Partikel animieren
      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
          
          // Partikel bewegen
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Partikel zurücksetzen, wenn sie den Rand erreichen
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.x = Math.random() * canvas.width;
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.y = Math.random() * canvas.height;
          }
        });
        
        requestAnimationFrame(animateParticles);
      }
      
      animateParticles();
    }
    
    // Cleanup
    return () => {
      map.current.remove();
      map.current = null;
    };
  }, [initialCenter, initialZoom]);
  
  return (
    <div className="map-container">
      <div 
        ref={mapContainer} 
        className="map"
        style={{ 
          width: '100%', 
          height: '600px',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 0 20px rgba(201, 166, 107, 0.3)'
        }}
      />
      <div className="map-legend">
        <h4>Legende</h4>
        <div className="legend-item">
          <div className="legend-icon museum-icon"></div>
          <span>Museum</span>
        </div>
        <div className="legend-item">
          <div className="legend-icon city-icon"></div>
          <span>Stadtstaaten</span>
        </div>
        <div className="legend-item">
          <div className="legend-icon landmark-icon"></div>
          <span>Sehenswürdigkeiten</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
