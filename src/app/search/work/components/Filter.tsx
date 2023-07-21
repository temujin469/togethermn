"use client"
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { RotateCcw, Search } from 'lucide-react';
import React, { useState } from 'react';
import FilterRow from '../../components/FilterRow';
import useJob from '@/hooks/useSearchJob';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useQuery } from '@tanstack/react-query';
import getAttributes from '@/utils/fetch/getAttributes';
import getProfessions from '@/utils/fetch/getProfessions';

function FilterWork() {
  const job = useJob();
  const [filter,setFilter] = useState<FilterJob>({...job.filter});

  const { data: professions } = useQuery({ queryKey: ["professions"], queryFn: getProfessions })

  const { data: attributesData } = useQuery({
    queryKey: ["attributes"],
    queryFn: getAttributes
  })
  const attributes = attributesData?.attributes;

  const resetFilter = ()=>{
    setFilter({});
  }

  const handleSearch = () => {
    job.setFilter(filter)
    console.log(filter)
  }

  const filterComponent= (
    <div className='mb-5 md:mb-0'>
      {/* for mobile */}
      <div className='flex px-4 fixed z-10 gap-4 bottom-0 bg-white w-full right-0 border-t h-[70px] items-center md:hidden'>
        <Button className='flex-[1] text-gray-700' onClick={resetFilter}>
          дахин тохируулах
        </Button>
        <Button className='gap-2 flex-[1]' variant="secondary" onClick={handleSearch}>
          Хайх <Search size={20} />
        </Button>
      </div>
      {/* for desktop */}
      <div className=' justify-end hidden md:flex'>
        <Button className='gap-2 text-gray-600' onClick={resetFilter}>
          дахин тохируулах
          <RotateCcw size={20} />
        </Button>
      </div>
      
      <div className='space-y-5 my-5'>
        <FilterRow label='Мэргэжил'>
          <Combobox value={filter.profession} onSelect={(val) => setFilter({ ...filter, profession: val })} placeholder='мэргэжлээр нь шүүх' values={
            professions?.map((pro) => ({ value: pro.attributes.name, label: pro.attributes.name })) as { value: string; label: string; }[]
          } className='w-full' />
        </FilterRow>
        <FilterRow label='Байршил'>
          <Combobox value={filter.location} onSelect={(val) => setFilter({ ...filter, location: val })} placeholder='байршлыг сонгох' values={attributes?.locations?.map((location) => ({ value: location.value, label: location.value })) as { value: string; label: string; }[]} className='w-full' />
        </FilterRow>
      </div>
      <Button className='w-full gap-2 hidden md:flex' variant="secondary" onClick={handleSearch}>
        Хайх <Search size={20} />
      </Button>
    </div>
  )


  return (
    <div>
      <Accordion type="single" collapsible className='md:hidden'>
        <AccordionItem className='border-b-0' value="item-1">
          <AccordionTrigger>Шүүлтүүрээр хайх</AccordionTrigger>
          <AccordionContent>
            {filterComponent}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className='hidden md:block'>{filterComponent}</div>
    </div>
  );
}

export default FilterWork;
