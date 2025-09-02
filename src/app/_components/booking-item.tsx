import { Prisma } from "@/generated/prisma"
import { formatDate, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

// receber agendamento como prop
interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  const isConfirmed = isFuture(booking.date)

  return (
    <>
      <Card className="min-w-[90%] p-0">
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit" variant={isConfirmed ? "default" : "secondary"}>
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
    </>
  )
}
