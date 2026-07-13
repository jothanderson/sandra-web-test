'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import RedThread from '../RedThread';

export default function Frame3_BeingThere() {
  const container = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    // Pinned observer section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: true,
      }
    });

    // Fade up and scale text while pinned
    tl.fromTo(textRef.current, 
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
    )
    .to(textRef.current, { y: -50, opacity: 0, scale: 1.05, duration: 1, ease: 'power2.in' }, '+=1');

    setTimeline(tl);
  }, { scope: container });

  return (
    <section 
      ref={container}
      style={{ 
        position: 'relative', 
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-color)',
        zIndex: 10
      }}
    >
      {/* Background Image Wrapper */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        <Image 
          src="/photos/INDIA_01.jpg" 
          alt="Being There - India" 
          fill 
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        {/* Dark Overlay for text readability */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)' }} />
      </div>

      <RedThread d="M 95 0 L 95 80 Q 95 85 90 85 L 20 85 Q 15 85 15 90 L 15 100" strokeWidth={1} color="var(--color-red)" timeline={timeline} style={{ zIndex: 3 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div ref={textRef} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', color: 'var(--color-white)' }}>
          <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Being There</h2>
          <p style={{ margin: '0 auto' }}>
            It is not enough to document. To see the thread, you must be present.
            You must listen before you look.
          </p>
        </div>
      </div>
    </section>
  );
}
