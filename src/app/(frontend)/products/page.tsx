import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '../../../payload.config'

const getCachedProducts = unstable_cache(
  async () => {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    return await payload.find({ collection: 'product', limit: 100 })
  },
  ['products-list'],
  {
    revalidate: 300, // 5 minutes
    tags: ['products'],
  },
)

export default async function ProductsPage() {
  const products = await getCachedProducts()

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>

      {products.docs.length === 0 ? (
        <div className="text-center text-gray-500 py-8 bg-gray-50 rounded-lg">
          <p className="text-lg mb-2">No products available yet.</p>
          <p className="text-sm">
            Products will appear here once they are added to the admin panel.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.docs.map((product: any) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.title}</h3>
                <p className="text-2xl font-bold text-blue-600">₹ {product.price}</p>
              </div>

              {product.subscription && (
                <div className="mb-3">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                      product.subscription === 'monthly'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {product.subscription === 'monthly' ? 'Monthly' : 'Yearly'} Plan
                  </span>
                </div>
              )}

              {product.description && (
                <div className="mb-4">
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>
              )}

              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>ID: {product.id}</span>
                <span>Added: {new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
