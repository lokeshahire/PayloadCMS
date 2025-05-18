import { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
  },
  admin: {
    useAsTitle: 'filename',
  },
  fields: [],
}

export default Media
