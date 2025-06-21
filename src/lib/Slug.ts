// import { formatSlug } from './utils'

export const slugField = ({
  category,
  size,
  title = 'title',
}: {
  category: string
  size: string
  title?: string
}) => {
  return [
    {
      type: 'ui',
      name: 'slug_ui',
      admin: {
        components: {
          Field: {
            path: 'src/hooks/CustomSlugField',
            serverProps: {
              path: title,
              category: category,
            },
          },
        },
        width: size,
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: false,
      admin: {
        hidden: true,
        readOnly: true,
        width: size,
      },
      hooks: {
        // beforeValidate: [formatSlug(title)],
      },
    },
  ]
}
