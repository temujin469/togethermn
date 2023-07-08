"use client"

import { Button } from '@/components/ui/button';
import usePostJob from '@/hooks/usePostJob';
import React, { useState } from 'react';
import Box from '../../components/Box';
import { Input } from '@/components/ui/input';
import TIp4 from './tip/TIp4';

function Step4() {
  const { nextStep, previousStep, job, setJob } = usePostJob()

  const [budgetType, setBudgetType] = useState(job?.budgetType || "perDay");
  const [perHour, setPerHour] = useState(job?.perHour)
  const [perDay, setPerDay] = useState(job?.perDay)


  const handleSubmit = () => {
    console.log({ perDay, perHour })
    setJob({ perHour, budgetType, perDay })
    nextStep()
  }


  return (
    <div className='flex gap-10 flex-col-reverse lg:flex-row'>
      <Box>
        <form onSubmit={handleSubmit} className='space-y-7'>
          <div>
            <h1 className='text-xl font-semibold mb-3'>
              Энэ үүргийг гүйцэтгэхэд ямар төсөв төсөвлөсөн бэ?</h1>
            <p className='text-gray-500 font-normal mb-4'>
              Ажилд төлөхөд таатай үнээ оруулна уу. Таны санал болгож буй хувь хэмжээ өндөр байх тусам илүү чанартай, өргөн хүрээний өргөдөл гаргагчдыг хүлээн авах болно.</p>
          </div>
          {/* <RadioGroup
            onValueChange={setBudgetType}
            defaultValue={budgetType}
          >
            <Label>Миний төсөв дээр үндэслэсэн</Label>
            <div className='flex gap-10'>
              <FormItem>
                <FormControl>
                  <RadioGroupItem value="perDay" />
                </FormControl>
                <FormLabel className='font-normal pl-2'>
                  Өдөрт</FormLabel>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormControl>
                  <RadioGroupItem value="perHour" />
                </FormControl>
                <FormLabel className='font-normal pl-2'>Цагт</FormLabel>
                <FormMessage />
              </FormItem>
            </div>
          </RadioGroup> */}
          <div className='relative'>
            <p className='text-2xl absolute left-3 top-[50%] translate-y-[-50%]'>₮</p>
            <Input placeholder='Багадаа' type="number" className='pl-8' onChange={(e) => {
              budgetType === "perDay" ? setPerDay(Number(e.target.value)) : setPerHour(Number(e.target.value))
            }} />
          </div>
          <div className='flex justify-end'>
            <Button type="button" variant="ghost" size="lg" onClick={previousStep}>Буцах</Button>
            <Button type='submit' className='' variant="secondary" size="lg">
              Үргэлжлүүлэх
            </Button>
          </div>
        </form>
      </Box>
      {/* tip1 for step1 */}
      <TIp4 />
    </div>
  );
}

export default Step4;
