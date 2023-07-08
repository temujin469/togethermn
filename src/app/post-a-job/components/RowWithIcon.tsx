import React from 'react';

type Props = {
  icon:React.ReactNode,
  children:React.ReactNode
}

function RowWithIcon({icon, children}:Props) {
  return (
    <div className='flex items-center gap-2'>
      {icon}
      <div className='font-medium text-[17px]'>
        {children}
      </div>
    </div>
  );
}

export default RowWithIcon;
