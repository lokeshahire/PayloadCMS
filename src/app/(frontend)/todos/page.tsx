import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'

export default async function TodoPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const todos = await payload.find({ collection: 'todos', limit: 100 })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Todos</h1>

      {todos?.docs?.length > 0 ? (
        todos.docs.map((todo: any) => (
          <div key={todo.id} className="mb-4 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{todo.title}</h2>
            <p>{todo.description}</p>
          </div>
        ))
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  )
}
