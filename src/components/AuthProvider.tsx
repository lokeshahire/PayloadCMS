'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, getUser, setUser, removeUser, isAdmin } from '@/lib/userAuth'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isAdminUser: boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdminUser, setIsAdminUser] = useState(false)

  useEffect(() => {
    // Check for existing user in localStorage on mount
    const existingUser = getUser()
    if (existingUser) {
      setUserState(existingUser)
      setIsAuthenticated(true)
      setIsAdminUser(isAdmin())
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    setUserState(userData)
    setIsAuthenticated(true)
    setIsAdminUser(['super-admin', 'admin'].includes(userData.role))
  }

  const logout = () => {
    removeUser()
    setUserState(null)
    setIsAuthenticated(false)
    setIsAdminUser(false)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isAdminUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
