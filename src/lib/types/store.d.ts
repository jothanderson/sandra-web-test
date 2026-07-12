import { StoryArc } from './index';

export interface AppStoreState {
  activeFrameIndex: number;
  activeStoryArc: StoryArc | null;
  isMapFocused: boolean;
  scrollProgress: number;
  
  // Actions
  setActiveFrameIndex: (index: number) => void;
  setActiveStoryArc: (arc: StoryArc | null) => void;
  setIsMapFocused: (focused: boolean) => void;
  setScrollProgress: (progress: number) => void;
}
