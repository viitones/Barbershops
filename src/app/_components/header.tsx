"use client"

import { Calendar1Icon, LogOut, MenuIcon, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { SidebarSheet } from "./sidebar-sheets"
import { SignInDialog } from "./sign-in-dialog"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Dialog, DialogContent } from "./ui/dialog"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { signOut } from "next-auth/react"

interface HeaderProps {
  userImage: string
  userName: string
}

export function Header({ userImage, userName }: HeaderProps) {
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false)

  function handleSignInDialogOpen() {
    return setSignInDialogIsOpen(true)
  }

  function handleLogout() {
    signOut()
  }

  return (
    <Card className="rounded-none">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Link href="/">
          <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
        </Link>

        <div className="hidden space-x-8 md:inline-flex">
          {(!userImage || !userName) && (
            <>
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={handleSignInDialogOpen}
              >
                <Calendar1Icon size={16} />
                Agendamentos
              </Button>

              <Button
                onClick={handleSignInDialogOpen}
                className="cursor-pointer"
              >
                <User size={16} />
                Perfil
              </Button>

              <Dialog
                open={signInDialogIsOpen}
                onOpenChange={setSignInDialogIsOpen}
              >
                <DialogContent className="w-[90%]">
                  <SignInDialog />
                </DialogContent>
              </Dialog>
            </>
          )}

          {(userImage || userName) && (
            <>
              <Button variant={"outline"} className="cursor-pointer" asChild>
                <Link href="/bookings">
                  <Calendar1Icon size={16} />
                  Agendamentos
                </Link>
              </Button>

              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={userImage} alt={userName} />
                </Avatar>
                <span>{userName}</span>

                <Button
                  variant={"ghost"}
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  sair
                </Button>
              </div>
            </>
          )}
        </div>

        <Sheet>
          <SheetTrigger className="md:hidden" asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SidebarSheet />
        </Sheet>
      </CardContent>
    </Card>
  )
}
