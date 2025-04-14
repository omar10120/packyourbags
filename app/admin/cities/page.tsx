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

interface City {
  id: string
  name: string
  nameAr: string
  departureRoutes: any[]
  arrivalRoutes: any[]
}

export default function CitiesPage() {
  const router = useRouter()
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [cityToDelete, setCityToDelete] = useState<string | null>(null)

  const fetchCities = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/cities', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setCities(data)
      } else {
        console.error('Invalid cities response:', data)
        setCities([])
      }
    } catch (error) {
      console.error('Error fetching cities:', error)
      toast.error('Failed to fetch cities')
      setCities([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isSubscribed = true;

    const initializeFetch = async () => {
      if (isSubscribed) {
        await fetchCities()
      }
    }

    initializeFetch()

    return () => {
      isSubscribed = false
    }
  }, [])

  const handleDeleteClick = (cityId: string) => {
    setCityToDelete(cityId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteCity = async () => {
    if (!cityToDelete) return

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/cities/${cityToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete city')
      }

      setCities(cities.filter(city => city.id !== cityToDelete))
      toast.success('City deleted successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete city')
    } finally {
      setCityToDelete(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const filteredCities = cities.filter(city => 
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.nameAr.includes(searchTerm)
  )

  return (
    <div>
      <Toaster />
      <ConfirmDialogAdmin
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteCity}
        title="Delete City"
        message="Are you sure you want to delete this city? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />

      <div className="flex justify-between items-center mb-6 text-black">
        <h1 className="text-2xl font-semibold text-gray-800">City Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button
            onClick={() => router.push('/admin/cities/new')}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add City</span>
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name (English)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name (Arabic)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Routes
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCities.map((city) => (
              <tr key={city.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {city.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {city.nameAr}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {city.departureRoutes.length + city.arrivalRoutes.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => router.push(`/admin/cities/${city.id}/edit`)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(city.id)}
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