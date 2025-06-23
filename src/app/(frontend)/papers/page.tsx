import React from 'react'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'

const getPapers = unstable_cache(
  async () => {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Get all papers
    const papers = await payload.find({ collection: 'papers', limit: 100 })

    // Get questions for each paper
    const papersWithQuestions = await Promise.all(
      papers.docs.map(async (paper: any) => {
        const questions = await payload.find({
          collection: 'questions',
          where: {
            paper: {
              equals: paper.id,
            },
          },
        })

        return {
          ...paper,
          questions: questions.docs,
        }
      }),
    )

    return {
      ...papers,
      docs: papersWithQuestions,
    }
  },
  ['papers-list'],
  {
    revalidate: 300, // 5 minutes
    tags: ['papers'],
  },
)

export default async function PapersPage() {
  const papers = await getPapers()

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Papers</h1>
      <div className="grid gap-6">
        {papers.docs.map((paper: any) => (
          <div key={paper.id} className="border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">
              <Link href={`/papers/${paper.id}`} className="hover:text-blue-600">
                {paper.title}
              </Link>
            </h2>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Questions:</h3>
              {Array.isArray(paper.questions) && paper.questions.length > 0 ? (
                <ul className="list-disc pl-4 space-y-1">
                  {paper.questions.map((question: any) => (
                    <li key={question.id} className="text-sm text-gray-700">
                      {question.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No questions yet</p>
              )}
            </div>
          </div>
        ))}
      </div>
      {papers.docs.length === 0 && <p className="text-center text-gray-500">No papers found.</p>}
    </main>
  )
}
