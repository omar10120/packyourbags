'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { 
  PencilIcon, 
  TrashIcon, 
  PlusIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline'
import ConfirmDialogAdmin from '@/components/ConfirmDialogAdmin'

interface Route {
  id: string
  departureCity: {
    id: string
    name: string
  }
  arrivalCity: {
    id: string
    name: string
  }
  distance: number
  trips: {
    id: string
    bus: {
      plateNumber: string
    }
  }[]
}

export default function RoutesPage() {
  const router = useRouter()
  const [routes, setRoutes] = useState<Route[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [routeToDelete, setRouteToDelete] = useState<string | null>(null)

  useEffect(() => {
    fetchRoutes()
  }, [])

  const fetchRoutes = async () => {
    try {
      const response = await fetch('/api/admin/routes')
      const data = await response.json()
      setRoutes(data)
    } catch (error) {
      console.error('Error fetching routes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteClick = (routeId: string) => {
    setRouteToDelete(routeId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteRoute = async () => {
    if (!routeToDelete) return

    try {
      const response = await fetch(`/api/admin/routes/${routeToDelete}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete route')
      }

      setRoutes(routes.filter(route => route.id !== routeToDelete))
      toast.success('Route deleted successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete route')
    } finally {
      setRouteToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const filteredRoutes = routes.filter(route => 
    route.departureCity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.arrivalCity.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <Toaster />
      <ConfirmDialogAdmin
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteRoute}
        title="Delete Route"
        message="Are you sure you want to delete this route? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      <div className="flex justify-between items-center mb-6 text-black">
        <h1 className="text-2xl font-semibold text-gray-800">Route Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search routes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button
            onClick={() => router.push('/admin/routes/new')}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add Route</span>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                From
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distance (km)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active Trips
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRoutes.map((route) => (
              <tr key={route.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {route.departureCity.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {route.arrivalCity.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {route.distance}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {route.trips.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => router.push(`/admin/routes/${route.id}/edit`)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(route.id)}
                    className="text-red-600 hover:text-red-900 ml-4"
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