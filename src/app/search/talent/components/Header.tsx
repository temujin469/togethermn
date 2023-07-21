"use client"
import useSearchTalent from '@/hooks/useTalentSearch';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';


function FilterHeader() {
  const { result } = useSearchTalent()
  const router = useRouter()
  return (
    <div className='h-[40px] z-10 flex justify-between px-4 shadow sticky w-full top-[70px] md:top-[75px] bg-white'>
      <div className='flex items-center gap-2 font-medium cursor-pointer' onClick={() => router.back()}><ArrowLeft />Буцах</div>
      <div className='font-medium flex items-center text-sm'>Илэрц: {result}</div>
    </div>
  );
}

export default FilterHeader;
