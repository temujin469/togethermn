import React from 'react';
import Box from '../Box';
import { Lightbulb } from 'lucide-react';
import { Label } from '@/components/ui/label';
import TipText from '../TipText';

const TipTitle = ({children}:{children:string})=>{
  return(
    <div className='mb-2'>
      <Label >{children}</Label>
    </div>
  )
}

function Tip1() {
  return (
    <div className='lg:w-[400px] space-y-5'>
      <Box className='md:p-5'>
        <div className='flex items-center justify-between mb-3'>
          <h1 className='font-semibold text-lg'>Зөвлөмж</h1>
          <div className='bg-yellow-400 p-2 rounded-full'>
            <Lightbulb />
          </div>
        </div>
        <TipTitle>Юу ажилладаг вэ?</TipTitle>
        <TipText type='correct'>
          Тодорхой үг хэллэг, таны гарчиг нь авъяас хүний ​​хамгийн түрүүнд хардаг ажлын нэр байх болно!
        </TipText>
        <TipText type='correct'>
          Таны ажилд ямар авьяас чадвар бий болох талаар тодорхой хэлэх
        </TipText>
        <TipTitle>Юу ажиллахгүй байна вэ?</TipTitle>
          <TipText type='wrong'>
            Ерөнхий үг хэллэг нь авъяас чадварыг юунд өргөдөл гаргаж байгаагаа эргэлзэхэд хүргэдэг
          </TipText>
        <TipTitle>Жишээ</TipTitle>
        <TipText>
          “Аялал жуулчлалын аян” телевизийн сурталчилгааны зураг авалтад хос шаардлагатай”
        </TipText>
      </Box>
    </div>
  );
}

export default Tip1;
