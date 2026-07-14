'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import RedThread from '../RedThread';

export default function Frame7_LivingStoriesNetwork() {
  const container = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Cinematic camera aperture (polygonal iris) reveal - runs on both desktop and mobile
    const closedAperture = 'polygon(45% 40%, 55% 40%, 60% 50%, 55% 60%, 45% 60%, 40% 50%)';
    const openAperture = 'polygon(-20% -20%, 120% -20%, 150% 50%, 120% 120%, -20% 120%, -50% 50%)';

    gsap.fromTo(circlesRef.current,
      { 
        clipPath: closedAperture,
        opacity: 0.2, // Barely visible initially
        scale: 0.85
      },
      {
        clipPath: openAperture,
        opacity: 1,
        scale: 1,
        stagger: 0.2, // Staggered opening
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: true,
        }
      }
    );

    mm.add("(min-width: 768px)", () => {
      // Desktop-only scrolling parallax for circles
      circlesRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.to(el, {
          yPercent: index % 2 === 0 ? -10 : 15,
          ease: 'none',
          scrollTrigger: {
            trigger: container.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    });

    // Continuous breathing animation - runs on both desktop & mobile
    circlesRef.current.forEach((el, index) => {
      if (!el) return;
      gsap.to(el, {
        y: '+=20',
        duration: 2.5 + index * 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: index * 0.3
      });
    });

  }, { scope: container });

  const setCircleRef = (index: number) => (el: HTMLDivElement | null) => {
    circlesRef.current[index] = el;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { scale: 1.05, filter: 'brightness(1.1)', duration: 0.4, ease: 'power2.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { scale: 1, filter: 'brightness(1)', duration: 0.4, ease: 'power2.out' });
  };

  return (
    <section 
      ref={container}
      className="frame7-section"
    >
      <RedThread d="M 50 0 C 50 30, 45 50, 50 70 S 55 90, 50 100" strokeWidth={1} color="var(--color-red)" style={{ zIndex: 3 }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          The Living Stories Network
        </h2>
      </div>

      {/* 
        Nodes display responsively: absolute asymmetrical layout on desktop, stacked on mobile.
      */}
      <div className="frame7-nodes-container">
        
        {/* Left Node */}
        <div 
          ref={setCircleRef(0)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="frame7-node1"
        >
          <Image src="/photos/SRILANKA_01.jpg" alt="Sri Lanka Story" fill sizes="(max-width: 767px) 75vw, 35vw" style={{ objectFit: 'cover' }} />
        </div>

        {/* Center Node */}
        <div 
          ref={setCircleRef(1)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="frame7-node2"
        >
          <Image src="/photos/SRILANKA_02.jpg" alt="Sri Lanka Connection" fill sizes="(max-width: 767px) 75vw, 25vw" style={{ objectFit: 'cover' }} />
        </div>

        {/* Right Node */}
        <div 
          ref={setCircleRef(2)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="frame7-node3"
        >
          <Image src="/photos/SRILANKA_03.jpg" alt="Sri Lanka Network" fill sizes="(max-width: 767px) 75vw, 40vw" style={{ objectFit: 'cover' }} />
        </div>

      </div>
    </section>
  );
}
