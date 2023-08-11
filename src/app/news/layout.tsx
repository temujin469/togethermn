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
    <div>
      <Header/>
      <Container>
        <div className='min-h-[calc(100vh-75px)]'>
          <div className='lg:grid grid-cols-12 py-10 gap-10'>
            <div className='col-span-3 xl:col-span-4'>
              <SideMenu/>
            </div>
            <div className='col-span-9 xl:col-span-8'>
              {children}
            </div>
          </div>
        </div>
      </Container>
      <Footer/>
    </div>
  );
}

export default layout;
