import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { BarbershopItem } from "./_components/barbershop-item"
import { BookingItem } from "./_components/booking-item"
import { Header } from "./_components/header"
import { Search } from "./_components/search"
import { Button } from "./_components/ui/button"
import { quickSearchOptions } from "./_constants/quicksearch-options"
import { authOptions } from "./_lib/auth"
import { db } from "./_lib/prisma"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"

export default async function Home() {
  const session = await getServerSession(authOptions)

  const barbershops = await db.barbershop.findMany({})
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, {session?.user ? session?.user?.name?.split(" ")[0] : "visitante"}</h2>
        <p>{format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}</p>

        <div className="mt-6">
          <Search />
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              variant={"secondary"}
              className="cursor-pointer gap-2"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Banner - Agende nos melhores com FSW Barber"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Agendamentos  */}
        {session?.user && (
          <h2 className="mt-6 mb-6 text-xs font-bold text-gray-400 uppercase">
            Agendamentos
          </h2>
        )}
        <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <h2 className="mt-6 mb-6 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((bs) => (
            <BarbershopItem key={bs.id} barbershop={bs} />
          ))}
        </div>

        <h2 className="mt-6 mb-6 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarberShops.map((bs) => (
            <BarbershopItem key={bs.id} barbershop={bs} />
          ))}
        </div>
      </div>
    </div>
  )
}
