import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { token } = await req.json()

    const user = await prisma.user.findUnique({
      where: { verificationToken: token }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid verification token' },
        { status: 400 }
      )
    }

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
    return NextResponse.json(
      { error: 'Failed to verify email' },
      { status: 500 }
    )
  }
}