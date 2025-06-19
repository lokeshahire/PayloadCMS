import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import BlogList from './BlogList'

export default async function BlogPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const blogs = await payload.find({
    collection: 'blogs',
    limit: 100,
    sort: '-updatedAt', // Sort by updatedAt in descending order (newest first)
  })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-600 text-center">All Blogs</h1>

      <BlogList blogs={blogs.docs} />
    </div>
  )
}
