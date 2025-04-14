'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import ConfirmDialogAdmin from '@/components/ConfirmDialogAdmin'
import { 
  TrashIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon 
} from '@heroicons/react/24/outline'
import BookingDetailsDialog from '@/components/admin/BookingDetailsDialog'

interface Booking {
  id: string
  userId: string
  status: 'pending' | 'confirmed' | 'cancelled'
  totalPrice: number
  createdAt: string
  user: {
    name: string
    email: string
    phone: string
  }
  trip: {
    departureTime: string
    arrivalTime: string
    route: {
      departureCity: { name: string }
      arrivalCity: { name: string }
    }
  }
  details: {
    seat: {
      seatNumber: string
    }
  }[]
}

export default function BookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-yellow-100 text-yellow-800'
    }
  }

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setBookings(data || [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching bookings:', error)
      toast.error('Failed to fetch bookings')
      setBookings([])
      setLoading(false)
    }
  }

  useEffect(() => {
    let isSubscribed = true;

    const initializeFetch = async () => {
      if (isSubscribed) {
        await fetchBookings()
      }
    }

    initializeFetch()

    return () => {
      isSubscribed = false
    }
  }, [])

  const handleStatusUpdate = async (bookingId: string, newStatus: 'confirmed' | 'cancelled') => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (!response.ok) {
        throw new Error('Failed to update booking status')
      }

      toast.success('Booking status updated successfully')
      await fetchBookings() // Now this will work
    } catch (error) {
      toast.error('Failed to update booking status')
    }
  }

  const handleDeleteClick = (bookingId: string) => {
    setBookingToDelete(bookingId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteBooking = async () => {
    if (!bookingToDelete) return

    try {
      const response = await fetch(`/api/admin/bookings/${bookingToDelete}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete booking')
      }

      setBookings(bookings.filter(booking => booking.id !== bookingToDelete))
      toast.success('Booking deleted successfully')
    } catch (error) {
      toast.error('Failed to delete booking')
    } finally {
      setBookingToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const filteredBookings = bookings.filter(booking => 
    booking.trip.route.departureCity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.trip.route.arrivalCity.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    )
  }

  return (
    <div>
      <Toaster />
      <ConfirmDialogAdmin
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteBooking}
        title="Delete Booking"
        message="Are you sure you want to delete this booking? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
      
      <BookingDetailsDialog
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        booking={selectedBooking}
      />

      <div className="flex justify-between items-center mb-6 text-black">
        <h1 className="text-2xl font-semibold text-gray-800">Bookings Management</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push('/admin/bookings/block')}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <span>Block Seats</span>
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departure
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.trip.route.departureCity.name} → {booking.trip.route.arrivalCity.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(booking.trip.departureTime).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {booking.details.map(d => d.seat.seatNumber).join(', ')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${booking.totalPrice}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedBooking(booking)
                      setIsDetailsOpen(true)
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <InformationCircleIcon className="h-5 w-5" />
                  </button>
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        <CheckCircleIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                        className="text-red-600 hover:text-red-900 mr-4"
                      >
                        <XCircleIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDeleteClick(booking.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}