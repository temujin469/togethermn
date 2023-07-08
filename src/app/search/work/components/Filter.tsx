"use client"
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { professions } from '@/utils/data';
import { RotateCcw, Search } from 'lucide-react';
import React, { useState } from 'react';
import FilterRow from '../../components/FilterRow';



function FilterWork() {
  const [filter,setFilter] = useState<FilterJob>({});

  const resetFilter = ()=>{
    setFilter({});
  }

  const handleSearch = () => {
    console.log(filter)
  }
  return (
    <div className='mb-5 md:mb-0'>
      {/* < */}
      <Button variant="ghost" className='gap-2' onClick={resetFilter}>
        дахин тохируулах 
        <RotateCcw size={20}/>
      </Button>
      <div className='space-y-5 my-5'>
        <FilterRow label='Мэргэжил'>
          <Combobox onSelect={(val) => setFilter({ ...filter, profession: val })} placeholder='мэргэжлээр нь шүүх' values={
            professions.map((pro) => ({ value: pro.slug, label: pro.name }))
          } className='w-full' />
        </FilterRow>
        <FilterRow label='Байршил'>
          <Combobox onSelect={(val) => setFilter({ ...filter, location: val })} placeholder='байршлыг сонгох' values={professions.map((pro) => ({ value: pro.slug, label: pro.name }))} className='w-full' />
        </FilterRow>
      </div>
      <Button className='w-full gap-2' variant="secondary" onClick={handleSearch}>
        Хайх <Search size={20}/>
      </Button>
    </div>
  );
}

export default FilterWork;
