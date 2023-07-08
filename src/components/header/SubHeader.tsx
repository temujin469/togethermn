import React from 'react';
import Container from '../ui/container';

type Props = {
  left?:React.ReactNode
  right?:React.ReactNode
}

function SubHeader({left,right}:Props) {
  return (
    <div className='h-[40px] z-10 shadow sticky w-full top-[70px] md:top-[75px] bg-white'>
      <Container className='flex h-full items-center justify-between'>
        <div className='font-medium flex items-center text-sm'>{left}</div>
        <div className='font-medium flex items-center text-sm'>{right}</div>
      </Container>
    </div>
  );
}

export default SubHeader;
