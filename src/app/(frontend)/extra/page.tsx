'use client'

import { useState, useEffect } from 'react'

interface Extra {
  id: string
  title: string
  notes?: string
  category?: string
}

export default function ExtrasPage() {
  const [items, setItems] = useState<Extra[]>([])
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [category, setCategory] = useState('personal')
  const [error, setError] = useState<string | null>(null)

  // Fetch existing items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/extra')
        if (!response.ok) {
          throw new Error('Failed to fetch items')
        }
        const data = await response.json()
        if (data && Array.isArray(data.docs)) {
          setItems(data.docs)
        } else {
          setItems([])
          setError('No items found or invalid response')
        }
      } catch (err) {
        console.error(err)
        setError('Error fetching items')
        setItems([])
      }
    }
    fetchItems()
  }, [])

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/extra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, notes, category }),
      })
      if (!response.ok) {
        throw new Error('Failed to create item')
      }
      const newItem = await response.json()
      setItems([...items, newItem])
      setTitle('')
      setNotes('')
      setCategory('personal')
    } catch (err) {
      console.error(err)
      setError('Error creating item')
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Extras</h1>

      {/* Display error if any */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Form to create new entry */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Item
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Items</h2>
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className="border p-4 mb-2">
              <h3 className="font-bold">{item.title}</h3>
              <p>Notes: {item.notes || 'N/A'}</p>
              <p>Category: {item.category || 'N/A'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
