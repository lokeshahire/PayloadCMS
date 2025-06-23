import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'

async function getPaper(id: string) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    // Get the paper
    const paper = await payload.findByID({
      collection: 'papers',
      id,
    })

    // Get questions related to this paper
    const questions = await payload.find({
      collection: 'questions',
      where: {
        paper: {
          equals: id,
        },
      },
    })

    return {
      ...paper,
      questions: questions.docs,
    }
  } catch (error) {
    console.error('Error fetching paper:', error)
    return null
  }
}

export default async function PaperPage({ params }: { params: { id: string } }) {
  const paper = await getPaper(params.id)

  if (!paper) {
    notFound()
  }

  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href="/papers" className="text-blue-600 hover:text-blue-800">
          ← Back to Papers
        </Link>
      </div>

      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{paper.title}</h1>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Questions</h2>
          {paper.questions && paper.questions.length > 0 ? (
            <div className="space-y-3">
              {paper.questions.map((question: any, index: number) => (
                <div key={question.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-medium">
                    Question {index + 1}: {question.title}
                  </h3>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No questions have been added to this paper yet.</p>
            </div>
          )}
        </section>
      </article>
    </main>
  )
}
