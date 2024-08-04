import { useToast } from "@/components/ui/use-toast"

export const useHandleError = () => {
  const { toast } = useToast()

  return () => {
    toast({
      description: 'Ошибка сервера',
    })
  }
}