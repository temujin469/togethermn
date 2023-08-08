import React from 'react';
import 'react-quill/dist/quill.snow.css';



function layout({children}:{children:React.ReactNode}) {
  return (
    <div className='h-full'>
      {children}
    </div>
  );
}

export default layout;
