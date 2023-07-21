import React from 'react';

type Props = {
  left?:React.ReactNode
  right?:React.ReactNode
}

function SubHeader({left,right}:Props) {
  return (
    <div className='pt-[40px]'>
      <div className='h-[40px] z-10 flex justify-between px-4 shadow fixed w-full top-[70px] md:top-[75px] bg-white'>
        <div className='font-medium flex items-center text-sm'>{left}</div>
        <div className='font-medium flex items-center text-sm'>{right}</div>
      </div>
    </div>
  );
}

export default SubHeader;
