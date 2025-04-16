export interface Translations {
  nav: {
    home: string
    trips: string
    myBookings: string
  }
  brand: string
  trips: {
    title: string
    search: {
      placeholder: string
      from: string
      to: string
      date: string
      search: string
    }
    filters: {
      title: string
      sortBy: string
      priceRange: string
      min: string
      max: string
      departureTime: string
      allTimes: string
      morning: string
      afternoon: string
      evening: string
      sortOptions: {
        priceAsc: string
        priceDesc: string
        timeAsc: string
        timeDesc: string
      }
    }
    tripCard: {
      seats: string
      price: string
      duration: string
      bookNow: string
      soldOut: string
      hours: string
    }
    noResults: {
      title: string
      description: string
    }
  }
  bookings: {
    title: string
    status: {
      confirmed: string
      completed: string
      cancelled: string
      pending: string
    }
    noBookings: {
      title: string
      description: string
      cta: string
    }
    bookingCard: {
      bookingId: string
      date: string
      seats: string
      price: string
      viewDetails: string
      cancelBooking: string
    }
    modal: {
      title: string
      from: string
      to: string
      travelDate: string
      selectedSeats: string
      close: string
    }
    confirmCancel: {
      title: string
      message: string
      confirm: string
      cancel: string
    }
  },
  dashboard: {
    home: {
      title: string
      summary: {
        totalBookings: string
        activeTrips: string
        totalRevenue: string
        totalCustomers: string
      }
      recentBookings: {
        title: string
        columns: {
          bookingId: string
          customer: string
          route: string
          date: string
          status: string
          amount: string
        }
        noBookings: string
      }
      stats: {
        title: string
        daily: string
        weekly: string
        monthly: string
      }
    }
  }
}