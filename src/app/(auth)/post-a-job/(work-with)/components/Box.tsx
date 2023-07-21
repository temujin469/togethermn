import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children:React.ReactNode
  className?:string
}

function Box({children, className}:Props) {
  return (
    <div className={cn("shadow lg:rounded-lg mx-auto max-w-[900px] py-10 px-4 relative md:p-10 bg-white w-full",className)}>
      {children}
    </div>
  );
}

export default Box;
