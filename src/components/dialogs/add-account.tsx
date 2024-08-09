import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import AddAccountForm from '@/components/forms/add-account'
import { useState } from "react"

const AddAccount = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm'>Добавить аккаунт</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-description="Добавить аккаунт" aria-describedby="">
        <DialogHeader>
          <DialogTitle>Добавить аккаунт</DialogTitle>
        </DialogHeader>
        <AddAccountForm onAccountAdded={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default AddAccount