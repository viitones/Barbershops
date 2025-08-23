import { Card, CardContent } from "./ui/card"

export function Footer() {
  return (
    <footer>
      <Card className="rounded-none">
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400">
            {String.fromCharCode(169)} 2023 FSW Barber. Todos os direitos
            reservados.
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}
