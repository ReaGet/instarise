import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import AccountActions from './account-actions'

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
          <TableCell className='flex justify-start'>
            <Badge variant='outline' className='flex items-center gap-2 py-1'>
              <div className='w-2 h-2 rounded-full bg-primary'></div>
              <span>Работает</span>
            </Badge>
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