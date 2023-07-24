import Footer from '@/components/footer/Footer';
import Header from '@/components/header';
import { H3 } from '@/components/ui/Typography/Heading';
import React from 'react';

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='h-screen flex w-full flex-col'>
      <Header/>
      <div className='flex-[1]'>
        <div className='bg-white mb-10'>
          <div className='max-w-[1000px] mx-auto py-10 px-4'>
            <H3>Тохиргоо</H3>
            <p className='text-gray-600'>Бүртгэлийнхээ тохиргоог удирдана уу</p>
          </div>
        </div>
        <div className='max-w-[1000px] mx-auto px-4 pb-10 h-full w-full'>
          {children}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default layout;
