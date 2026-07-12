/* eslint-disable import/no-anonymous-default-export */
const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'seoTitle',
      title: 'SEO Title Default',
      type: 'localizedString',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description Default',
      type: 'localizedString',
    },
    {
      name: 'ogImage',
      title: 'Default Open Graph Image',
      type: 'image',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'url' }],
    },
  ],
};

export default siteSettings;
