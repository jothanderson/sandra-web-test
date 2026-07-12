import { groq } from 'next-sanity';

export const getStoriesQuery = groq`
  *[_type == "story"] | order(year asc) {
    _id,
    "slug": slug.current,
    title,
    subtitle,
    locationName,
    coordinates,
    year,
    theme,
    storyArc,
    heroImage {
      ...,
      asset->{
        ...,
        metadata
      }
    }
  }
`;

export const getStoryBySlugQuery = groq`
  *[_type == "story" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    title,
    subtitle,
    locationName,
    coordinates,
    year,
    theme,
    storyArc,
    heroImage {
      ...,
      asset->{
        ...,
        metadata
      }
    },
    editorialGallery[] {
      ...,
      asset->{
        ...,
        metadata
      }
    },
    bodyContentEs,
    bodyContentFr,
    bodyContentEn
  }
`;

export const getSiteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    seoTitle,
    seoDescription,
    ogImage {
      asset->{
        url
      }
    },
    socialLinks
  }
`;
