import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'

export async function getCurrentUser() {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const headersList = await headers()
    const user = await payload.auth({ headers: headersList })

    return user.user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export function hasAdminRole(user: any) {
  return user && ['super-admin', 'admin'].includes(user.role)
}
