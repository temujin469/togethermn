import { Check, CircleDot, X } from 'lucide-react';
import React from 'react';

type Props = {
  type?:"correct" | "wrong" | "consider"
  children:React.ReactNode
}

function TipText({type,children}:Props) {
  return (
    <div className='flex gap-2 mb-3'>
      <div>
        {
          type === "consider" ? <CircleDot size={15} strokeWidth={3} /> : type === "wrong" ? <X size={15} color='red' strokeWidth={3} /> : type === "correct" ? <Check size={15} strokeWidth={3} /> : null
        }
      </div>
      <p className='text-sm text-gray-500 font-normal'>{children}</p>
    </div>
  );
}

export default TipText;
