import { H4 } from '@/components/ui/Typography/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Show from '@/components/ui/show';
import { Toggle } from '@/components/ui/toggle';
import { Heart } from 'lucide-react';
import { BadgeCheck, Instagram, MapPin, UserCircle2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

function LeftContent() {
  return (
    <div>
      <div className='shadow-md rounded-lg mb-5'>
        <div className='w-full h-[300px] relative'>
          <Image src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" fill alt='profile' className='object-cover rounded-t-lg' />
          <Toggle className='absolute top-4 right-4'>
            <Heart size={18} className=' text-white' />
          </Toggle>
        </div>
        <div className='p-4'>
          <H4 className='mb-4'>Victoria, Australia</H4>
          <Show isShow>
            <div className='flex text-sm items-center font-medium gap-1'><BadgeCheck size={13} color='green' />Verified</div>
          </Show>
          <Show isShow>
            <div className='flex text-sm items-center font-medium gap-1'><MapPin size={13} />Victoria, Australia</div>
          </Show>
          <Show isShow>
            <div className='flex text-sm items-center font-medium gap-1'><UserCircle2 size={13} />Victoria, Australia</div>
          </Show>
          <Show isShow>
            <div className='flex text-sm items-center font-medium gap-1'><Instagram size={13} />Victoria, Australia</div>
          </Show>
        </div>
        <div className='border-t p-4 flex justify-center'>
          <Button variant="secondary" className='w-full'>Ажилд урьж байна</Button>
        </div>
      </div>
      <div className='bg-gray-100 rounded-lg p-4'>
        <ul>
          <li className='font-medium mb-2'>Yeimy Lorena C Rates</li>
          <li className='font-medium mb-2'>Hair & Makeup Artist</li>
          <li className='font-medium mb-2'>$100 per hour</li>
          <li className='font-medium mb-2'>$700 per day</li>
          <Separator/>
          <li className='font-medium mb-2'>Hair & Makeup Artist</li>
          <li className='font-medium mb-2'>$100 per hour</li>
          <li className='font-medium mb-2'>$700 per day</li>
          <Separator />
          <li className='font-medium mb-2'>Hair & Makeup Artist</li>
          <li className='font-medium mb-2'>$100 per hour</li>
          <li className='font-medium mb-2'>$700 per day</li>
        </ul>
      </div>
    </div>
  );
}

export default LeftContent;
