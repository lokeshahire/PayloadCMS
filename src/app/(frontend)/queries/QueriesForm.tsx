'use client'

import { useState, useEffect } from 'react'

export default function QueriesForm() {
  // Form states
  const [email, setEmail] = useState('')
  const [problem, setProblem] = useState('')
  const [description, setDescription] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Simulate getting user email (in a real app, this would come from authentication)
  useEffect(() => {
    setEmail('lokesh@gmail.com')
  }, [])

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

  return (
    <>
      <div className="flex justify-between items-center mb-8">
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
    </>
  )
}
