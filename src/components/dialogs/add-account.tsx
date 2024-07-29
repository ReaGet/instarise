import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import AddAccountForm from '../forms/add-account-form'

const AddAccount = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>Добавить аккаунт</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-description="Добавить аккаунт" aria-describedby="">
        <DialogHeader>
          <DialogTitle>Добавить аккаунт</DialogTitle>
        </DialogHeader>
        <AddAccountForm />
      </DialogContent>
    </Dialog>
  )
}

export default AddAccount