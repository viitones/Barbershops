'use client'

import { Prisma } from "@/src/generated/prisma"
import { DialogClose } from "./ui/dialog"
import { format, formatDate, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import Image from "next/image"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"
import { useState } from "react"
import { PhoneItem } from "./phone-item"

// receber agendamento como prop
interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: { service: { include: { barbershop: true } } }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const {
    service: { barbershop },
  } = booking

  const isConfirmed = isFuture(booking.date)


  function handleCancelBooking() {
    try {
      deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success("Agendamento cancelado com sucesso")
    } catch (error) {
      toast.error("Erro ao cancelar agendamento")
    }
  }

  function handleSheetOpenChange(isOpen: boolean) {
    setIsSheetOpen(isOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
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
      <SheetContent className="w-[85%] p-4">
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
        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button className="w-1/2" variant={"outline"}>
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-1/2" variant={"destructive"}>
                    Cancelar
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>
                      Você tem certeza que deseja cancelar?
                    </DialogTitle>
                    <DialogDescription>
                      Esta ação não pode ser desfeita. Isso cancelará
                      permanentemente seu agendamento.
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="outline" className="w-1/2">Voltar</Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button onClick={handleCancelBooking} variant="destructive" className="w-1/2">Sim, cancelar</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
