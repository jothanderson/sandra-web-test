import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from '../../../sanity/env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if we want fresh data, or true if we want edge-cached data
});
