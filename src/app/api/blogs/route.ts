import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const body = await request.json()
    const { title, content, user } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Check if user data is provided and has admin role
    if (!user || !['super-admin', 'admin'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const blog = await payload.create({
      collection: 'blogs',
      data: {
        title,
        content,
        author: user.email, // Set author to current user's email
      },
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
