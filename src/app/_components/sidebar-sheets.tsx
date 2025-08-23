import { DialogDescription } from "@radix-ui/react-dialog"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { quickSearchOptions } from "../_constants/quicksearch-options"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"

export function SidebarSheet() {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid px-2 pb-5">
        <h2 className="text-lg font-bold">Olá, faça seu login!</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <LogInIcon />
            </Button>
          </DialogTrigger>

          <DialogContent className="w-[90%]">
            <DialogHeader>
              <DialogTitle>Faça login na plataforma</DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex flex-col items-center">
              <p>
                Conecte-se usando sua conta do Google
              </p>
              <Button variant={"outline"} className="mt-4 gap-1 font-bold">
                <Image src="/google.svg" alt="Google" width={18} height={18} />
                Google
              </Button>
            </DialogDescription>
          </DialogContent>
        </Dialog>

        {/* <Avatar>
          <AvatarImage src="https://github.com/viitones.png" />
        </Avatar>

        <div>
          <p className="font-bold">Victor Hugo</p>
          <p className="text-xs">vitao@email.com</p>
        </div> */}
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
            <Image src={opt.imageUrl} alt={opt.title} width={18} height={18} />
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
  )
}
