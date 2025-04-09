// 'use client'
// import { useState, useEffect } from 'react'
// import { useRouter, useSearchParams } from 'next/navigation'
// import { useAuth } from '@/contexts/AuthContext'
// import AuthLoader from '../components/AuthLoader'

// export default function VerifyPage() {
//   const router = useRouter()
//   const searchParams = useSearchParams()
//   const { isAuthenticated } = useAuth()
//   const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending')
//   const [error, setError] = useState('')
  
//   useEffect(() => {
//     if (isAuthenticated) {
//       router.push('/')
//       return
//     }

//     const email = searchParams.get('email')
//     const token = searchParams.get('token')

//     if (!email) {
//       setError('Email is required for verification')
//       setVerificationStatus('error')
//       return
//     }

//     if (token) {
//       verifyEmail(email, token)
//     }
//   }, [isAuthenticated])

//   const verifyEmail = async (email: string, token: string) => {
//     try {
//       const response = await fetch('/api/auth/verify', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, token })
//       })

//       if (!response.ok) {
//         throw new Error('Verification failed')
//       }

//       setVerificationStatus('success')
//       setTimeout(() => router.push('/auth/login'), 2000)
//     } catch (err: any) {
//       setError(err.message)
//       setVerificationStatus('error')
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Email Verification
//           </h2>
//         </div>

//         <div className="mt-8 space-y-6">
//           {verificationStatus === 'pending' && (
//             <div className="flex justify-center">
//               <AuthLoader />
//               <span className="ml-2">Verifying your email...</span>
//             </div>
//           )}

//           {verificationStatus === 'success' && (
//             <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
//               <div className="flex">
//                 <div className="ml-3">
//                   <p className="text-sm text-green-700">
//                     Email verified successfully! Redirecting to login...
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {verificationStatus === 'error' && (
//             <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
//               <div className="flex">
//                 <div className="ml-3">
//                   <p className="text-sm text-red-700">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }