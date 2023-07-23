"use client"
import React, { useCallback, useRef } from 'react';
// import Swiper core and required modules
import { Navigation, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import getHomePageContents from '@/utils/fetch/getHomePageContents';
import Container from '../ui/container';
import { ChevronRight, ChevronLeft } from 'lucide-react'

function Carousel() {
  const { data } = useQuery({ queryKey: ["home-page"], queryFn: getHomePageContents })
  const navigationPrevRef = React.useRef(null)
  const navigationNextRef = React.useRef(null)
  return (
    <div className='max-w-[2300px] mx-auto lg:p-5'>

      <Swiper
        // install Swiper modules
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper:any) => {
          swiper.navigation.nextEl = navigationNextRef.current;
          swiper.navigation.prevEl = navigationPrevRef.current;
        }}
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={0}
        // navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className='w-full lg:rounded-lg relative'
      >
        {
          data?.attributes.banner_images.data.map(image => (
            <SwiperSlide className='w-full relative bg-primary' key={image.id}>
              <img src={image.attributes.url} alt='banner' className=' rounded-lg object-cover w-full' />
            </SwiperSlide>
          ))
        }
        <div className='absolute top-[50%] translate-y-[-50%] z-10 w-full flex justify-between left-0 right-0'>
          <button ref={navigationPrevRef} className='text-yellow-500 cursor-pointer'><ChevronLeft size={30} /></button>
          <button ref={navigationNextRef} className='text-yellow-500 cursor-pointer'><ChevronRight size={30} /></button>
        </div>
      </Swiper>
    </div>
  );
}

export default Carousel;
