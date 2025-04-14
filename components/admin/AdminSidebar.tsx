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
  
} from '@heroicons/react/24/outline'
import BusesPage from '@/app/admin/buses/page'

// Add to imports



const menuItems = [
  { href: '/admin', icon: HomeIcon, label: 'Dashboard' },
  { href: '/admin/users', icon: UsersIcon, label: 'Users' },
  { href: '/admin/bookings', icon: TicketIcon, label: 'Bookings' },
  { href: '/admin/trips', icon: CalendarIcon, label: 'Trips' },
  { href: '/admin/buses', icon: TruckIcon, label: 'Buses' },  
  { href: '/admin/routes', icon: MapIcon, label: 'Routes' }, 
  { href: '/admin/cities', icon: MapIcon, label: 'Cities' }, 
  { href: '/admin/reports', icon: ChartBarIcon, label: 'Reports' },
  { href: '/admin/settings', icon: CogIcon, label: 'Settings' }
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-800">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <span className="text-white text-lg font-semibold">Admin Panel</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
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
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}