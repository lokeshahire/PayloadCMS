'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getUser } from '@/lib/userAuth'

interface BlogEditPageProps {
  params: Promise<{ id: string }>
}

export default function EditBlogPage({ params }: BlogEditPageProps) {
  const router = useRouter()
  const resolvedParams = React.use(params)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${resolvedParams.id}`)
        if (response.ok) {
          const blog = await response.json()
          setTitle(blog.title || '')
          setContent(blog.content || '')
        } else {
          alert('Failed to load blog')
          router.push('/blog')
        }
      } catch (error) {
        console.error('Error fetching blog:', error)
        alert('Error loading blog')
        router.push('/blog')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlog()
  }, [resolvedParams.id, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const user = getUser()
      if (!user || !['super-admin', 'admin'].includes(user.role)) {
        alert('You need admin privileges to edit blogs')
        return
      }

      const response = await fetch(`/api/blogs/${resolvedParams.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          user,
        }),
      })

      if (response.ok) {
        router.push(`/blog/${resolvedParams.id}`)
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to update blog')
      }
    } catch (error) {
      console.error('Error updating blog:', error)
      alert('Error updating blog')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link href={`/blog/${resolvedParams.id}`}>
        <Button variant="outline" className="mb-4">
          ← Back to Blog
        </Button>
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog content"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
              {isSubmitting ? 'Updating...' : 'Update Blog'}
            </Button>
            <Link href={`/blog/${resolvedParams.id}`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
