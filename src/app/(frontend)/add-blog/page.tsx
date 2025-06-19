// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function AddTodoPage() {
//   const router = useRouter()

//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')
//   const [author, setAuthor] = useState('')
//   const [publishDate, setPublishDate] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)
//     setError('')

//     try {
//       const res = await fetch('http://localhost:3000/api/blogs', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           title,
//           content,
//           author,
//           publishDate,
//         }),
//       })

//       if (!res.ok) {
//         throw new Error('Failed to create todo')
//       }

//       router.push('/blogs') // Redirect to todo list
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-8 text-center">Add New Blog</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {error && <p className="text-red-500">{error}</p>}

//         <div>
//           <label className="block text-sm font-medium">Title</label>
//           <input
//             type="text"
//             className="w-full border p-2 rounded"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">Content</label>
//           <textarea
//             className="w-full border p-2 rounded"
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded w-full mx-auto"
//           disabled={loading}
//         >
//           {loading ? 'Adding...' : 'Add Blog'}
//         </button>
//       </form>
//     </div>
//   )
// }
