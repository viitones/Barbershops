import { ServiceItem } from "@/src/app/_components/service-item"
import { SidebarSheet } from "@/src/app/_components/sidebar-sheets"
import { Button } from "@/src/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/src/app/_components/ui/sheet"
import { db } from "@/src/app/_lib/prisma"
import { ChevronLeft, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PhoneItem } from "../../_components/phone-item"

interface BarbershopPageProps {
  params: Promise<{ id: string }>
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
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
    <div>
      {/* imagem */}
      <div className="relative h-[250px] w-full">
        <Image
          fill
          className="rounded-2xl object-cover"
          src={barbershop?.imageUrl}
          alt={barbershop?.name}
        />

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

      {/* titulo */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop?.name}</h1>
        <div className="mb-2 flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (889 avaliações)</p>
        </div>
      </div>

      {/* descrição */}

      <div className="border-b border-solid p-5">
        <h2 className="space-y-3 text-xs font-black text-gray-400 uppercase">
          Sobre nós
        </h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>

      {/* serviços */}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-black text-gray-400 uppercase">Serviços</h2>

        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} barbershop={barbershop} />
          ))}
        </div>
      </div>

      {/* contato */}
      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}
