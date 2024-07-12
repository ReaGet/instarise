import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import AddAccountForm from '../forms/add-account-form'

interface Props {}

const AddAccount = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm'>Добавить аккаунт</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить аккаунт</DialogTitle>
        </DialogHeader>
        <AddAccountForm />
      </DialogContent>
    </Dialog>
  )
}

export default AddAccount