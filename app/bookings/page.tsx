'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import BookingModal from '@/components/BookingModal'
import ConfirmDialog from '@/components/ConfirmDialog'

interface Booking {
  id: string
  from: string
  to: string
  date: string
  seats: string[]
  status: 'confirmed' | 'completed' | 'cancelled'
  price: number
}

export default function BookingsPage() {
  // Mock bookings data with proper typing
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'BK001',
      from: 'New York',
      to: 'Boston',
      date: '2024-02-15',
      seats: ['12A', '12B'],
      status: 'confirmed',
      price: 150
    },
    {
      id: 'BK002',
      from: 'Los Angeles',
      to: 'San Francisco',
      date: '2024-02-20',
      seats: ['15C'],
      status: 'completed',
      price: 75
    }
  ])

  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null)

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
    }
  }
  const handleCancelBooking = () => {
    setBookings((prevBookings: Booking[]) => 
      prevBookings.map(booking => 
        booking.id === bookingToCancel?.id 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    )
    setBookingToCancel(null)
  }

  const handleModalCancelBooking = (bookingId: string) => {
    setSelectedBooking(null)
    const bookingToCancel = bookings.find(b => b.id === bookingId)
    if (bookingToCancel) {
      setBookingToCancel(bookingToCancel)
    }
  }

  const { language, translations } = useLanguage()

  return (
    <div className={`min-h-screen bg-gray-50 py-24 text-black ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {translations.bookings.title}
        </h1>

        {bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`text-lg font-semibold text-gray-900 flex items-center ${language === 'ar' ? 'flex-row-reverse space-x-reverse' : ''} space-x-2`}>
                      <span>{booking.from}</span>
                      <span>→</span>
                      <span>{booking.to}</span>
                    </h3>
                    <p className="text-gray-600">
                      {translations.bookings.bookingCard.bookingId}: {booking.id}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {translations.bookings.status[booking.status]}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-medium">{translations.bookings.bookingCard.date}</p>
                    <p>{new Date(booking.date).toLocaleDateString(language === 'ar' ? 'en-US' : 'en-US')}</p>
                  </div>
                  <div>
                    <p className="font-medium">{translations.bookings.bookingCard.seats}</p>
                    <p>{booking.seats.join(', ')}</p>
                  </div>
                  <div>
                    <p className="font-medium">{translations.bookings.bookingCard.price}</p>
                    <p>${booking.price}</p>
                  </div>
                </div>

                <div className={`mt-4 pt-4 border-t flex gap-2 ${language === 'ar' ? 'flex-row-reverse' : ''} justify-end space-x-4`}>
                  <button 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    {translations.bookings.bookingCard.viewDetails}
                  </button>
                  {booking.status === 'confirmed' && (
                    <button 
                      className="text-red-600 hover:text-red-800"
                      onClick={() => setBookingToCancel(booking)}
                    >
                      {translations.bookings.bookingCard.cancelBooking}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {translations.bookings.noBookings.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {translations.bookings.noBookings.description}
            </p>
            <a
              href="/trips"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {translations.bookings.noBookings.cta}
            </a>
          </div>
        )}
      </div>

      <BookingModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
        onCancelBooking={handleModalCancelBooking}
      />

      <ConfirmDialog
        isOpen={!!bookingToCancel}
        onClose={() => setBookingToCancel(null)}
        onConfirm={handleCancelBooking}
        title={bookingToCancel?.id || ''}
        message={translations.bookings.confirmCancel.message}
      />
    </div>
  )
}