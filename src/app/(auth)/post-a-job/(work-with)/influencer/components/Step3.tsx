"use client"

import { Button } from '@/components/ui/button';
import usePostJob from '@/hooks/usePostJob';
import React, { useState } from 'react';
import Box from '../../components/Box';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import BudgetTip from '../../components/tip/BudgetTip';

function Step3() {

  const { nextStep, previousStep, job, setJob } = usePostJob()

  const [budget, setBudget] = useState(job?.budget);
  const [additionalInfo, setAdditionalInfo] = useState(job?.influencer?.additionalInfo);


  const handleSubmit = () => {
    setJob({...job, influencer: {...job?.influencer,additionalInfo }, budget})
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
          <div className='relative'>
            {/* <p className='text-2xl absolute left-3 top-[50%] translate-y-[-50%]'>₮</p> */}
            <Input placeholder='Төсөв' value={budget} onChange={(e) => 
              setBudget(e.target.value)
            } />
          </div>
          <div>
            <div className='mb-4'>
              <Label>
                Нэмэлт мэдээлэл
              </Label>
            </div>
            <Textarea placeholder='Нэмэлт мэдээлэл' value={additionalInfo} onChange={(e) =>
              setAdditionalInfo(e.target.value)
            } />
          </div>
         
          <div className='flex justify-end gap-4 pt-10'>
            <Button type="button" variant="ghost" size="lg" onClick={previousStep}>Буцах</Button>
            <Button type='submit' className='' variant="secondary" size="lg">
              Үргэлжлүүлэх
            </Button>
          </div>
        </form>
      </Box>
      {/* tip1 for step1 */}
      <BudgetTip/>
    </div>
  );
}

export default Step3;
