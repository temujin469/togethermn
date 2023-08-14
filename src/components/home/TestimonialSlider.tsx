"use client"
import React from 'react';
// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import useGetHomeContent from '@/hooks/useGetHomeContent';
// import data

const TestimonialSlider = () => {

  const {data} = useGetHomeContent();
  const userComments = data?.attributes?.user_comments;
  return (
    <Swiper
      // breakpoints={{
      //   320: {
      //     slidesPerView: 1,
      //     spaceBetween: 18,
      //   },
      //   768: {
      //     slidesPerView: 2,
      //     spaceBetween: 20,
      //   },
      //   1200: {
      //     slidesPerView: 3,
      //     spaceBetween: 30,
      //   },
      // }}
      slidesPerView={1}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      autoplay={true}
      pagination={{ clickable: true }}
      navigation={true}
      className='lg:px-5 max-w-[800px]'
    >
      {userComments?.map((comment, index) => {
        // destructure slide
        return (
          <SwiperSlide
            className='flex justify-center md:px-20 px-2 sm:px-5 pb-10'
            key={index}
          >
            <div className='text-center mx-auto relative p-4 lg:p-6 h-[240px] shadow-lg'>
              <p className='text-xl lg:text-xl mb-5'>{comment.text}</p>
              <div>
                <p className='text-gray-500 text-center text-lg'>{comment.username}</p>
              </div>
            </div>
            
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default TestimonialSlider;