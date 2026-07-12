import { LocalizedString, Coordinates, StoryArc, Theme } from './index';

export interface SanityImageMetadata {
  lqip: string;
  dimensions: {
    width: number;
    height: number;
    aspectRatio: number;
  };
}

export interface SanityImage {
  _type: 'image';
  asset: {
    url: string;
    metadata: SanityImageMetadata;
  };
  alt?: LocalizedString;
  caption?: LocalizedString;
}

export interface Story {
  _id: string;
  slug: string;
  title: LocalizedString;
  subtitle?: LocalizedString;
  locationName?: string;
  coordinates?: Coordinates;
  year?: number;
  theme?: Theme;
  storyArc: StoryArc;
  heroImage?: SanityImage;
  editorialGallery?: SanityImage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyContentEs?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyContentFr?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyContentEn?: any[];
}

export interface SiteSettings {
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
  ogImage?: {
    asset: {
      url: string;
    };
  };
  socialLinks?: string[];
}
