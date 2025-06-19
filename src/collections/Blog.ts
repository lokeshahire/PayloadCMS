import { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
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
      name: 'author',
      type: 'text',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          ({ req, value }) => {
            // If there's already a value, keep it
            if (value) {
              return value
            }
            // Otherwise, set to current user's email
            if (req.user && req.user.email) {
              return req.user.email
            }
            return undefined
          },
        ],
      },
    },
    {
      name: 'publish date',
      type: 'date',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          () => {
            return new Date().toISOString().split('T')[0]
          },
        ],
      },
    },
  ],
}
