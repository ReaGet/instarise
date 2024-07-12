import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import AccountActions from './account-actions'
import StatusBadge from "@/components/status-badge"

const AccountList = () => {
  return (
    <Table className='mt-8'>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16">
            <Checkbox />
          </TableHead>
          <TableHead className="w-[100px]">Название</TableHead>
          <TableHead>Описание</TableHead>
          <TableHead>Прокси</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Действие</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell><Checkbox /></TableCell>
          <TableCell className="font-bold">@_rea_m_</TableCell>
          <TableCell>Lorem ipsum dolor sit amet, consectetur adipisicing asd</TableCell>
          <TableCell>192.168.0.111</TableCell>
          <TableCell>
            <StatusBadge status="working" />
          </TableCell>
          <TableCell className="text-right">
            <AccountActions />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default AccountList