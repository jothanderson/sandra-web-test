'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Frame1_Question from '../../components/frames/Frame1';
import Frame2_HumanStories from '../../components/frames/Frame2';
import Frame3_BeingThere from '../../components/frames/Frame3';
import Frame4_MapOfStories from '../../components/frames/Frame4';
import Frame5_Darkroom from '../../components/frames/Frame5';
import Frame6_EveryPhotoIsAStory from '../../components/frames/Frame6';
import Frame7_LivingStoriesNetwork from '../../components/frames/Frame7';
import Frame8_WhoFollowsTheThread from '../../components/frames/Frame8';
import Frame9_TheRevelation from '../../components/frames/Frame9';

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Dark to light global progression
    // The background should animate from dark to light as we pass Frame 5
    ScrollTrigger.create({
      trigger: '.frame-5-trigger',
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onEnter: () => {
        gsap.to('body', {
          '--bg-color': '#f5f5f5',
          '--text-color': '#111111',
          duration: 1,
        });
      },
      onLeaveBack: () => {
        gsap.to('body', {
          '--bg-color': '#111111',
          '--text-color': '#f5f5f5',
          duration: 1,
        });
      }
    });
  }, { scope: container });

  return (
    <main ref={container} style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Frame1_Question />
      <Frame2_HumanStories />
      <Frame3_BeingThere />
      <Frame4_MapOfStories />
      
      <div className="frame-5-trigger">
        <Frame5_Darkroom />
      </div>

      <Frame6_EveryPhotoIsAStory />
      <Frame7_LivingStoriesNetwork />
      <Frame8_WhoFollowsTheThread />
      <Frame9_TheRevelation />
    </main>
  );
}
