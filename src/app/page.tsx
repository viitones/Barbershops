import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { BookingItem } from "./_components/booking-item"
import BarbershopCarousel from "./_components/button-roll"
import { Header } from "./_components/header"
import { Search } from "./_components/search"
import { Button } from "./_components/ui/button"
import { quickSearchOptions } from "./_constants/quicksearch-options"
import {
  getBarbershops,
  getPopularBarberShops,
  getVisitedBarberShops,
} from "./_data/get-barbershops"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import { authOptions } from "./_lib/auth"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const userSessionImage = session?.user?.image
  const userSessionName = session?.user?.name

  const confirmedBookings = await getConfirmedBookings()
  const barbershops = await getBarbershops()
  const popularBarberShops = await getPopularBarberShops()
  const visitedBarberShops = await getVisitedBarberShops()

  return (
    <div className="relative">
      <Header
        userImage={userSessionImage ?? ""}
        userName={userSessionName ?? ""}
      />
      <div className="absolute inset-0 top-0 left-0 -z-10 hidden h-[42%] w-full md:inline">
        <Image
          src="/hero.jpg"
          alt="Imagem de um barbeiro cortando o cabelo de um cliente"
          fill
          className="h-full w-full object-cover opacity-35 grayscale"
          priority
        />
      </div>
      <div className="relative p-5 md:mx-auto md:max-w-[1440px] md:p-10">
        {/* Background image */}

        <div className="inline md:grid md:grid-cols-5 md:gap-10">
          <div className="col-span-2">
            <h2 className="text-xl font-bold">
              Olá,{" "}
              {session?.user ? session?.user?.name?.split(" ")[0] : "visitante"}
            </h2>
            <p>{format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}</p>

            <div className="mt-6">
              <Search />
            </div>

            <div className="mt-6 md:hidden">
              <div className="flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
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
          </div>

          <div className="col-span-3">
            <h2 className="mt-6 mb-6 text-xs font-bold text-gray-400 uppercase">
              Recomendados
            </h2>

            <div className="relative flex items-center">
              <BarbershopCarousel barberShops={barbershops} />
            </div>
          </div>
        </div>

        <h2 className="mt-6 mb-6 text-xs font-bold text-gray-400 uppercase md:mt-24">
          Populares
        </h2>

        <div className="relative flex items-center">
          <BarbershopCarousel barberShops={popularBarberShops} />
        </div>

        <h2 className="mt-6 mb-6 text-xs font-bold text-gray-400 uppercase md:mt-24">
          Mais Visitados
        </h2>

        <div className="relative flex items-center">
          <BarbershopCarousel barberShops={visitedBarberShops} />
        </div>
      </div>
    </div>
  )
}
