import { BarbershopItem } from "../_components/barbershop-item"
import { Header } from "../_components/header"
import { Search } from "../_components/search"
import { authOptions } from "../_lib/auth"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"

interface BarbershopsPageProps {
  searchParams: Promise<{
    title?: string
    service?: string
  }>
}

export default async function BarbershopsPage({
  searchParams,
}: BarbershopsPageProps) {
  const session = await getServerSession(authOptions)

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
      <Header userImage={session?.user?.image ?? ''} userName={session?.user?.name ?? ''} />
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
