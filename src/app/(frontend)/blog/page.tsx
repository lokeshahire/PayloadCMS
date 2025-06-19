import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function BlogPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const blogs = await payload.find({ collection: 'blogs', limit: 100 })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4  text-red-600 text-center">All Blogs</h1>

      {/* <Link href="/add-blog">
        <Button className="text-center mx-0">Add Blogs</Button>
      </Link> */}

      {blogs?.docs?.length > 0 ? (
        blogs.docs.map((blog: any) => (
          <div key={blog.id} className="mb-4 border p-4 rounded shadow w-1/2 mx-auto">
            <Link
              href={`/blog/${blog.id}`}
              className="block hover:bg-gray-50 transition-colors duration-200"
            >
              <h2 className="text-xl font-bold text-blue-600 hover:text-blue-800 cursor-pointer">
                {blog.title}
              </h2>
            </Link>
          </div>
        ))
      ) : (
        <p>No Blogs found.</p>
      )}
    </div>
  )
}
