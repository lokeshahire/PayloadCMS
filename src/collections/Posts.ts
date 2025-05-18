import { CollectionConfig } from 'payload'

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'textarea',
    },
    {
      name: 'featuredImage',
      label: 'Featured Image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export default Posts
