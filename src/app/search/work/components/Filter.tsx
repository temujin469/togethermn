"use client"
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { RotateCcw, Search, SlidersHorizontal } from 'lucide-react';
import React, { useState } from 'react';
import FilterRow from '../../components/FilterRow';
import useJob from '@/hooks/useSearchJob';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useQuery } from '@tanstack/react-query';
import getAttributes from '@/utils/fetch/getAttributes';
import getProfessions from '@/utils/fetch/getProfessions';
import { Drawer } from '@mui/material';

function FilterWork() {
  const job = useJob();
  const [filter, setFilter] = useState<FilterJob>({ ...job.filter });
  const [openDrawer, setOpenDrawer] = useState(false)

  const { data: professions } = useQuery({ queryKey: ["professions"], queryFn: getProfessions })

  const { data: attributesData } = useQuery({
    queryKey: ["attributes"],
    queryFn: getAttributes
  })
  const attributes = attributesData?.attributes;

  const resetFilter = () => {
    setFilter({});
  }

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const handleSearch = () => {
    job.setFilter(filter)
    console.log(filter)
    setOpenDrawer(false)
  }

  const filterRow = (
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
  )

  return (
    <div className='mb-5 md:mb-0'>
      <div className='md:hidden text-right'>
        <Button onClick={toggleDrawer}>Шүүлтүүр
          <SlidersHorizontal size={16} className='ml-2'/>
        </Button>
        <Drawer
          anchor="bottom"
          open={openDrawer}
          PaperProps={{
            sx:{
              backgroundColor:"transparent",
              boxShadow:"none"
            }
          }}
          onClose={toggleDrawer}
        >
          <div className='p-4 h-[calc(100vh-180px)] relative bg-white rounded-t-2xl'>
            {filterRow}
            <div className='flex gap-3 p-4 absolute bottom-0 left-0 right-0'>
              <Button className='flex-[1] text-gray-700' onClick={resetFilter}>
                дахин тохируулах
              </Button>
              <Button className='gap-2 flex-[1]' variant="secondary" onClick={handleSearch}>
                Хайх <Search size={20} />
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
      <div className='hidden md:block'>
        <div className='justify-end flex'>
          <Button className='gap-2 text-gray-600' onClick={resetFilter}>
            дахин тохируулах
            <RotateCcw size={20} />
          </Button>
        
        </div>
        {filterRow}
        <Button className='w-full gap-2 hidden md:flex' variant="secondary" onClick={handleSearch}>
          Хайх <Search size={20} />
        </Button>
        </div>
    </div>
  );
}

export default FilterWork;
