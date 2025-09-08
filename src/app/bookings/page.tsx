import { Header } from "@/src/app/_components/header"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import { BookingItem } from "../_components/booking-item"
import { Card, CardContent } from "../_components/ui/card"
import { getConcludedBookings } from "../_data/get-concluded-bookings"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { authOptions } from "../_lib/auth"
import { Avatar, AvatarImage } from "../_components/ui/avatar"
import { PhoneItem } from "../_components/phone-item"
import Image from "next/image"

export default async function Bookings() {
  const session = await getServerSession(authOptions)
  const userSessionImage = session?.user?.image ?? ""
  const userSessionName = session?.user?.name ?? ""

  if (!session?.user) {
    return notFound()
  }
  const confirmedBookings = await getConfirmedBookings()

  const concludedBookings = await getConcludedBookings()

  return (
    <>
      <Header userImage={userSessionImage} userName={userSessionName} />
      <div className="grid grid-cols-1 ">
        <div className="space-y-3 p-5">
          <h1 className="text-xl font-bold">Agendamentos</h1>

          {confirmedBookings.length > 0 && (
            <>
              <h2 className="mt-6 mb-6 text-xs font-bold text-gray-400 uppercase">
                Confirmados
              </h2>
              {confirmedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </>
          )}

          {concludedBookings.length > 0 && (
            <>
              <h2 className="mt-6 mb-6 text-xs font-bold text-gray-400 uppercase">
                Finalizados
              </h2>
              {concludedBookings.map((booking) => (
                <BookingItem key={booking.id} booking={booking} />
              ))}
            </>
          )}
        </div>
      </div>
    </>
  )
}
