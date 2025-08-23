import { BarbershopService } from "@/generated/prisma"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

interface ServiceItemProps {
  service: BarbershopService
}

export function ServiceItem({ service }: ServiceItemProps) {
  return (
    <Card className="p-0 max-w-[420px]">
      <CardContent className="flex items-center gap-3 p-3">
        {/* image */}
        <div className="relative max-h-[120px] min-h-[120px] max-w-[110px] min-w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* direita */}

        <div className="space-y-2 w-full">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>

            <Button variant={"secondary"} size={"sm"}>
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
