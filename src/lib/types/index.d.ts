export type Locale = 'es' | 'fr' | 'en';
export type StoryArc = 'despair' | 'survival' | 'resistance' | 'dignity' | 'hope' | 'reflection';
export type Theme = 'women' | 'migration' | 'humanRights' | 'childhood' | 'health' | 'socialJustice';

export interface LocalizedString {
  es: string;
  fr?: string;
  en?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
