import { Prisma } from "@/generated/prisma"
import { format, formatDate, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import { PhoneItem } from "../../../phone-item"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

// receber agendamento como prop
interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  const {
    service: { barbershop },
  } = booking

  const isConfirmed = isFuture(booking.date)

  return (
    <Sheet>
      <SheetTrigger className="min-w-[90%] p-0">
        <Card className="w-full">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3>{booking.service.name}</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {formatDate(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {formatDate(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {formatDate(booking.createdAt, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[90%] p-4">
        <SheetHeader className="border-b">
          <SheetTitle className="text-left">Detalhes do Agendamento</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            src="/map.png"
            className="rounded-xl object-cover"
            fill
            alt={`Mapa de ${barbershop.name}`}
          />

          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex h-[40px] items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>

              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-sm">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card className="mt-3 mb-6 p-0">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold text-gray-400">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.priceInCents) / 100)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-400">Data</h2>
                <p className="text-sm text-gray-400">
                  {format(booking.date, "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-400">Horário</h2>
                <p className="text-sm text-gray-400">
                  {format(booking.date, "HH:mm", { locale: ptBR })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-400">Barbearia</h2>
                <p className="text-sm text-gray-400">{barbershop.name}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
