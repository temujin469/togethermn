"use client"
import { talents } from '@/utils/data';
import React from 'react';
import Pagination from '@mui/material/Pagination';
import Link from 'next/link';

const TalentCard = ({ talent }: { talent: Talent }) => (
  <Link href="/talent/1">
    <div className='w-full max-w-[360px] rounded-lg overflow-hidden shadow hover:shadow-lg cursor-pointer'>
      <div className='h-[170px] md:h-[220px] lg:h-[200px] xl:h-[240px] w-full'>
        <img src={talent.profileImg} alt={talent.name} className="h-full w-full object-cover" />
      </div>
      <div className='p-4 lg:p-5'>
        <h4 className='text-lg font-semibold'>{talent.name}</h4>
        {/* <div><Rate disabled defaultValue={user.rate} className="" /></div> */}
        <div className='flex gap-1 items-center'><p>{talent.location}</p></div>
        <div className='flex gap-1 items-center'><p>{talent.followers}</p></div>
      </div>
    </div>
  </Link>
)

function FilteredTalents() {


  return (
    <div className='shadow p-5'>
    <div className='grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5'>
      {
        talents?.map((talent) => (
          <TalentCard talent={talent} />
        ))
      }
    </div>
      <div className='flex justify-center mt-10 mb-5'>
        <Pagination count={5} variant="outlined" shape="rounded" size="medium"  />
    </div>
    </div>
  );
}

export default FilteredTalents;
