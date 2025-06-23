import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '../../../payload.config'

export async function POST(request: NextRequest) {
  try {
    // Check if request has a body
    if (!request.body) {
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 })
    }

    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
    }

    const { email, problem, description } = body

    if (!email || !problem || !description) {
      return NextResponse.json(
        { error: 'Email, problem, and description are required' },
        { status: 400 },
      )
    }

    const payload = await getPayload({ config })

    const userQuery = await payload.create({
      collection: 'user-queries',
      data: {
        email,
        problem,
        description,
      },
    })

    return NextResponse.json(userQuery, { status: 201 })
  } catch (error) {
    console.error('Error creating user query:', error)
    return NextResponse.json({ error: 'Failed to create user query' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const userQueries = await payload.find({
      collection: 'user-queries',
      sort: '-createdAt',
    })

    return NextResponse.json(userQueries)
  } catch (error) {
    console.error('Error fetching user queries:', error)
    return NextResponse.json({ error: 'Failed to fetch user queries' }, { status: 500 })
  }
}
