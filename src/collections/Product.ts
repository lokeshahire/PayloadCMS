import { slugField } from '@/lib/Slug'
import { type CollectionConfig, type Field } from 'payload'

export const Product: CollectionConfig = {
  slug: 'product',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'createdAt'],
  },
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
      admin: {
        description: 'Product title or name',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      admin: {
        description: 'Product price in dollars',
      },
    },
    ...(slugField({
      category: 'Product',
      size: '50%',
    }) as Field[]),
    {
      name: 'subscription',
      type: 'select',
      options: [
        {
          label: 'Monthly',
          value: 'monthly',
        },
        {
          label: 'Yearly',
          value: 'yearly',
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        condition: (data) => data?.subscription === 'yearly',
      },
    },
  ],
}
