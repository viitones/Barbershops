import { AvatarImage } from "@radix-ui/react-avatar"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { quickSearchOptions } from "../_constants/quicksearch-options"
import { Avatar } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

export function Header() {
  return (
    <Card className="rounded-none">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid px-2 pb-5">
              <Avatar>
                <AvatarImage src="https://github.com/viitones.png" />
              </Avatar>

              <div>
                <p className="font-bold">Victor Hugo</p>
                <p className="text-xs">vitao@email.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-solid px-2 py-5">
              <SheetClose asChild>
                <Button asChild variant="ghost" className="justify-start gap-2">
                  <Link href="/">
                    <HomeIcon size={18} />
                    Início
                  </Link>
                </Button>
              </SheetClose>
              <Button variant="ghost" className="justify-start gap-2">
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-4 border-b border-solid px-2 py-5">
              {quickSearchOptions.map((opt) => (
                <Button
                  key={opt.title}
                  variant="ghost"
                  className="justify-start gap-2"
                >
                  <Image
                    src={opt.imageUrl}
                    alt={opt.title}
                    width={18}
                    height={18}
                  />
                  {opt.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-4 border-b border-solid px-2 py-5">
              <Button variant="ghost" className="justify-start gap-2">
                <LogOutIcon size={18} />
                Sair da conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}
