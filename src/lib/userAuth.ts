export interface User {
  id: string
  email: string
  role: string
}

export function getUser(): User | null {
  if (typeof window === 'undefined') return null

  try {
    const userStr = localStorage.getItem('user')
    if (!userStr) return null

    const user = JSON.parse(userStr)
    return user
  } catch (error) {
    console.error('Error parsing user from localStorage:', error)
    return null
  }
}

export function setUser(user: User): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem('user', JSON.stringify(user))
  } catch (error) {
    console.error('Error saving user to localStorage:', error)
  }
}

export function removeUser(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem('user')
  } catch (error) {
    console.error('Error removing user from localStorage:', error)
  }
}

export function isAdmin(): boolean {
  const user = getUser()
  return user ? ['super-admin', 'admin'].includes(user.role) : false
}

export function isAuthenticated(): boolean {
  return getUser() !== null
}
