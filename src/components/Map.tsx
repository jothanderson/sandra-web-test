'use client';

import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';

// Data from user's example, customized for the narrative
const stories = [
  {
    id: 1,
    name: "The Calais Jungle",
    country: "France",
    category: "migration",
    lat: 50.9513,
    lng: 1.8587,
    image: "/photos/CALAIS_01.jpg",
    link: "#"
  },
  {
    id: 2,
    name: "Paris Aftermath",
    country: "France",
    category: "human-rights",
    lat: 48.8566,
    lng: 2.3522,
    image: "/photos/PARIS_02.jpg",
    link: "#"
  },
  {
    id: 3,
    name: "Sri Lanka's Resilience",
    country: "Sri Lanka",
    category: "women",
    lat: 7.8731,
    lng: 80.7718,
    image: "/photos/SRILANKA_01.jpg",
    link: "#"
  }
];

// Custom marker icon using the user's styling
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `<div style="
      width: 18px; 
      height: 18px; 
      border-radius: 50%; 
      background: #d32f2f; 
      border: 3px solid white; 
      box-shadow: 0 0 10px #d32f2f, 0 0 20px #d32f2f;
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

export default function InteractiveMap() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredStories = stories.filter(
    story => activeCategory === 'all' || story.category === activeCategory
  );

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      
      {/* Narrative Filters */}
      <div style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        zIndex: 1000, 
        display: 'flex', 
        gap: '10px',
        background: 'rgba(0,0,0,0.5)',
        padding: '10px',
        borderRadius: '8px'
      }}>
        {['all', 'migration', 'human-rights', 'women'].map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px',
              background: activeCategory === cat ? 'var(--color-red)' : '#111',
              color: 'white',
              border: '1px solid #333',
              borderRadius: '20px',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              textTransform: 'capitalize',
              transition: 'all 0.3s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <MapContainer 
        center={[30.0, 30.0]} 
        zoom={3} 
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          subdomains={['a', 'b', 'c', 'd']}
          maxZoom={20}
        />
        
        {filteredStories.map(story => (
          <Marker 
            key={story.id} 
            position={[story.lat, story.lng]}
            icon={createCustomIcon()}
          >
            <Popup 
              className="narrative-popup"
              closeButton={false}
            >
              <div style={{ 
                width: '300px', 
                background: '#111', 
                color: 'white', 
                borderRadius: '12px',
                overflow: 'hidden',
                padding: '15px',
                textAlign: 'center'
              }}>
                <div style={{ position: 'relative', width: '100%', height: '180px', marginBottom: '15px' }}>
                  <Image src={story.image} alt={story.name} fill style={{ objectFit: 'cover', borderRadius: '8px' }} />
                </div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '20px', color: '#fff', fontFamily: 'var(--font-serif)' }}>{story.name}</h3>
                <p style={{ margin: '0 0 15px 0', color: '#aaa', fontSize: '14px', fontFamily: 'var(--font-sans)' }}>{story.country}</p>
                <button style={{
                  width: '100%',
                  padding: '12px',
                  background: 'var(--color-red)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontFamily: 'var(--font-sans)'
                }}>
                  READ STORY
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Global styles for Leaflet popups to override default white theme */}
      <style dangerouslySetInnerHTML={{__html: `
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
          background: #111 !important;
          color: white !important;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important;
        }
        .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
      `}} />
    </div>
  );
}
