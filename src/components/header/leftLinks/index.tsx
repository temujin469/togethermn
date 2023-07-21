"use client"
import React from 'react';
import MegaLinks from './MegaLinks';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useRegisterModal from '@/hooks/useRegisterModal';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { useUser } from '@/hooks/useUser';


function LeftLinks() {
  const { isAuth } = useAuth();
  const {token,user} = useUser()
  const { onOpen, setAfterUrl } = useRegisterModal()
  const router = useRouter()

  const handleCLick = () => {
    if (isAuth) {
      return router.push("/post-a-job");
    }
    onOpen()
    setAfterUrl("/post-a-job");
  }
  // console.log(afterUrl)
  return (
    <div className='flex items-center gap-6'>
      <Link href="/" className="flex items-center pl-6">
        <Image src="/logo.png" alt='logo' className="object-contain" height={60} width={60} />
      </Link>
      <Button variant="secondary" className="md:text-[16px] text-[14px] px-3" onClick={handleCLick}>
        Ажил байршуулах
      </Button>
      <Link href="/search/work" className='hidden sm:flex  hover:bg-secondary transition-all text-[16px] font-semibold hover:text-white px-3 items-center h-[75px]' >
        Ажил хайх
      </Link>
      <MegaLinks/>
      {
        isAuth && (
          <>
            {/* <Link href="/dashboard" className='hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden md:flex lg:flex'>
              
            </Link> */}
            <Link href="/my-jobs" className='hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden md:flex lg:flex'>
              Миний ажилууд
            </Link>
          </>
        )
      }

      <Link href="#" className="hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden 2xl:flex">
        Ашиглах заавар
      </Link>
      {/* <Link href="#">
        <p className="hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden 2xl:flex">Мэдээ мэдээлэл</p>
      </Link> */}
    </div>
  );
}

export default LeftLinks;
