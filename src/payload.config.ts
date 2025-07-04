// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import Media from './collections/Media'
import Posts from './collections/Posts'
import { Todos } from './collections/Todos'
import Extra from './collections/Extra'
import { Blogs } from './collections/Blog'
import { Product } from './collections/Product'
import ProdSlug from './collections/ProdSlug'
import Paper from './collections/Paper'
import Question from './collections/Question'
import { UserQueries } from './collections/UserQueries'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Posts,
    Todos,
    Extra,
    Blogs,
    Product,
    ProdSlug,
    Paper,
    Question,
    UserQueries,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
