import Header from '@/components/header';
import { H3 } from '@/components/ui/Typography/Heading';
import React from 'react';

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='min-h-[calc(100vh-75px)]'>
      <Header/>
      <div className='bg-white mb-10'>
        <div className='max-w-[1000px] mx-auto py-10 px-4'>
          <H3>Тохиргоо</H3>
          <p className='text-gray-600'>Бүртгэлийнхээ тохиргоог удирдана уу</p>
        </div>
      </div>
      <div className='max-w-[1000px] mx-auto px-4 pb-10'>
        {children}
      </div>
    </div>
  );
}

export default layout;
