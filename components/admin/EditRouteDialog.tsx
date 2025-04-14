'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

interface City {
  id: string
  name: string
}

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
  trips?: {
    id: string
    bus: {
      plateNumber: string
    }
  }[]
}

interface Props {
  isOpen: boolean
  onClose: () => void
  route: Route | null
  onUpdate: () => void
}

export default function EditRouteDialog({ isOpen, onClose, route, onUpdate }: Props) {
  const [cities, setCities] = useState<City[]>([])
  const [formData, setFormData] = useState({
    departureCityId: '',
    arrivalCityId: '',
    distance: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (route) {
      setFormData({
        departureCityId: route.departureCity.id,
        arrivalCityId: route.arrivalCity.id,
        distance: route.distance.toString()
      })
    }
  }, [route])

  useEffect(() => {
    fetchCities()
  }, [])

  const fetchCities = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/admin/cities', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setCities(data)
    } catch (error) {
      toast.error('Failed to fetch cities')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!route) return

    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/routes/${route.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          distance: parseFloat(formData.distance)
        })
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update route')
      }

      toast.success('Route updated successfully')
      onUpdate()
      onClose()
    } catch (err: any) {
      toast.error(err.message || 'Failed to update route')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center text-black">
      <div className="bg-white rounded-xl w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Route</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departure City
            </label>
            <select
              value={formData.departureCityId}
              onChange={(e) => setFormData({ ...formData, departureCityId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select departure city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Arrival City
            </label>
            <select
              value={formData.arrivalCityId}
              onChange={(e) => setFormData({ ...formData, arrivalCityId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select arrival city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Distance (km)
            </label>
            <input
              type="number"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Route'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}