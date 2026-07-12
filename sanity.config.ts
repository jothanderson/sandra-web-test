import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { projectId, dataset } from './sanity/env';
import story from './sanity/schemas/documents/story';
import siteSettings from './sanity/schemas/documents/siteSettings';
import localizedString from './sanity/schemas/objects/localizedString';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Sandra Jabalera',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: [story, siteSettings, localizedString],
  },
});
