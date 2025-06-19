import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'

interface BlogDetailPageProps {
  params: {
    id: string
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const resolvedParams = await params

  const blog = await payload.findByID({
    collection: 'blogs',
    id: resolvedParams.id,
  })

  if (!blog) {
    notFound()
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/blog">
        <Button variant="outline" className="mb-4">
          ← Back to Blogs
        </Button>
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{blog.title}</h1>

        {blog.content && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-700">Content</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{blog.content}</p>
            </div>
          </div>
        )}

        {blog.author && (
          <p className="text-gray-600 mb-2 mt-6">
            <span className="font-semibold">Author:</span> {blog.author}
          </p>
        )}

        {blog['publish date'] && (
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Published:</span>{' '}
            {new Date(blog['publish date']).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  )
}
