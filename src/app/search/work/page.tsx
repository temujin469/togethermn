import React from 'react';
import FilterWork from './components/Filter';
import Container from '@/components/ui/container';
import FilteredWorks from './components/FilteredJob';
import SubHeader from '@/components/header/SubHeader';

function SearchJob() {
  return (
    <div>
      <SubHeader
        left={"Ажил олох"}
        right={"үр дүн 8"}
      />
      <Container className='md:px-10 xl:px-16 my-5'>
        <div className='md:grid grid-cols-12 gap-10 relative'>
          <div className='col-span-5 xl:col-span-4 md:sticky top-[115px] md:h-[calc(100vh-115px)]'>
            <FilterWork />
          </div>
          <div className='xl:col-span-8 col-span-7'>
            <FilteredWorks />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default SearchJob;
