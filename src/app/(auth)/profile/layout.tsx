import Header from '@/components/header';
import React from 'react';

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='min-h-[calc(100vh-115px)]'>
      <Header/>
        {children}
    </div>
  );
}

export default layout;
