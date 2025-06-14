import { getPayload } from 'payload'
import React from 'react'
import config from '@/payload.config'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function TodoPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const todos = await payload.find({ collection: 'todos', limit: 100 })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4  text-red-600 text-center">All Todos List</h1>

      <Link href="/add-todo">
        <Button className="text-center mx-0">Add Todos</Button>
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
