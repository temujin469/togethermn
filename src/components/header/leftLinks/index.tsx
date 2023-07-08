"use client"
import React from 'react';
import MegaLinks from './MegaLinks';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useRegisterModal from '@/hooks/useRegisterModal';
import { useRouter } from 'next/navigation';

function LeftLinks() {
  const isAuth = true
  const {onOpen,setAfterUrl,afterUrl} = useRegisterModal()
  const router =  useRouter()

  const handleCLick = () => {
    if (isAuth) {
      return router.push("/post-a-job")
    }
    onOpen()
    setAfterUrl("/post-a-job");
  }
  // console.log(afterUrl)
  return (
    <div className='flex items-center gap-6'>
      <Link href="/" className="flex items-center pl-6">
        <img src="/logo.png" className="h-[55px] object-contain" />
      </Link>
        <Button variant="secondary" className="text-[16px]" onClick={handleCLick}>
          Ажил байршуулах
        </Button>
      <MegaLinks />
      <Link href="#">
        <p className="hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden xl:flex">Ашиглах заавар</p>
      </Link>
      {/* <Link href="#">
        <p className="hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden 2xl:flex">Мэдээ мэдээлэл</p>
      </Link> */}
    </div>
  );
}

export default LeftLinks;
