import { MenuIcon } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

export function Header() {
  return (
    <Card className="rounded-none">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
        <Button size="icon" variant="outline">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  )
}
