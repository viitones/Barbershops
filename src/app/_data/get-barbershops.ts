import { db } from "../_lib/prisma"

export async function getBarbershops() {
  return await db.barbershop.findMany({})
}

export async function getPopularBarberShops(){
  return await db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  })
}

export async function getVisitedBarberShops(){
  return await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
}