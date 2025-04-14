'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useLanguage } from '@/context/LanguageContext'

export default function RegisterPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { language, translations } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError(translations.auth.register.errors.passwordMismatch)
      return
    }

    if (formData.password.length < 6) {
      setError(translations.auth.register.errors.passwordLength)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone || undefined,

        })
      })

      const data = await response.json()

      if (data.error != null) {
        setError(data.error);
        throw new Error(data.error || 'Registration failed')
      }
     
      setError(data.error);
    
      
      // If registration is successful, redirect to verification page
      router.push(`/auth/verify-code?email=${encodeURIComponent(formData.email)}`)
      
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 text-black  ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-md w-full space-y-8  ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {translations.auth.register.title}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6 border-none" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4 border-none ">
            <div >
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 my-4 " >
                {translations.auth.register.fullName.label}
              </label>
              <input
                id="fullName"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={translations.auth.register.fullName.placeholder}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 my-4">
                {translations.auth.register.email.label}
              </label>
              <input
                id="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={translations.auth.register.email.placeholder}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 my-4">
                {translations.auth.register.password.label}
              </label>
              <input
                id="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={translations.auth.register.password.placeholder}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 my-4">
                {translations.auth.register.confirmPassword.label}
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={translations.auth.register.confirmPassword.placeholder}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 my-4">
                {translations.auth.register.phone.label}
              </label>
              <input
                id="phone"
                type="tel"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder={translations.auth.register.phone.placeholder}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? translations.auth.register.button.creating : translations.auth.register.button.signup}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link 
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {translations.auth.register.haveAccount}
          </Link>
        </div>
      </div>
    </div>
  )
}