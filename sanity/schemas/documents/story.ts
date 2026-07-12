/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
const story = {
  name: 'story',
  title: 'Story',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'localizedString',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localizedString',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title.es',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'locationName',
      title: 'Location Name',
      type: 'string',
    },
    {
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Women', value: 'women' },
          { title: 'Migration', value: 'migration' },
          { title: 'Human Rights', value: 'humanRights' },
          { title: 'Childhood', value: 'childhood' },
          { title: 'Health', value: 'health' },
          { title: 'Social Justice', value: 'socialJustice' },
        ],
      },
    },
    {
      name: 'storyArc',
      title: 'Story Arc (Emotion)',
      type: 'string',
      options: {
        list: [
          { title: 'Despair', value: 'despair' },
          { title: 'Survival', value: 'survival' },
          { title: 'Resistance', value: 'resistance' },
          { title: 'Dignity', value: 'dignity' },
          { title: 'Hope', value: 'hope' },
          { title: 'Reflection', value: 'reflection' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'localizedString',
        },
      ],
    },
    {
      name: 'editorialGallery',
      title: 'Editorial Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', title: 'Alt Text', type: 'localizedString' },
            { name: 'caption', title: 'Caption', type: 'localizedString' },
          ]
        }
      ]
    },
    {
      name: 'bodyContentEs',
      title: 'Body Content (ES)',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'bodyContentFr',
      title: 'Body Content (FR)',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'bodyContentEn',
      title: 'Body Content (EN)',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'locationName',
      media: 'heroImage',
    },
  },
};

export default story;
