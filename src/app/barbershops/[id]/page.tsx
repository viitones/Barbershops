import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeft, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  const barbershop = await db.barbershop.findUnique({
    where: { id: params.id },
  })

  if(!barbershop) {
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

        <Button
          asChild
          size="icon"
          variant={"secondary"}
          className="absolute top-4 right-4"
        >
          <MenuIcon />
        </Button>
      </div>

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

      <div className="p-5 border-b border-solid ">
        <h2 className="space-y-3 text-xs font-black text-gray-400 uppercase">
          Sobre nós
        </h2>
        <p className="text-sm text-justify">
          {barbershop?.description}
        </p>
      </div>
    </div>
  )
}
