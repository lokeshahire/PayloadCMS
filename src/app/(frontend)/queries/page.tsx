'use client'

import { useState, useEffect } from 'react'

interface UserQuery {
  id: string
  email: string
  problem: string
  description: string
  createdAt: string
  updatedAt: string
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<UserQuery[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [apiStatus, setApiStatus] = useState<string>('')

  // Form states
  const [email, setEmail] = useState('')
  const [problem, setProblem] = useState('')
  const [description, setDescription] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    setEmail('lokesh@gmail.com')
  }, [])

  useEffect(() => {
    fetchQueries()
  }, [])

  const testAPI = async () => {
    try {
      const res = await fetch('/api/test')
      if (res.ok) {
        const data = await res.json()
        setApiStatus(`API Test: ${data.message}`)
      } else {
        setApiStatus('API Test: Failed')
      }
    } catch (err) {
      setApiStatus('API Test: Error')
    }
  }

  const fetchQueries = async () => {
    try {
      console.log('Fetching queries from /api/user-queries...')
      const res = await fetch('/api/user-queries')

      if (!res.ok) {
        const errorText = await res.text()
        console.error('API response error:', res.status, errorText)
        throw new Error(`HTTP ${res.status}: ${errorText}`)
      }

      const data = await res.json()
      console.log('API response:', data)
      setQueries(data.docs || [])
    } catch (err: any) {
      console.error('Fetch error:', err)
      setError(err.message || 'Failed to fetch queries')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)
    setFormError('')
    setFormSuccess(false)

    try {
      const formData = {
        email: email.trim(),
        problem: problem.trim(),
        description: description.trim(),
      }

      // Validate form data
      if (!formData.email || !formData.problem || !formData.description) {
        throw new Error('All fields are required')
      }

      const res = await fetch('/api/user-queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }))
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`)
      }

      const result = await res.json()
      console.log('Query submitted successfully:', result)

      setFormSuccess(true)
      setProblem('')
      setDescription('')
      setShowForm(false)

      // Refresh the queries list
      await fetchQueries()

      // Reset form after successful submission
      setTimeout(() => {
        setFormSuccess(false)
      }, 3000)
    } catch (err: any) {
      console.error('Form submission error:', err)
      setFormError(err.message || 'Failed to submit query')
    } finally {
      setFormLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">Loading queries...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h3 className="font-bold mb-2">Error Loading Queries</h3>
          <p>{error}</p>
          <div className="mt-4 space-x-2">
            <button
              onClick={() => {
                setError('')
                setLoading(true)
                fetchQueries()
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Try Again
            </button>
            <button
              onClick={testAPI}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Test API
            </button>
          </div>
          {apiStatus && <p className="mt-2 text-sm">{apiStatus}</p>}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Queries</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {showForm ? 'Hide Form' : 'Submit New Query'}
        </button>
      </div>

      {/* Success Message */}
      {formSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Your query has been submitted successfully! We&apos;ll get back to you soon.
        </div>
      )}

      {/* Contact Form */}
      {showForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Submit Your Query</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {formError}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full border border-gray-300 p-3 rounded-md bg-gray-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                readOnly
              />
              <p className="text-sm text-gray-500 mt-1">
                Your email address is pre-filled and cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Problem/Query Title *
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Brief description of your problem or query"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide a detailed description of your problem or query..."
                required
              />
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={formLoading}
              >
                {formLoading ? 'Submitting...' : 'Submit Query'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setFormError('')
                  setProblem('')
                  setDescription('')
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Queries List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Queries</h2>

        {queries.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
            <p className="text-lg mb-2">No queries submitted yet.</p>
            <p className="text-sm">Click &quot;Submit New Query&quot; above to get started!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {queries.map((query) => (
              <div
                key={query.id}
                className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{query.problem}</h3>
                    <p className="text-sm text-gray-600">From: {query.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Created: {query.createdAt}</p>
                    <p className="text-xs text-gray-500">Updated: {query.updatedAt}</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium text-gray-900 mb-2">Description:</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{query.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
