'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { Button } from '@/components/ui/button'

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      logout()
    } catch (error) {
      console.error('Logout error:', error)
      logout() // Still logout locally even if API call fails
    }
  }

  return (
    <nav className="mt-4">
      <ul className="flex justify-center space-x-6 items-center">
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
          <Link href="/blog" className="text-green-600 hover:text-green-800 font-medium">
            Blog
          </Link>
        </li>

        {isAuthenticated ? (
          <>
            <li className="text-sm text-gray-600">
              Welcome, {user?.email} ({user?.role})
            </li>
            <li>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Login
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}
