"use server"

import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"

interface CreateBookingParams {
  serviceId: string
  date: Date
}

export async function createBooking(params: CreateBookingParams) {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuário não autenticado.")
  }

  interface SessionUser {
    id: string
  }

  await db.booking.create({
    data: { ...params, userId: (user.user as SessionUser).id },
  })
  revalidatePath("/barbershops/[id]")
}
