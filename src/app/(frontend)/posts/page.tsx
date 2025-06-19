import Image from 'next/image'
import lokeshimg from '../../../../media/Lokesh2.jpeg'

import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'

export default async function PostsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const posts = await payload.find({ collection: 'posts', limit: 100 })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-600">All Posts</h1>

      {posts?.docs?.length > 0 ? (
        posts.docs.map((post: any) => (
          <div key={post.id} className="mb-4 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            {/* {post.featuredImage && (
              <Image
                src={post.featuredImage.url}
                alt={post.title}
                width={200}
                height={200}
                className="w-full h-auto mb-2 rounded"
              />
            )} */}
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
      {/* <Image
        src={lokeshimg}
        alt="Lokesh"
        width={200}
        height={200}
        className="w-full h-auto mb-2 rounded"
      /> */}
    </div>
  )
}
