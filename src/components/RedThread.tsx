'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RedThreadProps {
  d: string; // The SVG path string, based on a 0-100 coordinate system
  strokeWidth?: number;
  color?: string;
  style?: React.CSSProperties;
  width?: string;
  height?: string;
  timeline?: gsap.core.Timeline | null; // Optional GSAP timeline from the parent for pinning sync
}

export default function RedThread({ 
  d, 
  strokeWidth = 3.5, // Thicker default stroke width (ignored in favor of uniform 3.5px line)
  color = 'var(--color-red, #d32f2f)', 
  style,
  width = '100%',
  height = '100%',
  timeline
}: RedThreadProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Set initial state: completely clipped (hidden from bottom up to top)
    gsap.set(container, {
      clipPath: 'inset(0% 0% 100% 0%)'
    });

    if (timeline) {
      // MODE B: Synced directly to parent pinning timeline
      const totalDuration = timeline.duration();
      timeline.to(container, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        duration: totalDuration
      }, 0); // Add at the start of the timeline
    } else {
      // MODE A: For non-pinned sections, create a standard ScrollTrigger
      const section = container.closest('section');
      if (!section) return;

      gsap.to(container, {
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      });
    }
  }, { scope: containerRef, dependencies: [timeline] });

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'absolute', 
        inset: 0, 
        pointerEvents: 'none', 
        ...style 
      }}
    >
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* 
            SVG Filter creating a realistic, fibrous fabric thread texture.
            - feTurbulence: Generates fine fractal noise simulating cloth fibers.
            - feDisplacementMap: Slightly distorts the path edges to make it look organic and rough.
            - feDiffuseLighting: Bump-maps the texture with 3D light & shadow.
            - feDropShadow: Adds depth so it floats tactilely over the background photos.
          */}
          <filter id="thread-texture" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
            {/* Fine turbulence to simulate thread fibers */}
            <feTurbulence type="fractalNoise" baseFrequency="0.8 0.15" numOctaves="4" result="noise" />
            
            {/* Rough edges via displacement mapping */}
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            
            {/* Apply lighting to the noise to create a 3D woven texture (using a soft warm red to avoid white reflections) */}
            <feDiffuseLighting in="noise" lighting-color="#e0a0a0" surfaceScale="1.4" result="light">
              <feDistantLight azimuth="45" elevation="55" />
            </feDiffuseLighting>

            {/* Blend lighting with the DISPLACED path using overlay to preserve the rich red color and avoid white edges */}
            <feBlend mode="overlay" in="displaced" in2="light" result="lit-thread" />

            {/* Mask the lit-thread with the displaced shape so the noise ONLY shows inside the stroke! */}
            <feComposite operator="in" in="lit-thread" in2="displaced" result="textured-stroke" />

            {/* Subtle dark red shadow to float the thread and add a dark red background depth */}
            <feDropShadow in="textured-stroke" dx="1" dy="1.5" stdDeviation="1" floodOpacity="0.65" floodColor="#5c0a0a" />
          </filter>
        </defs>

        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={3.8} // Fixed thickness of 3.8px (independent of container dimensions)
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          filter="url(#thread-texture)"
        />
      </svg>
    </div>
  );
}
