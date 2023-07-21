import React from 'react';
import Box from '../Box';
import { Lightbulb } from 'lucide-react';
import TipText from '../TipText';

function BudgetTip() {
  return (
    <div className='lg:w-[400px] space-y-5'>
      <Box className='md:p-5'>
        <div className='flex items-center justify-between mb-3'>
          <h1 className='font-semibold text-lg'>Зөвлөмж</h1>
          <div className='bg-yellow-400 p-2 rounded-full'>
            <Lightbulb />
          </div>
        </div>
        <TipText type='consider'>

          Үүсгэсэн зураг эсвэл контентыг хаана ашиглахаа бодож үзээрэй. Энэ нь авъяас чадварыг төлөх ёстой ханшид нөлөөлдөг.
        </TipText>
      </Box>
    </div>
  );
}

export default BudgetTip;
