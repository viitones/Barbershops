import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";

interface BookingSummaryProps {
  service: 
}

export function BookingSummary() {
  return (
    <Card className="p-0">
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm font-bold text-gray-400">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.priceInCents) / 100)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-400">Data</h2>
          <p className="text-sm text-gray-400">
            {format(selectedDay, "dd 'de' MMMM 'de' yyyy", {
              locale: ptBR,
            })}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-400">Horário</h2>
          <p className="text-sm text-gray-400">{selectedTime}</p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-gray-400">Barbearia</h2>
          <p className="text-sm text-gray-400">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}
