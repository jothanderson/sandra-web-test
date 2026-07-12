'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Frame6_EveryPhotoIsAStory() {
  const container = useRef<HTMLDivElement>(null);
  const leftCol = useRef<HTMLDivElement>(null);
  const rightCol = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const img1 = useRef<HTMLDivElement>(null);
  const img2 = useRef<HTMLDivElement>(null);
  const img3 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Editorial transitions: Staggered reveal of text and grid items
    gsap.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      }
    });

    gsap.from([img1.current, img2.current, img3.current], {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: leftCol.current,
        start: 'top 70%',
      }
    });

    // Grid parallax moving columns at different speeds
    gsap.to(leftCol.current, {
      yPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    gsap.to(rightCol.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });
  }, { scope: container });

  return (
    <section 
      ref={container}
      style={{ 
        position: 'relative', 
        minHeight: '200vh',
        width: '100%',
        paddingTop: 'var(--spacing-xl)',
        paddingBottom: 'var(--spacing-xl)'
      }}
    >
      <div className="container">
        <h2 ref={titleRef} style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          Every photo is a story
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
          <div ref={leftCol} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
            <div ref={img1} style={{ position: 'relative', width: '100%', height: '60vh' }}>
              <Image 
                src="/photos/WASH_01.jpg" 
                alt="Resistance" 
                fill 
                sizes="50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div ref={img2} style={{ position: 'relative', width: '80%', height: '40vh', marginLeft: 'auto' }}>
              <Image 
                src="/photos/WASH_02.jpg" 
                alt="Resistance detail" 
                fill 
                sizes="50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          <div ref={rightCol} style={{ display: 'flex', alignItems: 'center' }}>
            <div ref={img3} style={{ position: 'relative', width: '90%', height: '70vh', marginTop: 'var(--spacing-xl)' }}>
              <Image 
                src="/photos/WOMEN_01.jpg" 
                alt="Women's stories" 
                fill 
                sizes="50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
