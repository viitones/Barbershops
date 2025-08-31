import { signIn } from "next-auth/react"
import Image from "next/image"
import { Button } from "./ui/button"
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
export function SignInDialog() {
  function handleLoginWithGoogle() {
    signIn("google")
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle className="mb-2 text-center">
          Faça login na plataforma
        </DialogTitle>
        <DialogDescription className="flex flex-col items-center">
          <span>Conecte-se usando sua conta do Google</span>
        </DialogDescription>
      </DialogHeader>

      <Button
        onClick={handleLoginWithGoogle}
        variant={"outline"}
        className="mt-4 gap-1 font-bold"
      >
        <Image src="/google.svg" alt="Google" width={18} height={18} />
        Google
      </Button>
    </>
  )
}
