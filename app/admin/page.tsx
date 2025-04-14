'use client'
import { useState, useEffect } from 'react'
import StatsCard from '../../components/admin/StatsCard'
import RecentBookings from '../../components/admin/RecentBookings'



import { 
  UsersIcon, 
  TicketIcon, 
  CurrencyDollarIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline'

export default function AdminDashboard() {
const [stats, setStats] = useState({
  totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
    activeTrips: 0
  })

  useEffect(() => {
    fetchDashboardStats()
  }, [])


  

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
  }

  return (

    
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard 
          title="Total Users"
          value={stats.totalUsers} 
          icon={<UsersIcon className="h-6 w-6" />}
          color="bg-blue-500"
        />
        <StatsCard 
          title="Total Bookings"
          value={stats.totalBookings}
          icon={<TicketIcon className="h-6 w-6" />}
          color="bg-green-500"
        />
        <StatsCard 
          title="Total Revenue"
          value={`$${stats.totalRevenue}`}
          icon={<CurrencyDollarIcon className="h-6 w-6" />}
          color="bg-yellow-500"
        />
        <StatsCard 
          title="Active Trips"
          value={stats.activeTrips}
          icon={<CalendarIcon className="h-6 w-6" />}
          color="bg-purple-500"
        />
      </div>

      <RecentBookings />
    </div>
  )
}