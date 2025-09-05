"use client"

import { Barbershop, BarbershopService, Booking } from "@/src/generated/prisma"
import { isPast, isToday, set } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { toast } from "sonner"
import { createBooking } from "../_actions/create-booking"
import { GetBookings } from "../_actions/get-bookings"
import { BookingSummary } from "./booking-summary"
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

interface GetTimeListProps {
  bookings: Booking[] | undefined
  selectedDay: Date
}

function getTimeList({ bookings, selectedDay }: GetTimeListProps) {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minute = Number(time.split(":")[1])

    if (!bookings) {
      return
    }

    const timeIsOnThePast = isPast(
      set(new Date(), { hours: hour, minutes: minute }),
    )
    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasbookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minute,
    )

    if (hasbookingOnCurrentTime) {
      return false
    }
    return true
  })
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

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return
    return set(selectedDay, {
      hours: Number(selectedTime.split(":")[0]),
      minutes: Number(selectedTime.split(":")[1]),
    })
  }, [selectedDay, selectedTime])

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
      if (!selectedDate) return

      await createBooking({
        serviceId: service.id,
        date: selectedDate,
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

  const timeList = useMemo(() => {
    if (!selectedDay) return []
    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

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
                    {timeList.length > 0 ? (
                      timeList.map((time) => (
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
                      ))
                    ) : (
                      <p className="text-xs">
                        Nenhum horário disponível neste dia.
                      </p>
                    )}
                  </div>

                  {selectedDate && (
                    <div className="p-5">
                      <BookingSummary
                        barbershop={barbershop}
                        service={service}
                        selectedDate={selectedDate}
                      />
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
