import './styles.css'
import Link from 'next/link'
import { AuthProvider } from '@/components/AuthProvider'
import NavBar from '@/components/NavBar'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-gray-100 text-gray-900">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <header className="bg-white flex justify-between shadow-md py-6 px-4 md:px-8">
            <h1 className="text-3xl font-bold text-center text-blue-700">PiAcademy Courses</h1>
            <NavBar />
          </header>
          <main className="flex-grow px-4 md:px-8 py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
