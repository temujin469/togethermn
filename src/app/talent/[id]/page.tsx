import React from 'react';
import LeftContent from './components/LeftContent';
import RightContent from './components/RightContent';
import SubHeader from '@/components/header/SubHeader';
import Container from '@/components/ui/container';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
  params: {
    id: number
  }
}

function page({ params }: Props) {

  return (
    <div className=''>
      <SubHeader
        left={<Link href="/search/talent" className='font-medium flex items-center gap-1 text-sm'><ArrowLeft size={20} />Буцах</Link>}
      />
      <Container className='max-w-[1300px] sm:py-5 px-0'>
        <div className='flex flex-col md:flex-row gap-5'>
          <div className='w-full md:w-[270px]'>
            <LeftContent profileId={params.id} />
          </div>
          <div className='flex-[1]'>
            <RightContent id={params.id} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default page;
