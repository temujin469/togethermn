"use client"
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clapperboard,  Shirt, Star, UserSquare2 } from 'lucide-react';
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { myApi } from '@/utils/axios';
import Videos from './Videos';
import Reviews from './Reviews';
import Features from './Features';
import { GanttChartSquare } from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Skeleton } from '@/components/ui/skeleton';


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


function RightContent({ id }: { id: number }) {
  const md = useMediaQuery("(min-width:640px)")

  const { data, isLoading, isError } = useQuery<ProfileDetailResponse>({
    queryKey: ["profile","rightContent", id],
    queryFn: async () => {
      const res = await myApi.get(`/talents/${id}?populate=*`);
      return res.data;
    }
  });

  const profile = data?.data.attributes;
  console.log(profile)

  return (
    <div>
      <Tabs defaultValue="1" className="w-full h-full sm:shadow sm:rounded-md bg-white">
        <div className='p-2 sm:p-0 w-full left-0 right-0 sticky top-[70px] h-[56px] sm:h-auto z-[50] md:static bg-white shadow sm:rounded-t-md'>
          <TabsList className='w-full rounded-md sm:rounded-t-md sm:rounded-b-none p-2 sm:h-[50px]'>
            <TabsTrigger value="1" className='flex-[1] gap-1'><UserSquare2 size={18} /><p className='hidden md:block'>Нүүр</p></TabsTrigger>
            <TabsTrigger value="2" className='flex-[1] gap-1'><Shirt size={18} /><p className='hidden md:block'>Онцлог</p></TabsTrigger>
            <TabsTrigger value="3" className='flex-[1] gap-1'><Star size={18} /><p className='hidden md:block'>Санал шүүмж</p></TabsTrigger>
            <TabsTrigger value="4" className='flex-[1] gap-1'>
              <GanttChartSquare size={18} />
              <p className='hidden md:block'>Био</p>
            </TabsTrigger>
            <TabsTrigger value="5" className='flex-[1] gap-1'>
              <Clapperboard size={18} />
              <p className='hidden md:block'>Видео</p>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="1" className='rounded-lg p-4 min-h-[calc(100vh-105px)] md:min-h-full'>
        {
          !isLoading ? (
              <PhotoProvider>
                <ImageList variant="masonry" cols={md ? 3 : 1} gap={4}>
                  {profile?.photos?.data?.map(({ attributes, id }: any) => (
                    <PhotoView key={id} src={`${attributes.url}?w=248&fit=crop&auto=format`}>
                      <ImageListItem >
                        <img
                          src={`${attributes.url}?w=248&fit=crop&auto=format`}
                          srcSet={`${attributes.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                          alt={"sdsf"}
                          loading="lazy"
                          className='rounded-md border border-transparent cursor-pointer hover:border-secondary'
                        />
                      </ImageListItem>
                    </PhotoView>
                  )) as any}
                </ImageList>
              </PhotoProvider>
          ) : <Skeleton className='h-[200px]'/>
        }
        </TabsContent>
        <TabsContent value="2" className='rounded-lg p-4 min-h-[calc(100vh-105px)] md:min-h-full'>
          <Features id={id}/>
        </TabsContent>
        <TabsContent value="3" className='rounded-lg p-4 min-h-[calc(100vh-105px)] md:min-h-full'><Reviews userId={profile?.user.data.id} /></TabsContent>
        <TabsContent value="4" className='rounded-lg p-4 min-h-[calc(100vh-105px)] md:min-h-full'>
          <div>
            <p>{profile?.bio}</p>
          </div>
        </TabsContent>
        <TabsContent value="5" className='rounded-lg p-4 min-h-[calc(100vh-105px)] md:min-h-full'><Videos id={id}/></TabsContent>
      </Tabs>
    </div>
  );
}

export default RightContent;
