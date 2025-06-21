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
      return user?.role === 'admin'
    },
    update: ({ req }) => {
      const user = req.user
      return user?.role === 'admin'
    },
    delete: ({ req }) => {
      const user = req.user
      return user?.role === 'admin'
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
          label: 'Admin',
          value: 'admin',
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
        // Only admin can change roles
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
}
