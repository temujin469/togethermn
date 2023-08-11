"use client"
import { Input } from '@/components/ui/input';
import React from 'react';
import Widget from '../Widget';
import useNews from '@/hooks/useNews';

function SearchNewsWidget() {
  const news = useNews()
  return (
    <Widget title='Хайх'>
      <Input placeholder='Хайх...' onChange={(e)=>news.setFilter({searchKey:e.target.value})}/>
    </Widget>
  );
}

export default SearchNewsWidget;
