
import React from 'react';
import LeftContent from './components/LeftContent';
import RightContent from './components/RightContent';
import SubHeader from '@/components/header/SubHeader';
import Container from '@/components/ui/container';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/header';

function page() {
  return (
    <div className='mt-[75px]'>
      <Header/>
      <SubHeader
        left={<Link href="/search/talent" className='font-medium flex items-center gap-1 text-sm'><ArrowLeft size={20} />Буцах</Link>}
      />
      <Container className='max-w-[1300px] my-5'>
        <div className='flex flex-col md:flex-row gap-5'>
          <div className='w-full md:w-[270px]'>
            <LeftContent />
          </div>
          <div className='flex-[1]'>
            <RightContent />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default page;
