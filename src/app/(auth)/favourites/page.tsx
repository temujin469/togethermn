import Header from '@/components/header';
import { H3 } from '@/components/ui/Typography/Heading';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import FavouriteUsers from './components/FavouriteUsers';
import Footer from '@/components/footer/Footer';

function page() {
  return (
    <div className='min-h-[calc(100vh-75px)]'>
      <Header />
      <div className='bg-white mb-10'>
        <div className='max-w-[1000px] mx-auto py-10 px-4 flex justify-between items-center'>
          <div>
            <H3>Миний дуртхай</H3>
            <p className='text-gray-600'>together.mn дээр дагаж буй мэргэжилтнээ удирдаж, захиалаарай.</p>
          </div>
          <Link href="/search/talent" className='hidden sm:block'>
            <Button >
              Мэргэжилтэн хайх
            </Button>
          </Link>
        </div>
      </div>
      <div className='max-w-[1000px] mx-auto px-4 pb-10'>
        <FavouriteUsers/>
      </div>
      <Footer/>
    </div>
  );
}

export default page;
