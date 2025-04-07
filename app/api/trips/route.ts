import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const from = searchParams.get('from')
    const to = searchParams.get('to')
    const date = searchParams.get('date')

    const trips = await prisma.trip.findMany({
      where: {
        AND: [
          {
            route: {
              departureCity: from ? {
                name: { contains: from }
              } : undefined,
              arrivalCity: to ? {
                name: { contains: to }
              } : undefined
            }
          },
          date ? {
            departureTime: {
              gte: new Date(date),
              lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
            }
          } : {}
        ]
      },
      include: {
        route: {
          include: {
            departureCity: true,
            arrivalCity: true
          }
        },
        seats: true
      }
    })

    return NextResponse.json(trips)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch trips' },
      { status: 500 }
    )
  }
}