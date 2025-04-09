'use client'

import { useState, useEffect, ReactElement } from 'react'
import { useRouter } from 'next/navigation'
import Seat from '@/components/Seat'

interface PageParams {
  tripId: string;
}

interface SeatsPageProps {
  params: PageParams;  // Remove Promise
}

export default function SeatsPage({ 
  params 
}: SeatsPageProps): ReactElement {
  const { tripId } = params  // Remove await
  const router = useRouter()
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  
  // Mock seat data - will be replaced with API call
  const seats = Array.from({ length: 40 }, (_, i) => ({
    number: (i + 1).toString(),
    isBooked: Math.random() > 0.7
  }))

  const handleSeatSelect = (seatNumber: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatNumber)
        ? prev.filter(num => num !== seatNumber)
        : [...prev, seatNumber]
    )
  }

  const handleContinue = async () => {
    if (selectedSeats.length > 0) {
      const { tripId } = await params
      router.push(`/trips/${tripId}/booking?seats=${selectedSeats.join(',')}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 text-black">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Select Your Seats</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8 mb-4">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-white border border-gray-300 rounded mr-2"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-500 rounded mr-2"></div>
                <span>Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-300 rounded mr-2"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-8">
            {seats.map((seat) => (
              <Seat
                key={seat.number}
                number={seat.number}
                isBooked={seat.isBooked}
                isSelected={selectedSeats.includes(seat.number)}
                onSelect={handleSeatSelect}
              />
            ))}
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-600">Selected Seats: {selectedSeats.join(', ')}</p>
                <p className="text-gray-600">Total Price: ${selectedSeats.length * 50}</p>
              </div>
              <button
                onClick={handleContinue}
                disabled={selectedSeats.length === 0}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}