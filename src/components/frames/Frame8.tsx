'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Frame8_WhoFollowsTheThread() {
  const container = useRef<HTMLDivElement>(null);
  const textCol = useRef<HTMLDivElement>(null);
  const sandraImage = useRef<HTMLDivElement>(null);

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
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center', width: '100%' }}>
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
