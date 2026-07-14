'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import RedThread from '../RedThread';

export default function Frame5_Darkroom() {
  const container = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px) and (min-height: 600px)",
      isMobile: "(max-width: 767px), (max-height: 599px)"
    }, (context) => {
      const { isDesktop } = context.conditions as { isDesktop: boolean };

      if (isDesktop) {
        // Desktop: Pinned sequence reveal
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            end: '+=400%', // Pinned duration
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
        .to({}, { duration: 0.5 });

        setTimeline(tl);
      } else {
        // Mobile: Individual scroll-triggered reveals as images enter the viewport
        const elements = [img1Ref, img2Ref, img3Ref];
        elements.forEach((ref) => {
          if (!ref.current) return;
          gsap.fromTo(ref.current,
            { filter: 'grayscale(100%) brightness(10%)', opacity: 0.4, scale: 0.95 },
            {
              filter: 'grayscale(0%) brightness(100%)',
              opacity: 1,
              scale: 1,
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 85%',
                end: 'top 40%',
                scrub: true,
              }
            }
          );
        });

        // Reveal text
        gsap.fromTo(textRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top 90%',
              end: 'top 70%',
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
      className="frame5-section"
    >
      <RedThread d="M 95 0 L 95 5 Q 95 10 90 10 L 55 10 Q 50 10 50 15 L 50 65 Q 50 70 45 70 L 15 70 Q 10 70 10 75 L 10 100" strokeWidth={1} color="var(--color-red)" timeline={timeline} style={{ zIndex: 4 }} />

      <div className="frame5-content-wrapper">

        {/* Dedicated Editorial Text Zone (Top Center, no image overlap) */}
        <div 
          ref={textRef} 
          className="frame5-text"
        >
          <h2 style={{ color: '#f5f5f5', margin: 0 }}>Revealing Stories</h2>
          <p style={{ color: '#e6e6e6', marginTop: 'var(--spacing-sm)' }}>From the shadows, the truth takes form.</p>
        </div>

        {/* Photo 1 */}
        <div 
          ref={img1Ref} 
          className="frame5-img1"
        >
          <Image src="/photos/REFUGEES_01.jpg" alt="Darkroom 1" fill sizes="(max-width: 767px) 100vw, 38vw" style={{ objectFit: 'cover' }} />
        </div>

        {/* Photo 2 */}
        <div 
          ref={img2Ref} 
          className="frame5-img2"
        >
          <Image src="/photos/REFUGEES_02.jpg" alt="Darkroom 2" fill sizes="(max-width: 767px) 100vw, 40vw" style={{ objectFit: 'cover' }} />
        </div>

        {/* Photo 3 */}
        <div 
          ref={img3Ref} 
          className="frame5-img3"
        >
          <Image src="/photos/SRILANKA_01.jpg" alt="Darkroom 3" fill sizes="(max-width: 767px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
        </div>

      </div>
    </section>
  );
}
