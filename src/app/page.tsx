import { SearchIcon } from "lucide-react"
import Image from "next/image"
import { BarbershopItem } from "./_components/barbershop-item"
import { Header } from "./_components/header"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { Badge } from "./_components/ui/badge"
import { Button } from "./_components/ui/button"
import { Card, CardContent } from "./_components/ui/card"
import { Input } from "./_components/ui/input"
import { db } from "./_lib/prisma"

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})
  console.log(barbershops)

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

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Banner - Agende nos melhores com FSW Barber"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <h2 className="mt-6 mb-6 text-xs font-bold text-gray-400 uppercase">
          Agendamentos
        </h2>

        <Card className="p-0">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3>Corte de cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/viitones.png" />
                </Avatar>
                <p className="text-sm">Barbearia FSW</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">20</p>
              <p className="text-sm">10:00</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mt-6 mb-6 text-xs font-bold text-gray-400 uppercase">
          Agendamentos
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((bs) => (
            <BarbershopItem key={bs.id} barbershop={bs} />
          ))}
        </div>
      </div>
    </div>
  )
}
