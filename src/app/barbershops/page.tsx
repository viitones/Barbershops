import { BarbershopItem } from "../_components/barbershop-item"
import { Header } from "../_components/header"
import { Search } from "../_components/search"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: Promise<{
    title?: string
    service?: string
  }>
}

export default async function BarbershopsPage({
  searchParams,
}: BarbershopsPageProps) {
  const searchParamsResolved = await searchParams

  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParamsResolved.title
          ? {
              name: {
                contains: searchParamsResolved.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParamsResolved.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParamsResolved.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })

  return (
    <div className="">
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>

      <div className="px-5">
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Resultados para &quot;{searchParamsResolved.title || searchParamsResolved.service}
          &quot; (Total: {barbershops.length})
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
