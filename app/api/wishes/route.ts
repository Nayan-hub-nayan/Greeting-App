import { NextResponse } from 'next/server'

// This is a simple in-memory storage. In a real application, you'd use a database.
const wishes = new Map<string, { event: string; name: string; description: string }>()

export async function POST(request: Request) {
  const { event, name, description } = await request.json()
  const id = Math.random().toString(36).substr(2, 9)
  wishes.set(id, { event, name, description })
  return NextResponse.json({ id })
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  if (!id || !wishes.has(id)) {
    return NextResponse.json({ error: 'Wish not found' }, { status: 404 })
  }
  return NextResponse.json(wishes.get(id))
}

