import React from 'react';
import FilterTalent from './components/Filter';
import Container from '@/components/ui/container';
import FilteredTalents from './components/FilteredTalents';
import FilterHeader from './components/Header';

async function SearchTalent() {
  return (
    <div>
      <FilterHeader/>
      <Container className='md:px-10 xl:px-16 my-5 max-w-[1600px]'>
        <div className='md:grid grid-cols-12 gap-10 relative'>
          <div className='col-span-5 xl:col-span-4  md:sticky top-[135px] md:h-[calc(100vh-115px)]'>
            <FilterTalent  />
          </div>
          <div className='xl:col-span-8 col-span-7'>
            <FilteredTalents />
          </div>
        </div>
      </Container>
    </div>

  );
}

export default SearchTalent;
