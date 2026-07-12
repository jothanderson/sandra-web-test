'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Frame7_LivingStoriesNetwork() {
  const container = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // Cinematic camera aperture (polygonal iris) reveal
    // Start with a small, tightly closed hexagon
    const closedAperture = 'polygon(45% 40%, 55% 40%, 60% 50%, 55% 60%, 45% 60%, 40% 50%)';
    // End with a massive hexagon that fully clears the bounds of the image
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

    // Subtle floating parallax for the nodes to give a "living" feel
    circlesRef.current.forEach((el, index) => {
      gsap.to(el, {
        yPercent: index % 2 === 0 ? -10 : 15, // Alternate float direction
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

  const setCircleRef = (index: number) => (el: HTMLDivElement | null) => {
    circlesRef.current[index] = el;
  };

  return (
    <section 
      ref={container}
      style={{ 
        position: 'relative', 
        minHeight: '130vh', // Extended to allow plenty of breathing room
        width: '100%',
        backgroundColor: 'var(--color-white)',
        color: 'var(--color-black)',
        overflow: 'hidden',
        padding: 'var(--spacing-xl) 0'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          The Living Stories Network
        </h2>
      </div>

      {/* 
        Substantially larger nodes with greater separation.
        Using absolute positioning to mimic the curated, asymmetrical composition in the visual reference.
      */}
      <div style={{ position: 'relative', width: '100%', height: '110vh', maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* Left Node - Large */}
        <div 
          ref={setCircleRef(0)} 
          style={{ 
            position: 'absolute', 
            top: '10%', 
            left: '5%', 
            width: '35vw', 
            height: '35vw',
            borderRadius: '50%',
            overflow: 'hidden'
          }}
        >
          <Image src="/photos/SRILANKA_01.jpg" alt="Sri Lanka Story" fill sizes="35vw" style={{ objectFit: 'cover' }} />
        </div>

        <div 
          ref={setCircleRef(1)} 
          style={{ 
            position: 'absolute', 
            top: '55%', 
            left: '35%', 
            width: '25vw', 
            height: '25vw',
            borderRadius: '50%',
            overflow: 'hidden',
            zIndex: 3
          }}
        >
          <Image src="/photos/SRILANKA_02.jpg" alt="Sri Lanka Connection" fill sizes="25vw" style={{ objectFit: 'cover' }} />
        </div>

        {/* Right Node - Very Large */}
        <div 
          ref={setCircleRef(2)} 
          style={{ 
            position: 'absolute', 
            top: '0%', 
            right: '5%', 
            width: '40vw', 
            height: '40vw',
            borderRadius: '50%',
            overflow: 'hidden'
          }}
        >
          <Image src="/photos/SRILANKA_03.jpg" alt="Sri Lanka Network" fill sizes="40vw" style={{ objectFit: 'cover' }} />
        </div>

      </div>
    </section>
  );
}
