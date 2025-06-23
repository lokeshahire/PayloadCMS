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
    {
      name: 'join',
      type: 'join',
      hasMany: true,
      on: 'paper',
      collection: 'questions',
    },
  ],
}

export default Paper
