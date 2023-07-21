import Header from '@/components/header';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header/>
      {children}
    </div>
  );
}

export default layout;
