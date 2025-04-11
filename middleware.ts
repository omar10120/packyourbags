import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
 
  const authHeader = request.headers.get('Authorization')


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
  
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key')

    const { payload } = await jwtVerify(token, secret)
    const userId = payload.userId as string
   

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('userId', userId)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }
}

export const config = {
  matcher: ['/api/bookings', '/api/bookings/:path*'],
}
