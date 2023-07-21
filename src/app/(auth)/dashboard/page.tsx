import { H3 } from '@/components/ui/Typography/Heading';
import React from 'react';
import MyJobs from './components/MyJobs';
import Header from '@/components/header';

function page() {
  return (
    <div className='mt-[75px]'>
      <Header/>
      <div className='max-w-[1000px] px-4 mx-auto'>
        <H3 className='py-10'>Хяналтын самбар</H3>
        <MyJobs />
      </div>
    </div>
  );
}

export default page;
