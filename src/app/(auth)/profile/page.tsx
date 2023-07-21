import React from 'react';
import LeftContent from './components/LeftContent';
import RightContent from './components/RightContent';
import SubHeader from '@/components/header/SubHeader';
import Container from '@/components/ui/container';
import { ArrowLeft } from 'lucide-react';

function Profile() {

  return (
    <div className=''>
      <SubHeader
        left={<div className='font-medium flex items-center gap-1 text-sm'><ArrowLeft size={20} />Профайл</div>}
      />
        <Container className='max-w-[1300px] sm:py-5 px-0'>
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

export default Profile;
