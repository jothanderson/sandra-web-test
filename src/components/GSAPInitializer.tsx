'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GSAPInitializer() {
  useEffect(() => {
    // Configure global ScrollTrigger defaults if necessary
    ScrollTrigger.config({ ignoreMobileResize: true });
    
    // Refresh ScrollTrigger on resize or layout changes
    ScrollTrigger.refresh();
  }, []);

  return null;
}
