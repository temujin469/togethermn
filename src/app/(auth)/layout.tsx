import React from 'react';
import 'react-quill/dist/quill.snow.css';

function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='bg-gray-100 min-h-[calc(100vh-115px)]'>
      {children}
    </div>
  );
}

export default layout;
