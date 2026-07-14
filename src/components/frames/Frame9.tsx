'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import RedThread from '../RedThread';

export default function Frame9_TheRevelation() {
  const container = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const illuminationRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background
    gsap.to(bgRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    // Final illumination sequence (the gradient overlay gets much brighter/clearer)
    gsap.fromTo(illuminationRef.current,
      { opacity: 0.8 },
      { 
        opacity: 0, 
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top center',
          end: 'bottom bottom',
          scrub: true,
        }
      }
    );

    // Fade up final CTAs
    // Using fromTo instead of from to avoid production hydration/FOUC bugs
    // Adjusting start trigger to 'top 75%' so it fires reliably when entering the final section
    gsap.fromTo(contentRef.current, 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    );
  }, { scope: container });

  return (
    <section 
      ref={container}
      style={{ 
        position: 'relative', 
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 'var(--spacing-xl)',
        overflow: 'hidden',
        zIndex: 10
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div ref={bgRef} style={{ position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%' }}>
          <img 
            src="/photos/sandra-photo-Hilo-rojo-frame-9.png" 
            alt="The Revelation - Paris" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
          />
        </div>
        {/* Illumination overlay that fades out to reveal the bright Paris image completely */}
        <div ref={illuminationRef} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-color), rgba(255,255,255,0) 60%)' }} />
      </div>

      <RedThread d="M 90 0 L 90 90 Q 90 95 85 95 L 50 95 Q 45 95 45 100" strokeWidth={1} color="var(--color-red)" style={{ zIndex: 3 }} />
      
      <div ref={contentRef} className="container frame9-content">
        <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Keep following the thread</h2>
        
        <div className="frame9-button-group">
          <button style={{ 
            padding: '1rem 2.5rem', 
            backgroundColor: 'var(--color-red)', 
            color: 'white', 
            border: 'none', 
            borderRadius: '50px',
            fontWeight: 500,
            boxShadow: '0 4px 15px rgba(211, 47, 47, 0.4)',
            cursor: 'pointer', 
            fontFamily: 'var(--font-sans)', 
            fontSize: '1rem',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(211, 47, 47, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(211, 47, 47, 0.4)';
          }}
          >
            Explore the Map
          </button>
          <button style={{ 
            padding: '1rem 2.5rem', 
            backgroundColor: 'transparent', 
            color: 'var(--text-color)', 
            border: '2px solid var(--text-color)', 
            borderRadius: '50px',
            fontWeight: 500,
            cursor: 'pointer', 
            fontFamily: 'var(--font-sans)', 
            fontSize: '1rem',
            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.backgroundColor = 'var(--text-color)';
            e.currentTarget.style.color = 'var(--bg-color)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-color)';
          }}
          >
            Discover the Archive
          </button>
        </div>
      </div>
    </section>
  );
}
