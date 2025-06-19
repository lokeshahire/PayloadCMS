import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const resolvedParams = await params

    const blog = await payload.findByID({
      collection: 'blogs',
      id: resolvedParams.id,
    })

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error fetching blog:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const resolvedParams = await params

    const body = await request.json()
    const { title, content, user } = body

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Check if user data is provided and has admin role
    if (!user || !['super-admin', 'admin'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const blog = await payload.update({
      collection: 'blogs',
      id: resolvedParams.id,
      data: {
        title,
        content,
      },
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error('Error updating blog:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const resolvedParams = await params

    const body = await request.json()
    const { user } = body

    // Check if user data is provided and has admin role
    if (!user || !['super-admin', 'admin'].includes(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await payload.delete({
      collection: 'blogs',
      id: resolvedParams.id,
    })

    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
