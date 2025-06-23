import { CollectionConfig } from 'payload'

const Question: CollectionConfig = {
  slug: 'questions',
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
      name: 'paper',
      label: 'Related Paper',
      type: 'relationship',
      relationTo: 'papers',
      required: true,
    },
  ],
}

export default Question
