'use client'

import React from 'react'
import { useAuth } from '@/components/AuthProvider'
import BlogActions from '../BlogActions'

interface Blog {
  id: string
  title: string
  content?: string | null
  author?: string | null
  'publish date'?: string | null
  createdAt: string
  updatedAt: string
}

interface BlogDetailProps {
  blog: Blog
  blogId: string
}

export default function BlogDetail({ blog, blogId }: BlogDetailProps) {
  const { isAdminUser } = useAuth()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
        {isAdminUser && <BlogActions blogId={blogId} />}
      </div>

      {blog.content && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Content</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{blog.content}</p>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-2 text-sm text-gray-600">
        {blog.author && (
          <p>
            <span className="font-semibold">Author:</span> {blog.author}
          </p>
        )}

        <p suppressHydrationWarning>
          <span className="font-semibold">Created:</span> {formatDate(blog.createdAt)}
        </p>

        <p suppressHydrationWarning>
          <span className="font-semibold">Last Updated:</span> {formatDate(blog.updatedAt)}
        </p>
      </div>
    </div>
  )
}
