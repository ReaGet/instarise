import React from 'react'
import Layout from './layout'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '../components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Circle, Ellipsis } from 'lucide-react'

const HomePage = () => {
  return (
    <Layout>
      <main className='w-full'>
        <div>HomePage</div>
        <div className='mt-20'>
          <h1 className='text-2xl font-bold'>Аккаунты</h1>
          <div className='flex items-center justify-between mt-8'>
            <div className='flex items-center gap-6'>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Выберите действие" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Действия</SelectLabel>
                    <SelectItem value="start">Запустить</SelectItem>
                    <SelectItem value="stop">Остановить</SelectItem>
                    <SelectItem value="delete">Удалить</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button size='sm'>Применить</Button>
            </div>
            <Button size='sm'>Добавить аккаунт</Button>
          </div>
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
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant='ghost'>
                        <Ellipsis />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem>Запустить</DropdownMenuItem>
                        <DropdownMenuItem>Остановить</DropdownMenuItem>
                        <DropdownMenuItem>Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </Layout>
  )
}

export default HomePage