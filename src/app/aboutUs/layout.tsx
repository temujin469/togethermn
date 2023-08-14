import Footer from '@/components/footer/Footer';
import Header from '@/components/header';
import React from 'react';

function layout({children}:any) {
  return (
    <div className='bg-white'>
      <Header />
      <div className='max-w-[900px] mx-auto py-24'>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default layout;
