import { create } from 'zustand';
import { AppStoreState } from '../types/store';

export const useAppStore = create<AppStoreState>((set) => ({
  activeFrameIndex: 0,
  activeStoryArc: null,
  isMapFocused: false,
  scrollProgress: 0,

  setActiveFrameIndex: (index) => set({ activeFrameIndex: index }),
  setActiveStoryArc: (arc) => set({ activeStoryArc: arc }),
  setIsMapFocused: (focused) => set({ isMapFocused: focused }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
