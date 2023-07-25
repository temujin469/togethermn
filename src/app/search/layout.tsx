import Footer from '@/components/footer/Footer';
import Header from '@/components/header';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-white'>
      <Header />
      <div className='relative'>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default layout;
