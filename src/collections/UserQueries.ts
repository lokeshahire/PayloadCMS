import { CollectionConfig } from 'payload'

export const UserQueries: CollectionConfig = {
  slug: 'user-queries',
  admin: {
    useAsTitle: 'problem',
    defaultColumns: ['email', 'problem', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        readOnly: true,
        description: 'User email address (auto-filled)',
      },
    },
    {
      name: 'problem',
      type: 'text',
      required: true,
      admin: {
        description: 'Brief description of the problem or query',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Detailed description of the problem or query',
      },
    },
  ],
}
