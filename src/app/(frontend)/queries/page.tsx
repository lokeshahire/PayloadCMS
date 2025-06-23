import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '../../../payload.config'
import QueriesForm from './QueriesForm'

const getCachedQueries = unstable_cache(
  async () => {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    return await payload.find({ collection: 'user-queries', sort: '-createdAt', limit: 100 })
  },
  ['queries-list'],
  {
    revalidate: 300, // 5 minutes
    tags: ['queries'],
  },
)

export default async function QueriesPage() {
  const queries = await getCachedQueries()

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">User Queries</h1>
      </div>

      {/* Contact Form - Client Component */}
      <QueriesForm />

      {/* Queries List - Server Rendered */}
      <div>
        <h2 className="text-xl font-semibold mb-4">All Queries</h2>

        {queries.docs.length === 0 ? (
          <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
            <p className="text-lg mb-2">No queries submitted yet.</p>
            <p className="text-sm">Click &quot;Submit New Query&quot; above to get started!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {queries.docs.map((query: any) => (
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
