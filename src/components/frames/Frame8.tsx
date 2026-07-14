'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import RedThread from '../RedThread';

export default function Frame8_WhoFollowsTheThread() {
  const container = useRef<HTMLDivElement>(null);
  const textCol = useRef<HTMLDivElement>(null);
  const sandraImage = useRef<HTMLDivElement>(null);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px) and (min-height: 600px)",
      isMobile: "(max-width: 767px), (max-height: 599px)"
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      if (isDesktop) {
        // Desktop: Timeline with pinning
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '+=250%', // Much longer scroll distance
            pin: true,
            scrub: 1, // Slower smoothing
          }
        });

        // 1. Slow gradual reveal of Sandra background
        tl.fromTo(sandraImage.current, 
          { filter: 'blur(30px)', opacity: 0, scale: 1.15, yPercent: 5 },
          { 
            filter: 'blur(0px)', 
            opacity: 0.28, // Soft cinematic background opacity
            scale: 1, 
            yPercent: 0,
            duration: 3, 
            ease: 'power2.inOut'
          }
        )
        // 2. Delayed text appearance
        .fromTo(textCol.current,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 1.5, ease: 'power2.out' },
          '-=1' // Overlap slightly with the end of the image reveal
        )
        // 3. Hold for reading
        .to({}, { duration: 1 });

        setTimeline(tl);
      } else {
        // Mobile: Simple scroll-triggered reveals without pinning
        gsap.fromTo(sandraImage.current,
          { filter: 'blur(20px)', opacity: 0, scale: 1.1 },
          {
            filter: 'blur(0px)',
            opacity: 0.35, // Soft background
            scale: 1,
            scrollTrigger: {
              trigger: container.current,
              start: 'top 80%',
              end: 'top 20%',
              scrub: true,
            }
          }
        );

        gsap.fromTo(textCol.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: textCol.current,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            }
          }
        );

        setTimeline(null);
      }
    });

    return () => {
      setTimeline(null);
    };
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="frame8-section"
    >
      {/* Background Image */}
      <div 
        ref={sandraImage} 
        className="frame8-bg"
      >
        <img 
          src="/photos/sandra-photo-Paris-frame-8.png" 
          alt="Background - Sandra in Paris" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <RedThread d="M 50 0 L 50 5 Q 50 10 45 10 L 30 10 Q 25 10 25 15 L 25 80 Q 25 85 30 85 L 85 85 Q 90 85 90 90 L 90 100" strokeWidth={1} color="var(--color-red)" timeline={timeline} style={{ zIndex: 3 }} />

      <div className="container frame8-text-container">
        <div ref={textCol} style={{ maxWidth: '650px', opacity: 0 }}>
          <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Who follows the thread?</h2>
          <h3 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: 'var(--spacing-xs)', fontFamily: 'var(--font-sans)', color: 'var(--text-color)' }}>Sandra Jabalera</h3>
          <p style={{ fontSize: '1.125rem', fontWeight: 500, color: 'var(--color-red)', marginBottom: 'var(--spacing-md)' }}>Periodista y fotógrafa independiente.</p>
          <p style={{ fontSize: '1.25rem', marginBottom: 'var(--spacing-md)', lineHeight: '1.6', fontWeight: 300 }}>
            Escucha, observa y conecta historias<br />
            que necesitan ser contadas.
          </p>
          <p style={{ fontSize: '1.25rem', lineHeight: '1.6', fontWeight: 300 }}>
            Su compromiso es amplificar<br />
            voces y generar conciencia<br />
            para construir un mundo<br />
            más justo y humano.
          </p>
        </div>
      </div>
    </section>
  );
}
