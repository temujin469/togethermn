"use client"
import React from 'react'
import { H2 } from '../ui/Typography/Heading';
import Link from 'next/link';
import { Button } from '../ui/button';
import Container from '../ui/container';
import { useQuery } from '@tanstack/react-query';
import getHomePageContents from '@/utils/fetch/getHomePageContents';


const Experience = () => {
  const { data } = useQuery({ queryKey: ["home-page"], queryFn: getHomePageContents })
  return (
    <Container>
    <section className='mb-16 md:mt-16 lg:mb-24 mt-4'>
      <div className='xl:container mx-auto'>
        <div className='flex flex-col md:space-x-10 min-h-[480px] lg:space-x-20 md:flex-row'>
          {/* <div className='flex-1 xxl:min-h-[580px] md:pt-[100px] pt-0 lg:pt-0 justify-between xxl:justify-start  flex space-x-4 items-center lg:space-x-12'>
            <div
              className='self-start'
              data-aos='fade-down'
              data-aos-offset='0'
            >
              <img src='/images/exp-img1.png' alt='' data-aos='fade-down' className='w-auto' />
            </div>
            <div className='self-end' data-aos='fade-up'>
              <img src='/images/exp-img2.png' alt='' className='w-auto' />
            </div>
          </div> */}

            <div className='flex-1 lg:h-[600px] '>
              <img src={data?.attributes.section1_image.data.attributes.url} className='h-full rounded-tr-3xl rounded-md '/>
          </div>
          {/* text */}
          <div
            className='flex-1 flex flex-col items-start justify-center m-0 mt-6 lg:mt-0'
            data-aos='fade-left'
          >
            <H2>Та ажил хайж байна уу?</H2>
            <p className='font-secondary lg:text-lg mb-6'>
              Тэгвэл мэргэжилээрэй ажилд орох хүсэлт гарган үнэ хөлсөө тохируулаад Vivid -ээр дамжуулан шууд цалингаа аваарай.
              Хялбар байгаа биз ?
            </p>
            <Link href="#">
              <Button variant="secondary" size="lg">
                Ажил хайх
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
    </Container>
  );
};

export default Experience;