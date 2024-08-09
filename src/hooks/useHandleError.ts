import { useToast } from "@/components/ui/use-toast"

export const useHandleError = () => {
  const { toast } = useToast()

  return (msg?: string) => {
    toast({
      description: msg || 'Ошибка сервера',
    })
  }
}