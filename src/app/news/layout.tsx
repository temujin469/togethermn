import Footer from '@/components/footer/Footer';
import Header from '@/components/header';
import { Metadata } from 'next';
import React from 'react';
import Container from '@/components/ui/container';
import SideMenu from './components/SideMenu';

export const metadata: Metadata = {
  title: 'Мэдээ мэдээлэл',
  // description: '...',
}




function layout({children}:{children:React.ReactNode}) {
  return (
    <div className="bg-[#f1f1f1]">
      <Header/>
      <div className='max-w-[1680px] px-[13px] md:px-[20px] 2xl:px-[30px] mx-auto'>
        <div className='min-h-[calc(100vh-75px)]'>
          <div className='md:grid grid-cols-12 py-10 md:gap-[20px] 2xl:gap-[30px]'>
            <div className='col-span-4 lg:col-span-3 xl:col-span-3'>
              <SideMenu/>
            </div>
            <div className='col-span-8 lg:col-span-9 xl:col-span-9'>
              {children}
            </div>
          </div>
        </div>
      </div>
      {/* <Scro */}
      <Footer/>
    </div>
  );
}

export default layout;
