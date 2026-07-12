'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Frame2_HumanStories() {
  const container = useRef<HTMLDivElement>(null);
  const imageWrapper = useRef<HTMLDivElement>(null);

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
        overflow: 'hidden'
      }}
    >
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
