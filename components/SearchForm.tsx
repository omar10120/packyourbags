'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'

const SearchForm = () => {
  const router = useRouter()
  const { language, translations } = useLanguage()
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams(formData)
    router.push(`/trips?${searchParams.toString()}`)
  }

  const cities = language === 'ar' ? [
    'الرياض',
    'جدة',
    'مكة',
    'المدينة',
    'الدمام',
    'الطائف'
  ] : [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia'
  ]

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 text-black ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="from" className="block text-sm font-medium text-gray-700">
            {translations.trips.search.from}
          </label>
          <select
            id="from"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.from}
            onChange={(e) => setFormData({ ...formData, from: e.target.value })}
            required
          >
            <option value="">{translations.trips.search.placeholder}</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="to" className="block text-sm font-medium text-gray-700">
            {translations.trips.search.to}
          </label>
          <select
            id="to"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.to}
            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
            required
          >
            <option value="">{translations.trips.search.placeholder}</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            {translations.trips.search.date}
          </label>
          <input
            type="date"
            id="date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
      >
        {translations.trips.search.search}
      </button>
    </form>
  )
}

export default SearchForm