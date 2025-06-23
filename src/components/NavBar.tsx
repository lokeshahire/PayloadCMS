'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NavBar() {
  return (
    <nav className="mt-4">
      <ul className="flex justify-center space-x-6 items-center">
        <li>
          <Link href="/blogs" className="text-green-600 hover:text-green-800 font-medium">
            Blogs
          </Link>
        </li>
        <li>
          <Link href="/admin" className="text-green-600 hover:text-green-800 font-medium">
            Admin
          </Link>
        </li>
        <li>
          <Link href="/todos" className="text-green-600 hover:text-green-800 font-medium">
            Todos
          </Link>
        </li>
        <li>
          <Link href="/posts" className="text-green-600 hover:text-green-800 font-medium">
            Posts
          </Link>
        </li>
        <li>
          <Link href="/extra" className="text-green-600 hover:text-green-800 font-medium">
            Extra
          </Link>
        </li>
        <li>
          <Link href="/queries" className="text-green-600 hover:text-green-800 font-medium">
            Queries
          </Link>
        </li>
      </ul>
    </nav>
  )
}
