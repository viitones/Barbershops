import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { BarbershopItem } from "./_components/barbershop-item"
import { BookingItem } from "./_components/booking-item"
import { Header } from "./_components/header"
import { Button } from "./_components/ui/button"
import { Card, CardContent } from "./_components/ui/card"
import { Input } from "./_components/ui/input"
import { quickSearchOptions } from "./_constants/quicksearch-options"
import { db } from "./_lib/prisma"

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})
  const popularBarberShops = await db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Victor</h2>
        <p>Segunda-feira, 20 de agosto</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca" />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              key={option.title}
              variant={"secondary"}
              className="cursor-pointer gap-2"
            >
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
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
        <BookingItem />

        <h2 className="mt-6 mb-6 text-xs font-bold text-gray-400 uppercase">
          Agendamentos
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

      <footer>
        <Card className="rounded-none">
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">
              &Copy; 2023 FSW Barber. Todos os direitos reservados.
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}
