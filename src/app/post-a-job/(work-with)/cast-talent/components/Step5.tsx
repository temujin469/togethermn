"use client"

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import usePostJob from '@/hooks/usePostJob';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import Box from '../../components/Box';
import TIp4 from './tip/TIp4';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from '@/components/ui/table';

const jobShema = z.object({
  perHour: z.string(),
  perDay: z.string(),
  budget: z.string()
})

function Step5() {
  const { previousStep, job, setJob } = usePostJob()

  const [budgetType, setBudgetType] = useState(job?.budgetType || "perDay");


  const form = useForm<z.infer<typeof jobShema>>({
    resolver: zodResolver(jobShema),
    defaultValues: {
      ...job as any
    }
  })

  const handleSubmit = (values: z.infer<typeof jobShema>) => {
    console.log(values)
    setJob({ ...values as Partial<typeof jobShema>, budgetType })
  }


  return (
    <div className='flex gap-10 flex-col-reverse lg:flex-row'>
      <Box>
        <div className='space-y-6'>
          <div>
            <h1 className='text-xl font-semibold mb-3'>
              Урьдчилан үзэх
            </h1>
            <p className='text-gray-500 font-normal mb-4'>
              Та орхисон бүх зүйлээ эргэн харж, тааруулж болно. Та бүх зүйлд сэтгэл хангалуун болсны дараа "Илгээх" товчийг дарна уу!
            </p>
          </div>
          <h1 className='text-lg font-semibold'>
            {job?.title}
          </h1>
          <div>
            <Label>
              Ажлын дэлгэрэнгүй мэдээлэл</Label>
            <p className='text-gray-500'>{job?.description}</p>
          </div>
          <div>
            <Label>
              Хамгийн тохиромжтой нэр дэвшигч</Label>
            <p className='text-gray-500'>{job?.profession}</p>
          </div>
          <div>
            <div>
              <Label>
                Хамгийн тохиромжтой нэр дэвшигч</Label>
              <p className='text-gray-500'>{job?.gender}</p>
            </div>
            <div>
              <Label>
                Хамгийн тохиромжтой нэр дэвшигч</Label>
              <p className='text-gray-500'>{job?.gender}</p>
            </div>
            <div>
              <Label>
                Хамгийн тохиромжтой нэр дэвшигч</Label>
              <p className='text-gray-500'>{job?.gender}</p>
            </div>
            <div>
              <Label>
                Хамгийн тохиромжтой нэр дэвшигч</Label>
              <p className='text-gray-500'>{job?.gender}</p>
            </div>
          </div>
          <div>
            <Label>
              Хамгийн тохиромжтой нэр дэвшигч
            </Label>
            <p className='text-gray-500'>{job?.gender}</p>
          </div>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableBody>
              <TableRow>
                <TableHead className='text-gray-800'>Насs</TableHead>
                <TableCell>{job?.gender}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className='text-gray-800'>Хүйс</TableHead>
                <TableCell>{job?.hairColor}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className='text-gray-800'>Насs</TableHead>
                <TableCell>{job?.bodyType}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className='text-gray-800'>Өндөр</TableHead>
                <TableCell>{job?.minHeight + "cm"}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className='text-gray-800'>Өндөр</TableHead>
                <TableCell>{job?.minHeight + "cm"}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead className='text-gray-800'>Огноо</TableHead>
                <TableCell>{job?.minHeight + "cm"}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className='flex justify-end'>
          <Button type="button" variant="ghost" size="lg" onClick={previousStep}>Буцах</Button>
          <Button type='submit' className='' variant="secondary" size="lg">
            Илгээх
          </Button>
        </div>
      </Box>
      {/* tip1 for step1 */}
      <TIp4 />
    </div>
  );
}

export default Step5;
