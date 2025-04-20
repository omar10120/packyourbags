'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { useSearchTrips } from '@/hooks/useSearchTrips'

export default function SearchForm() {
  const router = useRouter()
  const { language, translations } = useLanguage()
  const { departureCities, arrivalCities, searchTrips, loading } = useSearchTrips()
  
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.from || !formData.to || !formData.date) return

    const trips = await searchTrips(formData.from, formData.to, formData.date)
    
    // Store search results in localStorage or state management
    localStorage.setItem('searchResults', JSON.stringify(trips))
    
    // Navigate to results page
    router.push('/search-results')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={formData.from}
          onChange={(e) => setFormData({ ...formData, from: e.target.value })}
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">{translations.search.from}</option>
          {departureCities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <select
          value={formData.to}
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">{translations.search.to}</option>
          {arrivalCities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="block w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
      >
        {loading ? translations.search.searching : translations.search.submit}
      </button>
    </form>
  )
}