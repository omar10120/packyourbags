import { Suspense } from 'react'
import TripsClient from './TripsClient'

export default function TripsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TripsClient />
    </Suspense>
  )
}