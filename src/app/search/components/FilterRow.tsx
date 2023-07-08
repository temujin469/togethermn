import React from 'react';

const FilterRow = ({ children, label }: { children: React.ReactNode, label: string }) => {
  return (
    <div className='grid grid-cols-8 items-center'>
      <p className='whitespace-nowrap font-semibold col-span-3'>{label}</p>
      <div className='col-span-5'>
        {children}
      </div>
    </div>
  )
}
export default FilterRow;
