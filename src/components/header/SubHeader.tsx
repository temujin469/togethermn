import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type Props = {
  left?: React.ReactNode
  right?: React.ReactNode
  className?: string
  backBtn?: boolean
  backPath?:string
}

function SubHeader({ left, right, className, backBtn, backPath = "#" }: Props) {
  return (
    <div className={cn('pt-[40px]', className)}>
      <div className='h-[40px] z-10 flex justify-between px-4 shadow fixed w-full top-[70px] md:top-[75px] bg-white'>
        <div className='font-medium flex items-center text-sm'>

          {backBtn && <Link href={backPath} className='cursor-pointer pr-1'>
            <ArrowLeft className='text-gray-700' size={24} />
          </Link>}
          {
            left
          }</div>
        <div className='font-medium text-gray-700 flex items-center text-sm'>{right}</div>
      </div>
    </div>
  );
}

export default SubHeader;
