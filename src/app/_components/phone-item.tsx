'use client'

import { SmartphoneIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "./ui/button"

interface PhoneItemProps {
  phone: string
}

export function PhoneItem({ phone }: PhoneItemProps) {
  function handleCopyPhoneClick(phone: string) {
    navigator.clipboard.writeText(phone)

    toast.success("Telefone copiado com sucesso!")
  }

  return (
    <div className="flex justify-between" key={phone}>
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>

      <Button
        variant={"ghost"}
        size={"sm"}
        onClick={() => handleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}
