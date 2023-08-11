import { H4 } from '@/components/ui/Typography/Heading';
import React from 'react';

function Widget({children,title}:{children:React.ReactNode,title?:string}) {
  return (
    <div className='shadow p-4 md:p-7 rounded-lg bg-white w-full mb-5'>
      {title && <H4 className='uppercase mb-4'>{title}</H4>}
    {children}
    </div>
  );
}

export default Widget;
