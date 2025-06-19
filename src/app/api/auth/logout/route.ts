import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Since we're using localStorage, the client will handle clearing the data
    return NextResponse.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}
