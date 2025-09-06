import { ServiceItem } from "@/src/app/_components/service-item"
import { SidebarSheet } from "@/src/app/_components/sidebar-sheets"
import { Button } from "@/src/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/src/app/_components/ui/sheet"
import { db } from "@/src/app/_lib/prisma"
import { ChevronLeft, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Header } from "../../_components/header"
import { PhoneItem } from "../../_components/phone-item"
import { Avatar, AvatarImage } from "../../_components/ui/avatar"
import { Card, CardContent } from "../../_components/ui/card"
import { getConfirmedBookings } from "../../_data/get-confirmed-bookings"
import { authOptions } from "../../_lib/auth"

interface BarbershopPageProps {
  params: Promise<{ id: string }>
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  const session = await getServerSession(authOptions)

  const confirmedBookings = await getConfirmedBookings()

  const { id } = await params

  const barbershop = await db.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <>
      <div className="hidden md:block">
        {session && (
          <Header
            userImage={session?.user?.image ?? ""}
            userName={session?.user?.name ?? ""}
          />
        )}
      </div>

      <div className="mx-auto max-w-[1440px] gap-10 px-5 md:mt-10 md:flex md:justify-between md:px-0">
        <div className="">
          {/* imagem */}
          <div className="relative h-[250px] w-full">
            <Image
              fill
              className="rounded-2xl object-cover"
              src={barbershop?.imageUrl}
              alt={barbershop?.name}
            />

            <div className="md:hidden">
              <Button
                asChild
                size="icon"
                variant={"secondary"}
                className="absolute top-4 left-4"
              >
                <Link href={"/"}>
                  <ChevronLeft />
                </Link>
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    size="icon"
                    variant={"secondary"}
                    className="absolute top-4 right-4"
                  >
                    <MenuIcon />
                  </Button>
                </SheetTrigger>

                <SidebarSheet />
              </Sheet>
            </div>
          </div>

          {/* titulo */}
          <div className="border-b border-solid p-5">
            <div className="md:flex md:justify-between">
              <div className="md:flex md:flex-col md:justify-between">
                <h1 className="text-xl font-bold md:text-4xl">
                  {barbershop?.name}
                </h1>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="text-primary" size={18} />
                  <p className="text-sm">{barbershop?.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 md:hidden">
                <StarIcon className="fill-primary text-primary" size={18} />
                <p className="text-sm">5,0 (889 avaliações)</p>
              </div>

              <Card className="hidden w-fit md:inline-flex">
                <CardContent>
                  <span className="flex items-center justify-center gap-1">
                    <StarIcon className="fill-primary text-primary" />
                    <span className="font-bold">5,0</span>
                  </span>
                  <span className="text-sm">(889 avaliações)</span>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* descrição */}

          <div className="border-b border-solid p-5 md:hidden">
            <h2 className="space-y-3 text-xs font-black text-gray-400 uppercase">
              Sobre nós
            </h2>
            <p className="text-justify text-sm">{barbershop?.description}</p>
          </div>

          {/* serviços */}
          <div className="space-y-3 border-b border-solid md:border-none p-5">
            <h2 className="text-xs font-black text-gray-400 uppercase">
              Serviços
            </h2>

            <div className="space-x-2 md:grid md:grid-cols-1 xl:grid-cols-2 md:gap-3">
              {barbershop.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  barbershop={barbershop}
                />
              ))}
            </div>
          </div>

          {/* contato */}
          <div className="space-y-3 p-5 md:hidden">
            {barbershop.phones.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>

        <div className="hidden max-w-[386px] min-w-[250px] md:block md:mb-8">
          <Card className="p-5">
            <div className="relative flex h-[180px] w-full items-end">
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

            <h2 className="mt-6 text-lg uppercase">Sobre nós</h2>
            <p className="mb-5 border-b pb-5 text-justify text-sm text-gray-400">
              {barbershop.description}
            </p>

            <div className="mb-5 space-y-3 border-b pb-5">
              <PhoneItem phone={barbershop.phones[0]} />
              <PhoneItem phone={barbershop.phones[1]} />
            </div>

            <div className="mb-5 space-y-2 border-b pb-5">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-400">Segunda</span>
                <span className="text-sm text-gray-400">Fechado</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-400">Terça-Feira</span>
                <span className="text-sm font-medium text-white">
                  09:00 - 21:00
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-400">Quarta-Feira</span>
                <span className="text-sm font-medium text-white">
                  09:00 - 21:00
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-400">Quinta-Feira</span>
                <span className="text-sm font-medium text-white">
                  09:00 - 21:00
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-400">Sexta-Feira</span>
                <span className="text-sm font-medium text-white">
                  09:00 - 21:00
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-400">Sábado</span>
                <span className="text-sm font-medium text-white">
                  08:00 - 17:00
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-400">Domingo</span>
                <span className="text-sm text-gray-400">Fechado</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-md">Em parceria com</h3>
              <div className="relative mt-3 h-8 w-32">
                <Image src="/logo.png" fill alt="Logo" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
