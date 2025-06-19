'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/components/AuthProvider'
import { getUser } from '@/lib/userAuth'

interface BlogActionsProps {
  blogId: string
}

export default function BlogActions({ blogId }: BlogActionsProps) {
  const router = useRouter()
  const { isAdminUser } = useAuth()
  const [isDeleting, setIsDeleting] = useState(false)

  // Don't render actions if user is not admin
  if (!isAdminUser) {
    return null
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return
    }

    setIsDeleting(true)

    try {
      const user = getUser()
      if (!user || !['super-admin', 'admin'].includes(user.role)) {
        alert('You need admin privileges to delete blogs')
        return
      }

      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user, // Send user data from localStorage
        }),
      })

      if (response.ok) {
        router.refresh()
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to delete blog')
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      alert('Error deleting blog')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Link href={`/blog/${blogId}/edit`}>
        <Button
          size="sm"
          variant="outline"
          className="text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          Edit
        </Button>
      </Link>
      <Button
        size="sm"
        variant="outline"
        className="text-red-600 border-red-600 hover:bg-red-50"
        onClick={handleDelete}
        disabled={isDeleting}
      >
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </>
  )
}
