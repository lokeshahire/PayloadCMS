import Image from 'next/image'
import lokeshimg from '../../../../media/Lokesh2.jpeg'

async function getPosts() {
  try {
    const res = await fetch('http://localhost:3000/api/posts')

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status}`)
    }

    const data = await res.json()
    // console.log('Fetched posts:', data)

    return data?.docs || []
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>

      {posts.length > 0 ? (
        posts.map((post: any) => (
          <div key={post.id} className="mb-4 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
      <Image
        src={lokeshimg}
        alt="Lokesh"
        width={200}
        height={200}
        className="w-full h-auto mb-2 rounded"
      />
    </div>
  )
}
