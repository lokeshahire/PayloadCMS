import './styles.css'
import Link from 'next/link'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-100 text-gray-900">
      <body className="min-h-screen flex flex-col">
        <header className="bg-white flex justify-between shadow-md py-6 px-4 md:px-8">
          <h1 className="text-3xl font-bold text-center text-blue-700">PiAcademy Courses</h1>
          <nav className="mt-4">
            <ul className="flex justify-center space-x-6">
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
            </ul>
          </nav>
        </header>
        <main className="flex-grow px-4 md:px-8 py-8">{children}</main>
      </body>
    </html>
  )
}
