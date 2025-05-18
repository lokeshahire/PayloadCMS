import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // Restrict who can create users
    create: ({ req }) => {
      const user = req.user
      return user?.role === 'super-admin' || user?.role === 'admin'
    },
    update: ({ req }) => {
      const user = req.user
      return user?.role === 'super-admin' || user?.role === 'admin'
    },
    delete: ({ req }) => {
      const user = req.user
      return user?.role === 'super-admin'
    },
    read: () => true, // Everyone can read users
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'viewer',
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'Administrator',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Support',
          value: 'support',
        },
        {
          label: 'Viewer',
          value: 'viewer',
        },
      ],
      admin: {
        position: 'sidebar',
      },
      access: {
        // Only super-admin or admin can change roles
        update: ({ req }) => req.user?.role === 'super-admin' || req.user?.role === 'admin',
      },
    },
  ],
}
