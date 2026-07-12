'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
    gsap.from(contentRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'center center',
        toggleActions: 'play none none reverse',
      }
    });
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
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <div ref={bgRef} style={{ position: 'absolute', top: '-10%', left: 0, width: '100%', height: '120%' }}>
          <Image 
            src="/photos/PARIS_02.jpg" 
            alt="The Revelation - Paris" 
            fill 
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
          />
        </div>
        {/* Illumination overlay that fades out to reveal the bright Paris image completely */}
        <div ref={illuminationRef} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--bg-color), rgba(255,255,255,0) 60%)' }} />
      </div>
      
      <div ref={contentRef} className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>Keep following the thread</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-md)' }}>
          <button style={{ padding: '1rem 2rem', backgroundColor: 'var(--color-red)', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '1rem' }}>
            Explore the Map
          </button>
          <button style={{ padding: '1rem 2rem', backgroundColor: 'transparent', color: 'var(--text-color)', border: '1px solid var(--text-color)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: '1rem' }}>
            Discover the Archive
          </button>
        </div>
      </div>
    </section>
  );
}
