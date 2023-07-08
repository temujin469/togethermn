import Link from 'next/link';
import React from 'react';

function Header({title}:{title:string}) {
  return (
    <div className='flex items-center h-[75px] bg-white border-b'>
      <div className="flex items-center px-4 md:px-6 border-r">
        <Link href="/">
          <img src="/logo.png" className="h-[55px] object-contain" />
        </Link>
      </div>
      <p className='text-lg font-medium capitalize text-gray-700 px-4 md:px-6'>{title}</p>
    </div>
  );
}

export default Header;
