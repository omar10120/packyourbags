import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json()

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and verification code are required' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !user.verificationToken) {
      return NextResponse.json(
        { error: 'Invalid verification attempt' },
        { status: 400 }
      )
    }

    // Check if the first 6 characters of the token match the code
    const storedCode = user.verificationToken.substring(0, 6).toUpperCase()
    
    if (code.toUpperCase() !== storedCode) {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      )
    }

    // Update user verification status
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        verificationToken: null
      }
    })

    return NextResponse.json({
      message: 'Email verified successfully'
    })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    )
  }
}