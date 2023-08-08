import { cn } from '@/lib/utils';
import React from 'react';

function Container({children,className}:{children:React.ReactNode,className?:string}) {
  // md: px - 16 xl: px - 10
  return (
    <div className={cn('px-3 sm:px-5 md:px-8 xl:px-16 2xl:px-[100px] max-w-[2300px] mx-auto',className)}>
      {children}
    </div>
  );
}

export default Container;
