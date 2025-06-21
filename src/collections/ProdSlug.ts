import { slugField } from '@/lib/Slug'
import { Field } from 'payload'
import { CollectionConfig } from 'payload'

const ProdSlug: CollectionConfig = {
  slug: 'prodslug',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        ...(slugField({
          category: 'ProdSlug',
          size: '50%',
          title: 'title',
        }) as Field[]),
      ],
    },
  ],
}

export default ProdSlug
