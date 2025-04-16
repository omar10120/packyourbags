'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  HomeIcon,
  UsersIcon,
  TicketIcon,
  CalendarIcon,
  CogIcon,
  ChartBarIcon,
  TruckIcon,
  MapIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/context/LanguageContext'

const getMenuItems = (t: any) => [
  { href: '/admin', icon: HomeIcon, label: t.dashboard },
  { href: '/admin/users', icon: UsersIcon, label: t.users },
  { href: '/admin/bookings', icon: TicketIcon, label: t.bookings },
  { href: '/admin/trips', icon: CalendarIcon, label: t.trips },
  { href: '/admin/buses', icon: TruckIcon, label: t.buses },  
  { href: '/admin/routes', icon: MapIcon, label: t.routes }, 
  { href: '/admin/cities', icon: BuildingOfficeIcon, label: t.cities }, 
  { href: '/admin/reports', icon: ChartBarIcon, label: t.reports },
  { href: '/admin/settings', icon: CogIcon, label: t.settings }
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { language, translations } = useLanguage()
  const t = translations.dashboard.sidebar
  const menuItems = getMenuItems(t)

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white text-lg font-semibold">{t.title}</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className={`flex-1 px-2 py-4 space-y-1 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}