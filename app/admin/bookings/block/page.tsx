'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { useLanguage } from '@/context/LanguageContext'

interface Trip {
  id: string
  departureTime: string
  arrivalTime: string
  route: {
    departureCity: { name: string }
    arrivalCity: { name: string }
  }
}

interface Seat {
  id: string
  seatNumber: string
  status: 'available' | 'booked' | 'blocked' | 'blocked'
}

export default function AdminBlockSeats() {
  const router = useRouter()
  const { language, translations } = useLanguage()
  const t = translations.dashboard.bookings.blockSeats
  const [trips, setTrips] = useState<Trip[]>([])
  const [selectedTrip, setSelectedTrip] = useState<string>('')
  const [seats, setSeats] = useState<Seat[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/trips', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setTrips(data)
    } catch (error) {
      toast.error(t.errors.fetchTrips)
    } finally {
      setLoading(false)
    }
  }

  const fetchSeats = async (tripId: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/trips/${tripId}/seats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setSeats(data)
    } catch (error) {
      toast.error(t.errors.fetchSeats)
    }
  }

  const handleBlockSeats = async () => {
    if (!selectedSeats.length) {
      toast.error(t.errors.noSeatsSelected)
      return
    }

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/trips/${selectedTrip}/block-seats`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ seatIds: selectedSeats })
      })

      if (!response.ok) throw new Error(t.errors.blockSeats)

      toast.success(t.success.seatsBlocked)
      fetchSeats(selectedTrip)
      setSelectedSeats([])
    } catch (error) {
      toast.error(t.errors.blockSeats)
    }
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  useEffect(() => {
    if (selectedTrip) {
      fetchSeats(selectedTrip)
    }
  }, [selectedTrip])

  const handleSeatClick = (seatId: string) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId)
        : [...prev, seatId]
    )
  }

  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.includes(seat.id)) return 'bg-blue-500 text-white'
    switch (seat.status) {
      case 'blocked': return 'bg-red-300 text-red-800'
      case 'booked': return 'bg-gray-300 text-gray-800'
      default: return 'bg-white text-gray-800 hover:bg-gray-50'
    }
  }

  return (
    <div className={`p-6 text-black ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Toaster />
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">{t.title}</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t.selectTrip}
        </label>
        <select
          value={selectedTrip}
          onChange={(e) => setSelectedTrip(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          dir="ltr"
        >
          <option value="">{t.tripPlaceholder}</option>
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.route.departureCity.name} → {trip.route.arrivalCity.name} ({new Date(trip.departureTime).toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')})
            </option>
          ))}
        </select>
      </div>

      {selectedTrip && (
        <>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {seats.map((seat) => (
              <button
                key={seat.id}
                onClick={() => seat.status === 'available' && handleSeatClick(seat.id)}
                disabled={seat.status !== 'available'}
                className={`p-4 border rounded-lg ${getSeatColor(seat)} transition-colors duration-200`}
              >
                {seat.seatNumber}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-white border rounded mr-2"></div>
                <span className="text-sm">{t.seatStatus.available}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                <span className="text-sm">{t.seatStatus.selected}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span className="text-sm">{t.seatStatus.blocked}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                <span className="text-sm">{t.seatStatus.booked}</span>
              </div>
            </div>

            <button
              onClick={handleBlockSeats}
              disabled={!selectedSeats.length}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.buttons.blockSelected}
            </button>
          </div>
        </>
      )}
    </div>
  )
}