'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Frame5_Darkroom() {
  const container = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: '+=400%', // Increased pinned duration
        pin: true,
        scrub: true,
      }
    });

    // Dark screen initially, then first photo emerges
    tl.fromTo(img1Ref.current,
      { filter: 'grayscale(100%) brightness(0%)', opacity: 0, scale: 0.95 },
      { filter: 'grayscale(0%) brightness(100%)', opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' }
    )
    // Second photo emerges
    .fromTo(img2Ref.current,
      { filter: 'grayscale(100%) brightness(0%)', opacity: 0, scale: 0.95 },
      { filter: 'grayscale(0%) brightness(100%)', opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' }
    )
    // Third photo emerges
    .fromTo(img3Ref.current,
      { filter: 'grayscale(100%) brightness(0%)', opacity: 0, scale: 0.95 },
      { filter: 'grayscale(0%) brightness(100%)', opacity: 1, scale: 1, duration: 1, ease: 'power2.inOut' }
    )
    // Editorial text appears in its dedicated zone
    .fromTo(textRef.current, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1 }
    )
    // Hold slightly before transitioning
    .to({}, { duration: 0.5 });

  }, { scope: container });

  return (
    <section 
      ref={container}
      style={{ 
        position: 'relative', 
        height: '100vh',
        width: '100%',
        backgroundColor: '#111111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* Dedicated Editorial Text Zone (Top Center, no image overlap) */}
        <div 
          ref={textRef} 
          style={{ 
            position: 'absolute', 
            top: '10%', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            textAlign: 'center',
            zIndex: 10,
            width: '100%',
            opacity: 0 // Hidden initially
          }}
        >
          <h2 style={{ color: '#f5f5f5', margin: 0 }}>Revealing Stories</h2>
          <p style={{ color: '#e6e6e6', marginTop: 'var(--spacing-sm)' }}>From the shadows, the truth takes form.</p>
        </div>

        {/* Photo 1 (Left) */}
        <div 
          ref={img1Ref} 
          style={{ 
            position: 'absolute', 
            top: '20%', 
            left: '2%', 
            width: '38vw', 
            height: '45vh',
            zIndex: 3
          }}
        >
          <Image src="/photos/REFUGEES_01.jpg" alt="Darkroom 1" fill sizes="38vw" style={{ objectFit: 'cover' }} />
        </div>

        {/* Photo 2 (Center-bottom) */}
        <div 
          ref={img2Ref} 
          style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '30%', 
            width: '40vw', 
            height: '50vh',
            zIndex: 4
          }}
        >
          <Image src="/photos/REFUGEES_02.jpg" alt="Darkroom 2" fill sizes="40vw" style={{ objectFit: 'cover' }} />
        </div>

        {/* Photo 3 (Right) */}
        <div 
          ref={img3Ref} 
          style={{ 
            position: 'absolute', 
            top: '5%', 
            right: '2%', 
            width: '33vw', 
            height: '55vh',
            zIndex: 5
          }}
        >
          <Image src="/photos/SRILANKA_01.jpg" alt="Darkroom 3" fill sizes="33vw" style={{ objectFit: 'cover' }} />
        </div>

      </div>
    </section>
  );
}
