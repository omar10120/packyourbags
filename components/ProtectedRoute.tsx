'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { checkAuth } = useAuth()

  useEffect(() => {
    if (!checkAuth()) {
      router.push('/auth/login')
    }
  }, [])

  return <>{children}</>
}