import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import Link from 'next/link'

export default async function TodoPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const todos = await payload.find({ collection: 'todos', limit: 100 })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4  text-red-600 text-center">All Todos</h1>
      <Link
        href="/add-todo"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mx-auto mb-4 block w-1/2 text-center"
      >
        Add Todo
      </Link>

      {todos?.docs?.length > 0 ? (
        todos.docs.map((todo: any) => (
          <div key={todo.id} className="mb-4 border p-4 rounded shadow w-1/2 mx-auto">
            <h2 className="text-xl font-bold">{todo.title}</h2>
            <p>{todo.description}</p>
          </div>
        ))
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  )
}
