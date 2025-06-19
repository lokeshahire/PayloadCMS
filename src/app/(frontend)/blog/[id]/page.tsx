import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import BlogDetail from './BlogDetail'

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

      <BlogDetail blog={blog} blogId={resolvedParams.id} />
    </div>
  )
}
