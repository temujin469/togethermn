import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode
  className?: string
}

function Box({ children, className }: Props) {
  return (
    <div className={cn("shadow py-10 min-h-screen max-w-[1000px] mx-auto px-4 md:p-10 bg-white w-full", className)}>
      {children}
    </div>
  );
}

export default Box;
