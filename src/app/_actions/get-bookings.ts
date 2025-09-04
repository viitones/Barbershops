'use server'

import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookingsProps {
  date: Date
  serviceId: string
}

export async function GetBookings({ date }: GetBookingsProps) {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}
