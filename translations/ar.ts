import bookSeat from "@/app/book-seat/page";

export const ar = {
  nav: {
    
    home: 'الرئيسية',
    trips : 'الرحلات',
    myBookings: 'الحجوزات',
    bookSeat : 'احجز مقعدك',
    dashboard : 'لوحة التحكم',
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
      cancelled: 'ملغي',
      pending: 'قيد الانتظار'
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
      message: 'هل أنت متأكد من إلغاء الحجز ؟ لا يمكن التراجع عن هذا الإجراء',
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
      seats: {
        title: 'اختر مقاعدك',
        legend: {
          available: 'متاح',
          selected: 'تم اختياره',
          booked: 'محجوز'
        },
        selectedSeats: 'المقاعد المختارة',
        totalPrice: 'السعر الإجمالي',
        button: {
          continue: 'متابعة'
        },
        errors: {
          loadFailed: 'فشل تحميل المقاعد'
        }
      }
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
    },
    auth: {
      login: {
        title: 'مرحباً بعودتك',
        subtitle: 'سجل دخول إلى حسابك للمتابعة',
        email: {
          label: 'البريد الإلكتروني',
          placeholder: 'أدخل بريدك الإلكتروني'
        },
        password: {
          label: 'كلمة المرور',
          placeholder: 'أدخل كلمة المرور'
        },
        button: {
          signin: 'تسجيل الدخول',
          loading: 'جاري تسجيل الدخول...',
          success: 'تم بنجاح!'
        },
        noAccount: 'ليس لديك حساب؟ سجل الآن',
        forgotPassword: 'نسيت كلمة المرور؟',
        successMessage: 'تم تسجيل الدخول بنجاح! جاري التحويل...'
      },
      forgotPassword: {
        title: 'نسيت كلمة المرور',
        subtitle: 'أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور',
        email: {
          label: 'البريد الإلكتروني',
          placeholder: 'example@example.com'
        },
        button: {
          send: 'إرسال رابط إعادة التعيين',
          sending: 'جاري الإرسال...',
          sent: 'تم الإرسال!'
        },
        success: 'تم إرسال رابط إعادة التعيين! يرجى التحقق من بريدك الإلكتروني.',
        backToLogin: 'العودة لتسجيل الدخول'
      },
      resetPassword: {
        title: 'إعادة تعيين كلمة المرور',
        subtitle: 'أدخل رمز التحقق المرسل إلى بريدك الإلكتروني',
        code: {
          label: 'رمز التحقق',
          placeholder: 'أدخل الرمز من البريد الإلكتروني'
        },
        newPassword: {
          label: 'كلمة المرور الجديدة',
          placeholder: 'أدخل كلمة المرور الجديدة'
        },
        confirmPassword: {
          label: 'تأكيد كلمة المرور الجديدة',
          placeholder: 'تأكيد كلمة المرور الجديدة'
        },
        button: {
          reset: 'إعادة تعيين كلمة المرور',
          resetting: 'جاري إعادة التعيين...',
          success: 'تم بنجاح!'
        },
        errors: {
          passwordMismatch: 'كلمات المرور غير متطابقة',
          resetFailed: 'فشلت إعادة تعيين كلمة المرور'
        },
        success: 'تم إعادة تعيين كلمة المرور بنجاح! جاري التحويل إلى صفحة تسجيل الدخول...'
      },
      register: {
        title: 'إنشاء حساب جديد',
        fullName: {
          label: 'الاسم الكامل',
          placeholder: 'أدخل اسمك الكامل'
        },
        email: {
          label: 'البريد الإلكتروني',
          placeholder: 'أدخل بريدك الإلكتروني'
        },
        password: {
          label: 'كلمة المرور',
          placeholder: 'أدخل كلمة المرور'
        },
        confirmPassword: {
          label: 'تأكيد كلمة المرور',
          placeholder: 'تأكيد كلمة المرور'
        },
        phone: {
          label: 'رقم الهاتف',
          placeholder: 'رقم الهاتف (اختياري)'
        },
        button: {
          signup: 'إنشاء حساب',
          creating: 'جاري إنشاء الحساب...'
        },
        haveAccount: 'لديك حساب بالفعل؟ تسجيل الدخول',
        errors: {
          passwordMismatch: 'كلمات المرور غير متطابقة',
          passwordLength: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل'
        }
      }
    },
 
}

