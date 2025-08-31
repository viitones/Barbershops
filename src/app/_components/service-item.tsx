"use client"

import { Barbershop, BarbershopService, Booking } from "@/generated/prisma"
import { format, set } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { createBooking } from "../_actions/create-booking"
import { GetBookings } from "../_actions/get-bookings"
import { SignInDialog } from "./sign-in-dialog"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { Card, CardContent } from "./ui/card"
import { Dialog, DialogContent } from "./ui/dialog"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
]

function getTimeList(bookings: Booking[] | undefined) {
  if (!bookings) return TIME_LIST

  const bookedTimes = bookings.map((booking) =>
    format(booking.date, "HH:mm", { locale: ptBR }),
  )

  const hasBookingOnCurrentTime = TIME_LIST.filter(
    (time) => !bookedTimes.includes(time),
  )

  return hasBookingOnCurrentTime
}

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
  const { data } = useSession()

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const [dayBookings, setDayBookings] = useState<Booking[]>()

  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)

  useEffect(() => {
    async function fetch() {
      if (!selectedDay) return

      const bookings = await GetBookings({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBookings(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  function handleBookingSheetOpenChange() {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings(undefined)
    setBookingSheetIsOpen(false)
  }

  function handleDateSelect(date: Date | undefined) {
    setSelectedDay(date)
  }

  function handleTimeSelect(time: string | undefined) {
    setSelectedTime(time)
  }

  async function handleCreateBooking() {
    try {
      if (!selectedDay || !selectedTime) return

      const hour = Number(selectedTime?.split(":")[0])
      const minute = Number(selectedTime?.split(":")[1])
      const newDate = set(selectedDay, {
        hours: hour,
        minutes: minute,
      })

      await createBooking({
        serviceId: service.id,
        date: newDate,
      })
      handleBookingSheetOpenChange()

      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.log(error)

      toast.error("Erro ao criar a reserva. Tente novamente.")
    }
  }

  function handleBookingClick() {
    if (!data) {
      return setSignInDialogIsOpen(true)
    }

    setBookingSheetIsOpen(true)
  }

  return (
    <>
      <Card className="max-w-[420px] p-0">
        <CardContent className="flex items-center gap-3 p-3">
          {/* image */}
          <div className="relative max-h-[120px] min-h-[120px] max-w-[110px] min-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* direita */}

          <div className="w-full space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.priceInCents) / 100)}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant={"secondary"}
                  size={"sm"}
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer reserva de {service.name}</SheetTitle>
                  </SheetHeader>

                  <div className="flex justify-center border-b border-solid py-5">
                    <Calendar
                      disabled={{ before: new Date() }}
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>

                  <div className="grid w-fit grid-cols-3 gap-3 self-center overflow-x-auto p-5 px-5 [&::-webkit-scrollbar]:hidden">
                    {selectedDay &&
                      getTimeList(dayBookings).map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="rounded-full border border-b border-solid border-transparent"
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                  </div>

                  {selectedTime && selectedDay && (
                    <div className="p-5">
                      <Card className="p-0">
                        <CardContent className="space-y-3 p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold text-gray-400">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.priceInCents) / 100)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-400">
                              Data
                            </h2>
                            <p className="text-sm text-gray-400">
                              {format(selectedDay, "dd 'de' MMMM 'de' yyyy", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-400">
                              Horário
                            </h2>
                            <p className="text-sm text-gray-400">
                              {selectedTime}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-gray-400">
                              Barbearia
                            </h2>
                            <p className="text-sm text-gray-400">
                              {barbershop.name}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  {selectedTime && selectedDay && (
                    <SheetFooter className="px-5">
                      {/* <SheetClose asChild> */}
                      <Button onClick={handleCreateBooking}>Confirmar</Button>
                      {/* </SheetClose> */}
                    </SheetFooter>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={signInDialogIsOpen} onOpenChange={setSignInDialogIsOpen}>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}
