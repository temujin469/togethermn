import React from 'react';
import CategoriesWidget from './widget/CategoriesWidget';
import SearchNewsWidget from './widget/SearchNewsWidget';

function SideMenu() {

  
  return (
    <div className='lg:h-[calc(100vh-75px)] w-full sticky top-[calc(75px+20px)]'>
      <SearchNewsWidget />
      <CategoriesWidget/>
    </div>
  );
}

export default SideMenu;
