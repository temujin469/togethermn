"use client"
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Instagram, Star, UserSquare2 } from 'lucide-react';
import { BarChartHorizontalBig } from 'lucide-react';
import { ImageList, ImageListItem } from '@mui/material';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];


function RightContent() {
  return (
    <div>
      <Tabs defaultValue="1" className="w-full">
        <TabsList className='w-full'>
          <TabsTrigger value="1" className='flex-[1] gap-1'><UserSquare2 size={18} /><p className='hidden md:block'>Account</p></TabsTrigger>
          <TabsTrigger value="2" className='flex-[1] gap-1'><Instagram size={18} /><p className='hidden md:block'>Account</p></TabsTrigger>
          <TabsTrigger value="3" className='flex-[1] gap-1'><Star size={18} /><p className='hidden md:block'>Account</p></TabsTrigger>
          <TabsTrigger value="4" className='flex-[1] gap-1'><BarChartHorizontalBig size={18} /><p className='hidden md:block'>Account</p></TabsTrigger>
          <TabsTrigger value="5" className='flex-[1] gap-1'><BarChartHorizontalBig size={18} /><p className='hidden md:block'>Account</p></TabsTrigger>
        </TabsList>
        <TabsContent value="1" className='shadow-md rounded-lg p-4'>
          <ImageList variant="masonry" cols={3} gap={8}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </TabsContent>
        <TabsContent value="2" className='shadow-md rounded-lg p-4'>Change your password here.</TabsContent>
        <TabsContent value="3" className='shadow-md rounded-lg p-4'>Make changes to your account here.</TabsContent>
        <TabsContent value="4" className='shadow-md rounded-lg p-4'>Change your password here.</TabsContent>
        <TabsContent value="5" className='shadow-md rounded-lg p-4'>Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

export default RightContent;
