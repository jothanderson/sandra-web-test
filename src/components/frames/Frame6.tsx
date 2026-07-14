'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import RedThread from '../RedThread';

export default function Frame6_EveryPhotoIsAStory() {
  const container = useRef<HTMLDivElement>(null);
  const leftCol = useRef<HTMLDivElement>(null);
  const rightCol = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const img1 = useRef<HTMLDivElement>(null);
  const img2 = useRef<HTMLDivElement>(null);
  const img3 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Entrance animations for titles and images (runs on both desktop & mobile)
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

    mm.add("(min-width: 768px)", () => {
      // Desktop: Grid parallax moving columns at different speeds
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
    });
  }, { scope: container });

  return (
    <section 
      ref={container}
      className="frame6-section"
    >
      <RedThread d="M 10 0 L 10 70 Q 10 75 15 75 L 45 75 Q 50 75 50 80 L 50 100" strokeWidth={1} color="var(--color-red)" style={{ zIndex: 3 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h2 ref={titleRef} style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          Every photo is a story
        </h2>

        <div className="frame6-grid">
          <div ref={leftCol} className="frame6-left-col">
            <div ref={img1} className="frame6-img1">
              <Image 
                src="/photos/WASH_01.jpg" 
                alt="Resistance" 
                fill 
                sizes="(max-width: 767px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div ref={img2} className="frame6-img2">
              <Image 
                src="/photos/WASH_02.jpg" 
                alt="Resistance detail" 
                fill 
                sizes="(max-width: 767px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          
          <div ref={rightCol} className="frame6-right-col">
            <div ref={img3} className="frame6-img3">
              <Image 
                src="/photos/WOMEN_01.jpg" 
                alt="Women's stories" 
                fill 
                sizes="(max-width: 767px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
