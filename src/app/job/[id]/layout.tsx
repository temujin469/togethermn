import Footer from '@/components/footer/Footer';
import Header from '@/components/header';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  );
}

export default layout;
