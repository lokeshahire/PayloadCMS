import { slugField } from '@/lib/Slug'
import { type CollectionConfig, type Field } from 'payload'

const Product: CollectionConfig = {
  slug: 'product',
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

export default Product
