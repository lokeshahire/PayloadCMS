import { CollectionConfig } from 'payload'
import { revalidateTag } from 'next/cache'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
  },
  defaultSort: '-updatedAt',
  access: {
    read: () => true,
    create: ({ req }) => {
      return req.user?.role === 'admin' || req.user?.role === 'super-admin'
    },
    update: ({ req }) => {
      return req.user?.role === 'admin' || req.user?.role === 'super-admin'
    },
    delete: ({ req }) => {
      return req.user?.role === 'admin' || req.user?.role === 'super-admin'
    },
  },
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        // Clear cache when blog is created or updated
        await revalidateTag('blogs')

        // If you have individual blog pages, you might want to clear those too
        // You can use the blog ID or slug if you have one
        if (doc.id) {
          await revalidateTag(`blog-${doc.id}`)
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        // Clear cache when blog is deleted
        await revalidateTag('blogs')

        // Clear individual blog cache if it exists
        if (doc.id) {
          await revalidateTag(`blog-${doc.id}`)
        }
      },
    ],
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
          ({ req }) => {
            return req.user?.email
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
      defaultValue: () => new Date().toISOString(),
    },
  ],
}
