import Footer from '@/components/footer/Footer';
import Header from '@/components/header';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex-[1]'>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default layout;
