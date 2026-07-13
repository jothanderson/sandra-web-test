'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';
import RedThread from '../RedThread';

// Leaflet requires the window object, so it must be dynamically imported with ssr: false
const InteractiveMap = dynamic(() => import('../Map'), { 
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a' }}>
      <p style={{ color: '#fff', opacity: 0.5 }}>Loading Geographic Data...</p>
    </div>
  )
});

export default function Frame4_GeographyOfStories() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax fade in for the text
    gsap.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: container.current,
        start: 'top 70%',
      }
    });

    // Reveal the map container smoothly
    gsap.from(mapContainerRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 50%',
      }
    });
  }, { scope: container });

  return (
    <section 
      ref={container}
      style={{ 
        position: 'relative',
        minHeight: '130vh', // Extra height to allow scrolling past the map
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: 'var(--spacing-xl)',
        paddingBottom: 'var(--spacing-xl)',
        backgroundColor: 'var(--bg-color)',
        zIndex: 10,
        width: '100%'
      }}
    >
      <RedThread d="M 15 0 L 15 90 Q 15 95 20 95 L 90 95 Q 95 95 95 100" strokeWidth={1} color="var(--color-red)" style={{ zIndex: 3 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center' }}>
        <div ref={textRef} style={{ position: 'relative', zIndex: 2, marginBottom: 'var(--spacing-lg)' }}>
          <h2>The Geography of Stories</h2>
          <p style={{ color: 'var(--text-color)', opacity: 0.8, maxWidth: '600px', marginTop: 'var(--spacing-sm)' }}>
            Every location holds a narrative. Explore the archive geographically to understand the scale of human movement and resilience.
          </p>
        </div>
        
        {/* Interactive Map Container */}
        <div 
          ref={mapContainerRef}
          style={{ 
            position: 'relative',
            zIndex: 2,
            width: '100%', 
            height: '70vh', 
            minHeight: '500px',
            borderRadius: '20px', 
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
          }}
        >
          <InteractiveMap />
        </div>
      </div>
    </section>
  );
}
