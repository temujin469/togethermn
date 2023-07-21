"use client"
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import Select from '@/components/ui/select';
import { RotateCcw, Search } from 'lucide-react';
import React, { useState } from 'react';
import FilterRow from '../../components/FilterRow';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import useSearchTalent from '@/hooks/useTalentSearch';
import { useQuery } from '@tanstack/react-query';
import getAttributes from '@/utils/fetch/getAttributes';
import getProfessions from '@/utils/fetch/getProfessions';


function FilterTalent() {
  const searchTalent = useSearchTalent()
  const [filter, setFilter] = useState<FilterTalent>({...searchTalent.filter});
  const {data:professions} = useQuery({queryKey:["professions"],queryFn:getProfessions})

  const resetFilter = () => {
    setFilter({});
  }

  const handleSearch = () => {
    console.log(filter)
    searchTalent.setFilter(filter)
  }

  const { data: attributesData } = useQuery({
    queryKey: ["attributes"],
    queryFn: getAttributes
  })
  const attributes = attributesData?.attributes;

  const filterComponent = (
    <div className='md:mr-5 mb-5 md:mb-0'>
      {/* for mobile */}
      <div className='flex px-4 fixed z-10 gap-4 bottom-0 bg-white w-full right-0 border-t h-[70px] items-center md:hidden'>
        <Button className='flex-[1] text-gray-700' onClick={resetFilter}>
          дахин тохируулах
        </Button>
        <Button className='gap-2 flex-[1]' variant="secondary" onClick={handleSearch}>
          Хайх <Search size={20} />
        </Button>
      </div>

      {/* for desktop*/}
      <div className='justify-end hidden md:flex'>
        <Button className='gap-2 text-gray-600' onClick={resetFilter}>
          дахин тохируулах
          <RotateCcw size={20} />
        </Button>
      </div>
      <div className='space-y-5 my-5'>
        <FilterRow label='Түлхүүр үг'>
          <Input value={filter?.searchKey} onChange={(e) => setFilter({ ...filter, searchKey: e.target.value })} placeholder='Хайх' className='placeholder:text-gray-400 placeholder:font-semibold font-semibold' />
        </FilterRow>
        <FilterRow label='Мэргэжил'>
          <Select defaultValue={filter?.profession} onChange={(val) => setFilter({ ...filter, profession: val })} placeholder='мэргэжлээр нь шүүх' values={
            professions?.map((pro) => ({ value: pro.attributes.name, label: pro.attributes.name })) as { value: string; label: string; }[]
          } />

        </FilterRow>
        <FilterRow label='Хүйс'>
          <Select defaultValue={filter.gender} onChange={(val) => setFilter({ ...filter, gender: val })} placeholder='Хүйс' values={attributes?.genders.map((gender)=>({label:gender.value,value:gender.value}))} className='w-full' />
        </FilterRow>
        <FilterRow label='Нас'>
          <div className='flex w-full gap-5'>
            <Select defaultValue={filter.minAge} onChange={(val) => setFilter({ ...filter, minAge: Number(val) })} placeholder='бүгд' values={
              Array(100).fill(null).map((_, i) => (
                {
                  value: i.toString(),
                  label: i.toString()
                }
              ))
            } className='flex-[1]' />
            <Select defaultValue={filter.maxAge} onChange={(val) => setFilter({ ...filter, maxAge: Number(val) })} placeholder='бүгд' values={
              Array(100).fill(null).map((_, i) => (
                {
                  value: i.toString(),
                  label: i.toString()
                }
              ))
            } className='flex-[1]' />
          </div>
        </FilterRow>
        {/* <FilterRow label='Платформ'>
          <Select onChange={(val) => setFilter({ ...filter, platform: val })} placeholder='бүгд' values={
            [{
              value: 'instagram',
              label: 'Instagram',
            }, {
              value: 'youtube',
              label: 'Youtube',
            },
            {
              value: 'tiktok',
              label: 'TikTok',
            }
            ]
          } className='flex-[1]' />
        </FilterRow> */}
        <FilterRow label='Байршил'>
          <Combobox onSelect={(val) => setFilter({ ...filter, location: val })} placeholder='Байршил' values={
            attributes?.locations?.map((location) => ({ value: location.value, label: location.value })) as any
          } className='w-full' />
        </FilterRow>
        <FilterRow label='Үсний өнгө'>
          <Select defaultValue={filter.hairColor} onChange={(val) => setFilter({ ...filter, hairColor: val })} placeholder='бүгд' values={attributes?.hairColors.map((color)=>({value:color.value,label:color.value}))}  className='flex-[1]' />
        </FilterRow>
        <FilterRow label='Өндөр'>
          <div className='flex w-full gap-5'>
            <Select defaultValue={filter.minHeight} onChange={(val) => setFilter({ ...filter, minHeight: Number(val) })} placeholder='бүгд' values={
              Array(101).fill(null).map((_, i) => (
                {
                  value: `${(i + 120)}`,
                  label: `${(i + 120)}cm`
                }
              ))
            } className='flex-[1]' />
            <Select defaultValue={filter.maxHeight} onChange={(val) => setFilter({ ...filter, maxHeight: Number(val) })} placeholder='бүгд' values={
              Array(101).fill(null).map((_, i) => (
                {
                  value: `${(i + 120)}`,
                  label: `${(i + 120)}cm`
                }
              ))
            } className='flex-[1]' />
          </div>
        </FilterRow>
        <FilterRow label='Биеийн хэлбэр'>
          <Select defaultValue={filter.bodyType} onChange={(val) => setFilter({ ...filter, bodyType: val })} placeholder='бүгд' values={
            attributes?.bodyTypes.map((type)=>({value:type.value,label:type.value}))
          } className='flex-[1]' />
        </FilterRow>
      </div>
      <Button className='w-full gap-2 hidden md:flex' variant="secondary" onClick={handleSearch}>
        Хайх <Search size={20} />
      </Button>
    </div>
  );


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

export default FilterTalent;
