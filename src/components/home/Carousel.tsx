"use client"
import React from 'react';
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

function Carousel() {
  const { data } = useQuery({ queryKey: ["home-page"], queryFn: getHomePageContents })

  return (
    <div className='max-w-[2300px] mx-auto lg:p-5'>

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className='w-full lg:rounded-lg'
      >
        {
          data?.attributes.banner_images.data.map(image => (
            <SwiperSlide className='w-full relative bg-primary'>
              <img src={image.attributes.url} alt='banner' className=' rounded-lg object-cover w-full' />
            </SwiperSlide>
          ))
        }

      </Swiper>
    </div>
  );
}

export default Carousel;
