'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import RedThread from '../RedThread';

export default function Frame2_HumanStories() {
  const container = useRef<HTMLElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px) and (min-height: 600px)",
      isMobile: "(max-width: 767px), (max-height: 599px)"
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      if (isDesktop) {
        // Desktop: Pinned horizontal scrolling
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'center center',
            end: '+=150%', // Scroll duration for the horizontal travel
            pin: true,
            scrub: 1, 
          }
        });

        tl.fromTo(imageWrapper.current, 
          { x: '-100vw', opacity: 0 },
          { x: '10vw', opacity: 1, duration: 1, ease: 'power2.out' }
        )
        .to(imageWrapper.current, {
          x: '30vw', // Continues moving to rest closer to the right side
          duration: 1.5,
          ease: 'none'
        });

        setTimeline(tl);
      } else {
        // Mobile: Simple scroll triggered reveal without pinning
        gsap.fromTo(imageWrapper.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: container.current,
              start: 'top 80%',
              end: 'bottom 20%',
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
      className="frame2-section"
    >
      {/* Background Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.25 }}>
        <img 
          src="/photos/sandra-photo-behind-wall.png" 
          alt="Background - Sandra behind wall" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <RedThread d="M 50 0 L 50 15 Q 50 20 45 20 L 10 20 Q 5 20 5 25 L 5 90 Q 5 95 10 95 L 90 95 Q 95 95 95 100" strokeWidth={1} color="var(--color-red)" timeline={timeline} style={{ zIndex: 3 }} />

      <div className="container frame2-text-container">
        <div style={{ maxWidth: '600px' }}>
          <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Human Stories</h2>
          <p>
            The red thread connects stories of migration across continents. 
            From the shores of Calais to the borders of the Mediterranean, 
            the struggle for dignity remains universal.
          </p>
        </div>
      </div>
      
      {/* 
        Image is significantly larger and preserves the original documentary composition.
        In desktop, it travels; in mobile, it displays in natural vertical flow.
      */}
      <div 
        ref={imageWrapper} 
        className="frame2-image-wrapper"
      >
        <Image 
          src="/photos/CALAIS_02.jpg" 
          alt="Human Stories - Waiting in Calais" 
          fill 
          sizes="(max-width: 767px) 100vw, 70vw"
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
      </div>
    </section>
  );
}
