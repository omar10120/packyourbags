'use client'
import { Suspense, useEffect, useState } from 'react'
import TripsClient from './TripsClient'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function TripsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/')
    } else {
      setIsLoading(false)
    }
  }, [isAuthenticated, router])

  if (isLoading || !isAuthenticated) {
    return null // or return a loading spinner if you prefer
  }

  return (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <TripsClient />
        </Suspense>
      </ProtectedRoute>
  )
}