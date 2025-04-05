'use client'

import { useState, useEffect, ReactElement } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import BookingModal from '@/components/BookingModal'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useSearchParams, useRouter } from 'next/navigation'

// Define CustomerFormData interface
interface CustomerFormData {
  name: string;
  email: string;
  phone: string;
}

interface PageParams {
  tripId: string;
}

interface BookingPageProps {
  params: Promise<PageParams>;
}

async function BookingPage({ 
  params 
}: BookingPageProps): Promise<ReactElement> {
  const { tripId } = await params
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const selectedSeats = searchParams.get('seats')?.split(',') || []

  // Mock trip data - will be replaced with API call
  const tripDetails = {
    id: tripId, // Fixed: using awaited tripId
    departureCity: 'New York',
    destinationCity: 'Los Angeles',
    departureTime: '2024-02-10T08:00:00',
    arrivalTime: '2024-02-10T16:00:00',
    price: 150
  }

  const handleBooking = async (customerData: CustomerFormData) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      const bookingRef = Math.random().toString(36).substring(2, 10).toUpperCase()
      router.push(`/bookings/${bookingRef}?success=true`)
    } catch (error) {
      console.error('Booking failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Booking</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
          <div className="space-y-2 text-gray-600">
            <p>From: {tripDetails.departureCity}</p>
            <p>To: {tripDetails.destinationCity}</p>
            <p>Departure: {new Date(tripDetails.departureTime).toLocaleString()}</p>
            <p>Arrival: {new Date(tripDetails.arrivalTime).toLocaleString()}</p>
            <p>Selected Seats: {selectedSeats.join(', ')}</p>
            <p className="text-lg font-semibold text-gray-900">
              Total Price: ${tripDetails.price * selectedSeats.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Passenger Information</h2>
          {/* Temporarily using div until CustomerForm component is created */}
          <div>Customer Form Component will go here</div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage