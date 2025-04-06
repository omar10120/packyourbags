import bookSeat from "@/app/book-seat/page";

export const ar = {
  nav: {
    
    home: 'الرئيسية',
    trips : 'الرحلات',
    myBookings: 'الحجوزات',
    bookSeat : 'احجز مقعدك',
  },
  home: {
    hero: {
      title: "عمرو للسفر الرحلات",
      subtitle: "استمتع بتجربة نقل مريحة وموثوقة بين المدن",
      imageAlt: "السفر بالحافلات الحديثة",
      exploreButton: "استكشف المسارات",
      bookButton: "احجز الآن"
    },
    stats: {
      cities: "المدن المتوفرة",
      customers: "زبائن سعيدة",
      support: "قسم دعم فني"
    },
    cta: {
      title: "هل أنت مستعد لبدء رحلتك؟",
      description: "انضم إلى آلاف المسافرين الراضين الذين اختارونا لرحلاتهم.",
      button: "عرض المسارات المتاحة"
    },
    features: {
      easyBooking: {
        title: "حجز سهل",
        description: "احجز تذاكرك في دقائق مع نظام الحجز البسيط لدينا"
      },
      comfortableTravel: {
        title: "سفر مريح",
        description: "حافلات حديثة مع مقاعد مريحة ووسائل راحة"
      },
      bestPrices: {
        title: "أفضل الأسعار",
        description: "أسعار تنافسية وخصومات منتظمة لعملائنا"
      }
    },
    popularRoutes: {
      title: "المسارات الشائعة"
    }
  },
  brand: 'احزم حقائبك',
  hero: {
    title: "احجز مقعدك في دقائق",
    subtitle: "احجز مقعدك في دقائق مع نظام الحجز البسيط لدينا",
    imageAlt: "حافلات حديثة",
    exploreButton: "استكشف المسارات",
    bookButton: "احجز الآن"
  },
  bookings: {
    title: 'الحجوزات الخاصة بي',
    status: {
      confirmed: 'تأكيد',
      completed: 'مكتمل',
      cancelled: 'ملغي'
    },

    
    noBookings: {
      title: 'لا توجد حجوزات',
      description: 'لم تقم بأي حجوزات حتى الآن',
      cta: 'احجز رحلة'
    },
    bookingCard: {
      bookingId: 'رقم الحجز',
      date: 'التاريخ',
      seats: 'المقاعد',
      price: 'السعر',
      viewDetails: 'عرض التفاصيل',
      cancelBooking: 'إلغاء الحجز'
    },
    modal: {
      title: 'تفاصيل الحجز',
      from: 'من',
      to: 'إلى',
      travelDate: 'تاريخ السفر',
      selectedSeats: 'المقاعد المختارة',
      close: 'إغلاق'
    },
    confirmCancel: {
      title: 'إلغاء الحجز',
      message: 'هل أنت متأكد من إلغاء الحجز {id}؟ لا يمكن التراجع عن هذا الإجراء',
      confirm: 'تأكيد',
      cancel: 'إلغاء'
    },

  },
   trips: {
      title: 'الرحلات المتاحة',
      search: {
        placeholder: 'البحث عن الوجهات...',
        from: 'من',
        to: 'إلى',
        date: 'التاريخ',
        search: 'بحث عن رحلات'
      },
      filters: {
        title: 'التصفية',
        titlePage: 'الرحلات المتوفرة',
        sortBy: 'ترتيب حسب',
        priceRange: 'نطاق السعر',
        min: 'الحد الأدنى',
        max: 'الحد الأقصى',
        departureTime: 'وقت المغادرة',
        allTimes: 'جميع الأوقات',
        morning: 'صباحاً (6 ص - 12 م)',
        afternoon: 'ظهراً (12 م - 6 م)',
        evening: 'مساءً (بعد 6 م)',
        sortOptions: {
          priceAsc: 'السعر: من الأقل إلى الأعلى',
          priceDesc: 'السعر: من الأعلى إلى الأقل',
          timeAsc: 'المغادرة: الأقرب',
          timeDesc: 'المغادرة: الأبعد'
        }
      },
      tripCard: {
        seats: 'المقاعد المتاحة',
        price: 'سعر المقعد',
        duration: 'المدة',
        bookNow: 'احجز الآن',
        soldOut: 'نفذت التذاكر',
        hours: 'ساعات',
        date : 'تاريخ',
      },
      noResults: {
        title: 'لا توجد رحلات',
        description: 'حاول تعديل معايير البحث'
      },

    },
    bookSeat: {
      hero: {
        title: "سافر براحة",
        subtitle: "احجز تذاكر الحافلة بسهولة وابدأ رحلتك اليوم",
        imageAlt: "السفر بالحافلة"
      },
      features: {
        easyBooking: {
          title: "حجز سهل",
          description: "احجز تذاكرك في دقائق مع نظام الحجز البسيط لدينا"
        },
        comfortableTravel: {
          title: "سفر مريح",
          description: "سافر براحة مع أسطولنا الحديث من الحافلات"
        },
        bestPrices: {
          title: "أفضل الأسعار",
          description: "احصل على أفضل الأسعار لرحلتك بدون رسوم خفية"
        }
      },
      popularRoutes: {
        title: "الوجهات الشائعة"
      }
    },
    footer: {
      description: "شريكك الموثوق للسفر المريح والموثوق به بالحافلات عبر المملكة.",
      quickLinks: "روابط سريعة",
      support: "الدعم",
      help: "مركز المساعدة",
      contact: "اتصل بنا",
      followUs: "تابعنا",
      rights: "جميع الحقوق محفوظة."
    }
}

