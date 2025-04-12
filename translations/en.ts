export const en = {
  nav: {
    home: 'Home',
    trips : 'Trips',
    myBookings : 'My Bookings',    
    bookSeat : 'Book Seat',
  },
  home: {
    hero: {
      title: "Am'r for Bus Travel",
      subtitle: "Experience seamless journeys across cities with modern comfort and reliability",
      imageAlt: "Modern bus travel",
      exploreButton: "Explore Routes",
      bookButton: "Book Now"
    },
    stats: {
      cities: "Cities Connected",
      customers: "Happy Customers",
      support: "Customer Support"
    },
    cta: {
      title: "Ready to Start Your Journey?",
      description: "Join thousands of satisfied travelers who choose us for their journeys.",
      button: "View Available Routes"
    }
  },
  brand: 'PackYourBags',
  bookings: {
    title: 'My Bookings',
    status: {
      confirmed: 'Confirmed',
      completed: 'Completed',
      cancelled: 'Cancelled',
      pending: 'Pending',

    },
    noBookings: {
      title: 'No Bookings Found',
      description: "You haven't made any bookings yet.",
      cta: 'Book a Trip'
    },
    bookingCard: {
      bookingId: 'Booking ID',
      date: 'Date',
      seats: 'Seats',
      price: 'Price',
      viewDetails: 'View Details',
      cancelBooking: 'Cancel Booking'
    },
    modal: {
      title: 'Booking Details',
      from: 'From',
      to: 'To',
      travelDate: 'Travel Date',
      selectedSeats: 'Selected Seats',
      close: 'Close'
    },
    confirmCancel: {
      title: 'Cancel Booking',
      message: 'Are you sure you want to cancel booking ? This action cannot be undone.',
      confirm: 'Confirm',
      cancel: 'Cancel'
    }
  },
  trips: {
    filters: {
      title: 'Filters',
      titlePage: 'Avilable Trips',
      sortBy: 'Sort By',
      priceRange: 'Price Range',
      min: 'Min',
      max: 'Max',
      departureTime: 'Departure Time',
      allTimes: 'All Times',
      morning: 'Morning (6AM - 12PM)',
      afternoon: 'Afternoon (12PM - 6PM)',
      evening: 'Evening (After 6PM)',
      sortOptions: {
        priceAsc: 'Price: Low to High',
        priceDesc: 'Price: High to Low',
        timeAsc: 'Departure: Earliest',
        timeDesc: 'Departure: Latest'
      }
    },
    tripCard: {
      seats: 'Available Seats',
      price: 'Price per seat',
      duration: 'Duration',
      bookNow: 'Book Now',
      soldOut: 'Sold Out',
      hours: 'hours',
      date : 'date',
      
    },
    noResults: {
      title: 'No Trips Found',
      description: 'Try adjusting your search criteria'
    },
    search: {
      placeholder: 'search on interfaces...',
      from: 'from',
      to: 'to',
      date: 'date',
      search: 'search on trips'
    },
  },
  bookSeat: {
    hero: {
      title: "Travel with Comfort",
      subtitle: "Book your bus tickets easily and start your journey today",
      imageAlt: "Bus Travel"
    },
    features: {
      easyBooking: {
        title: "Easy Booking",
        description: "Book your tickets in minutes with our simple booking system"
      },
      comfortableTravel: {
        title: "Comfortable Travel",
        description: "Travel in comfort with our modern fleet of buses"
      },
      bestPrices: {
        title: "Best Prices",
        description: "Get the best prices for your journey with no hidden fees"
      }
    },
    popularRoutes: {
      title: "Popular Routes"
    }
  },
  footer: {
    description: "Your trusted partner for comfortable and reliable bus travel across the country.",
    quickLinks: "Quick Links",
    support: "Support",
    help: "Help Center",
    contact: "Contact Us",
    followUs: "Follow Us",
    rights: "All rights reserved."
  },
  
  auth: {
    login: {
      title: 'Welcome back',
      subtitle: 'Sign in to your account to continue',
      email: {
        label: 'Email address',
        placeholder: 'Enter your email'
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your password'
      },
      button: {
        signin: 'Sign in',
        loading: 'Signing in...',
        success: 'Success!'
      },
      noAccount: "Don't have an account? Register",
      forgotPassword: 'Forgot password?',
      successMessage: 'Login successful! Redirecting...'
    },
    forgotPassword: {
      title: 'Forgot Password',
      subtitle: 'Enter your email address and we\'ll send you a link to reset your password',
      email: {
        label: 'Email address',
        placeholder: 'example@example.com'
      },
      button: {
        send: 'Send Reset Link',
        sending: 'Sending...',
        sent: 'Email Sent!'
      },
      success: 'Reset link sent! Please check your email.',
      backToLogin: 'Back to Login'
    },
    resetPassword: {
      title: 'Reset Password',
      subtitle: 'Enter the verification code sent to your email',
      code: {
        label: 'Verification Code',
        placeholder: 'Enter code from email'
      },
      newPassword: {
        label: 'New Password',
        placeholder: 'Enter new password'
      },
      confirmPassword: {
        label: 'Confirm New Password',
        placeholder: 'Confirm new password'
      },
      button: {
        reset: 'Reset Password',
        resetting: 'Resetting...',
        success: 'Success!'
      },
      errors: {
        passwordMismatch: 'Passwords do not match',
        resetFailed: 'Password reset failed'
      },
      success: 'Password reset successful! Redirecting to login...'
    },
    register: {
      title: 'Create your account',
      fullName: {
        label: 'Full Name',
        placeholder: 'Enter your full name'
      },
      email: {
        label: 'Email address',
        placeholder: 'Enter your email'
      },
      password: {
        label: 'Password',
        placeholder: 'Enter password'
      },
      confirmPassword: {
        label: 'Confirm Password',
        placeholder: 'Confirm your password'
      },
      phone: {
        label: 'Phone',
        placeholder: 'Phone (optional)'
      },
      button: {
        signup: 'Sign up',
        creating: 'Creating account...'
      },
      haveAccount: 'Already have an account? Sign in',
      errors: {
        passwordMismatch: 'Passwords do not match',
        passwordLength: 'Password must be at least 6 characters long'
      }
    }
  }
}
