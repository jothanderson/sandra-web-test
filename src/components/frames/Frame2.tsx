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
    // Pin the section to allow the image to travel across the frame
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'center center',
        end: '+=150%', // Scroll duration for the horizontal travel
        pin: true,
        scrub: 1, 
      }
    });

    // Horizontal travel: Enters from the left, travels across, rests closer to the right
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
  }, { scope: container });

  return (
    <section 
      ref={container}
      style={{ 
        position: 'relative', 
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 'var(--spacing-xl) 0',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-color)',
        zIndex: 10
      }}
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

      <div className="container" style={{ position: 'absolute', top: '10vh', left: 0, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
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
        It starts off-screen left and is moved by GSAP.
      */}
      <div 
        ref={imageWrapper} 
        style={{ 
          position: 'absolute', 
          top: '20vh', 
          left: 0, 
          width: '70vw', 
          height: '75vh', 
          zIndex: 1,
          willChange: 'transform'
        }}
      >
        <Image 
          src="/photos/CALAIS_02.jpg" 
          alt="Human Stories - Waiting in Calais" 
          fill 
          sizes="70vw"
          style={{ objectFit: 'contain', objectPosition: 'center' }}
        />
      </div>
    </section>
  );
}
