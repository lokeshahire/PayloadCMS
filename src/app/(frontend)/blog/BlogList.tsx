'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/AuthProvider'
import BlogActions from './BlogActions'

interface Blog {
  id: string
  title: string
  content?: string | null
  author?: string | null
  'publish date'?: string | null
  createdAt: string
  updatedAt: string
}

interface BlogListProps {
  blogs: Blog[]
}

export default function BlogList({ blogs }: BlogListProps) {
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
    <>
      {isAdminUser && (
        <div className="mb-6 text-center">
          <Link href="/blog/add-blog">
            <Button className="bg-green-600 hover:bg-green-700">Add New Blog</Button>
          </Link>
        </div>
      )}

      {blogs?.length > 0 ? (
        blogs.map((blog: Blog) => (
          <div key={blog.id} className="mb-4 border p-4 rounded shadow w-1/2 mx-auto">
            <Link
              href={`/blog/${blog.id}`}
              className="block hover:bg-gray-50 transition-colors duration-200"
            >
              <h2 className="text-xl font-bold text-blue-600 hover:text-blue-800 cursor-pointer">
                {blog.title}
              </h2>
            </Link>

            <div className="mt-2 text-sm text-gray-500 space-y-1">
              <p suppressHydrationWarning>Created: {formatDate(blog.createdAt)}</p>
              <p suppressHydrationWarning>Updated: {formatDate(blog.updatedAt)}</p>
            </div>

            <div className="mt-3 flex gap-2">
              <BlogActions blogId={blog.id} />
            </div>
          </div>
        ))
      ) : (
        <p>No Blogs found.</p>
      )}
    </>
  )
}
