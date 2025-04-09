'use client'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import { 
  HomeIcon, 
  TicketIcon, 
  MapIcon, 
  BookmarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  LanguageIcon
} from '@heroicons/react/24/outline'

export default function Navbar() {
  const { language, translations, toggleLanguage } = useLanguage()
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              <MapIcon className="h-8 w-8" />
              <span>{translations.brand}</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              >
                <HomeIcon className="h-5 w-5" />
                <span>{translations.nav.home}</span>
              </Link>
              <Link 
                href={isAuthenticated ? "/book-seat" : "/auth/login"}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              >
                <TicketIcon className="h-5 w-5" />
                <span>{translations.nav.bookSeat}</span>
              </Link>
              <Link 
                href={isAuthenticated ? "/trips" : "/auth/login"}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              >
                <MapIcon className="h-5 w-5" />
                <span>{translations.nav.trips}</span>
              </Link>
              <Link 
                href={isAuthenticated ? "/bookings" : "/auth/login"}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
              >
                <BookmarkIcon className="h-5 w-5" />
                <span>{translations.nav.myBookings}</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              <LanguageIcon className="h-5 w-5" />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 text-gray-600 bg-gray-50 rounded-lg">
                  <UserCircleIcon className="h-5 w-5" />
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span>{language === 'en' ? 'Logout' : 'تسجيل خروج'}</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span>{language === 'en' ? 'Sign In' : 'تسجيل دخول'}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
