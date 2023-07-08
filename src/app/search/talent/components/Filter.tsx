"use client"
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import Select from '@/components/ui/select';
import { professions } from '@/utils/data';
import { RotateCcw, Search } from 'lucide-react';
import React, { useState } from 'react';
import FilterRow from '../../components/FilterRow';


function FilterTalent() {
  const [filter, setFilter] = useState<FilterTalent>({});

  const resetFilter = () => {
    setFilter({});
    window.location.reload();
  }


  const handleSearch = () => {
    console.log(filter)
  }
  
  return (
    <div className='md:mr-5 mb-5 md:mb-0'>
      {/* < */}
      <Button variant="ghost" className='gap-2' onClick={resetFilter}>
        дахин тохируулах
        <RotateCcw size={20} />
      </Button>
      <div className='space-y-5 my-5'>
        <FilterRow label='Түлхүүр үг'>
          <Input value={filter.searchKey} onChange={(e)=>setFilter({...filter,searchKey:e.target.value})} placeholder='Хайх' className='placeholder:text-gray-400 placeholder:font-semibold font-semibold' />
        </FilterRow>
        <FilterRow label='Мэргэжил'>
          <Select onChange={(val) => setFilter({ ...filter, profession: val })} placeholder='мэргэжлээр нь шүүх' values={
            professions.map((pro) => ({ value: pro.slug, label: pro.name }))
          } />

        </FilterRow>
        <FilterRow label='Хүйс'>
          <Select onChange={(val) => setFilter({ ...filter, gender:val })} placeholder='Хүйс' values={
            [{
              value: 'эрэгтэй',
              label: 'эрэгтэй'
            },
            {
              value: 'эмэгтэй',
              label: 'эмэгтэй'
            }
            ]
          } className='w-full' />
        </FilterRow>
        <FilterRow label='Нас'>
          <div className='flex w-full gap-5'>
            <Select onChange={(val) => setFilter({ ...filter, minAge: Number(val) })} placeholder='бүгд' values={
              Array(100).fill(null).map((_, i) => (
                {
                  value: i.toString(),
                  label: i.toString()
                }
              ))
            } className='flex-[1]' />
            <Select onChange={(val) => setFilter({ ...filter, maxAge: Number(val) })} placeholder='бүгд' values={
              Array(100).fill(null).map((_, i) => (
                {
                  value: i.toString(),
                  label: i.toString()
                }
              ))
            } className='flex-[1]' />
          </div>
        </FilterRow>
        <FilterRow label='Платформ'>
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
        </FilterRow>
        <FilterRow label='Хот'>
          <Combobox onSelect={(val) => setFilter({ ...filter, city: val })} placeholder='Хот' values={
            professions.map((pro) => ({ value: pro.slug, label: pro.name }))
          } className='w-full' />
        </FilterRow>
        <FilterRow label='Аймаг'>
          <Combobox onSelect={(val) => setFilter({ ...filter, state: val })} placeholder='Аймаг' values={
            professions.map((pro) => ({ value: pro.slug, label: pro.name }))
          } className='w-full' />
        </FilterRow>
        <FilterRow label='Үсний өнгө'>
          <Select onChange={(val) => setFilter({ ...filter, hairColor: val })} placeholder='бүгд' values={
            [{
              value: 'Хар',
              label: 'Хар',
            }, {
              value: 'Бор',
              label: 'Бор',
            },
            {
              value: 'Улаан',
              label: 'Улаан',
            },
            {
              value: 'Шаргал',
              label: 'Шаргал',
            }
            ]
          } className='flex-[1]' />
        </FilterRow>
        <FilterRow label='Өндөр'>
          <div className='flex w-full gap-5'>
            <Select onChange={(val) => setFilter({ ...filter, minHeight: Number(val) })} placeholder='бүгд' values={
              Array(101).fill(null).map((_, i) => (
                {
                  value: `${(i + 120)}`,
                  label: `${(i + 120)}cm`
                }
              ))
            } className='flex-[1]' />
            <Select onChange={(val) => setFilter({ ...filter, maxHeight: Number(val) })} placeholder='бүгд' values={
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
          <Select onChange={(val) => setFilter({ ...filter, bodyType: val })} placeholder='бүгд' values={
            [
              {
                value: 'туранхай',
                label: 'туранхай',
              }, {
                value: 'булчинлаг',
                label: 'булчинлаг',
              },
              {
                value: 'тарган',
                label: 'тарган',
              },
              {
                value: 'дундаж',
                label: 'дундаж',
              }
            ]
          } className='flex-[1]' />
        </FilterRow>
      </div>
      <Button className='w-full gap-2' variant="secondary" onClick={handleSearch}>
        Хайх <Search size={20} />
      </Button>
    </div>
  );
}

export default FilterTalent;
