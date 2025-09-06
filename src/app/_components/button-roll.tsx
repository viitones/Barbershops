"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { getPopularBarberShops } from "../_data/get-barbershops"
import { BarbershopItem } from "./barbershop-item"
import { Barbershop, Booking } from "@/src/generated/prisma"

  interface BarbershopCarouselProps {
    barberShops: Barbershop[]
  }


export default function BarbershopCarousel({ barberShops }: BarbershopCarouselProps) {

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" })
    }
  }

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScrollButtons)
      checkScrollButtons() // Check initial state

      return () => {
        scrollElement.removeEventListener("scroll", checkScrollButtons)
      }
    }
  }, [])

  return (
    <>
      {/* Botão Esquerda */}
      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          className="hidden md:inline absolute -left-[25px] z-10 rounded-full border border-gray-600 bg-black/80 p-3 shadow-md transition-all duration-200 hover:bg-white/20 hover:shadow-lg"
          aria-label="Rolar para esquerda"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
      )}

      {/* Container dos Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
      >
        {barberShops.map((bs) => {
          return <BarbershopItem key={bs.id} barbershop={bs} />
        })}
      </div>

      {/* Botão Direita */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="hidden md:inline absolute -right-[25px] z-10 rounded-full border border-gray-600 bg-black/80 p-3 shadow-md transition-all duration-200 hover:bg-white/20 hover:shadow-lg"
          aria-label="Rolar para direita"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      )}
    </>
  )
}
