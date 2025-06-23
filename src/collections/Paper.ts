import { CollectionConfig } from 'payload'

const Paper: CollectionConfig = {
  slug: 'papers',
  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}

export default Paper
