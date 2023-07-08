import Footer from '@/components/footer/Footer';
import Header from '@/components/header';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className='mt-[70px] md:mt-[75px] relative'>
        {children}
      </div>
      <Footer />
    </>
  );
}

export default layout;
