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
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end: '+=250%', // Much longer scroll distance
        pin: true,
        scrub: 1, // Slower smoothing
      }
    });

    // 1. Slow gradual reveal of Sandra
    tl.fromTo(sandraImage.current, 
      { filter: 'blur(30px)', opacity: 0, scale: 1.15, yPercent: 10 },
      { 
        filter: 'blur(0px)', 
        opacity: 1, 
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
      <RedThread d="M 50 0 L 50 5 Q 50 10 45 10 L 30 10 Q 25 10 25 15 L 25 80 Q 25 85 30 85 L 85 85 Q 90 85 90 90 L 90 100" strokeWidth={1} color="var(--color-red)" timeline={timeline} style={{ zIndex: 3 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center', width: '100%' }}>
        <div ref={textCol} style={{ flex: 1, opacity: 0 }}>
          <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Who follows the thread?</h2>
          <p>
            Sandra Jabalera is a listener, an observer, and a connector of stories. 
            Through her lens, she captures not just images, but the invisible red thread 
            that ties human dignity, resistance, and hope together across the world.
          </p>
        </div>
        <div style={{ flex: 1, position: 'relative', height: '80vh', overflow: 'hidden' }}>
          <div ref={sandraImage} style={{ position: 'absolute', inset: 0 }}>
            <Image 
              src="/photos/PARIS_01.jpg" 
              alt="Connection - Paris" 
              fill 
              sizes="50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
