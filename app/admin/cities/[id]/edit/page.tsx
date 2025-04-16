'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import { useLanguage } from '@/context/LanguageContext'

interface PageProps {
  params: {
    id: string
  }
}

export default function EditCityPage({ params }: PageProps) {
  const router = useRouter()
  const { language, translations } = useLanguage()
  const t = translations.dashboard.cities.form
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    nameAr: ''
  })

  const fetchCity = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/cities/${params.id}`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
    
      if (!response.ok) throw new Error(t.errors.loadFailed)
      
      const data = await response.json()
      setFormData({
        name: data.name,
        nameAr: data.nameAr
      })
    } catch (err: any) {
      toast.error(t.errors.loadFailed)
      console.error(err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/cities/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t.errors.updateFailed)
      }

      toast.success(t.success.updated)
      setTimeout(() => {
        router.push('/admin/cities')
      }, 2000)

    } catch (err: any) {
      toast.error(err.message || t.errors.updateFailed)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCity()
  }, [])

  return (
    <div className={`max-w-2xl mx-auto text-black ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <Toaster />
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">{t.title.edit}</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.labels.nameEn}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder={t.placeholders.nameEn}
            dir="ltr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t.labels.nameAr}
          </label>
          <input
            type="text"
            required
            value={formData.nameAr}
            onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder={t.placeholders.nameAr}
            dir="rtl"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            {t.buttons.cancel}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
          >
            {loading ? t.buttons.updating : t.buttons.update}
          </button>
        </div>
      </form>
    </div>
  )
}