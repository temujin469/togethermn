"use client"
import React from 'react';
import MegaLinks from './MegaLinks';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useRegisterModal from '@/hooks/useRegisterModal';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import usePostAJobModal from '@/hooks/usePostAJobModal';
import { useUser } from '@/hooks/useUser';


function LeftLinks() {
  const { isAuth, user } = useUser()
  // const {token,user} = useUser()
  const registerModal = useRegisterModal()
  const postAJobModal = usePostAJobModal()
  const { toast } = useToast()
  const router = useRouter()

  const protectedRoute = (route: string) => {
    if (isAuth && route === "/post-a-job") {
      return postAJobModal.onOpen()
    }
    if (isAuth) {
      return router.push(route)
    }
    toast({
      title: "Cистемд нэвтрэх шаардлагатай",
      variant: "default",
    });
    registerModal.onOpen()
    registerModal.setAfterUrl(route);
  }
  // console.log(afterUrl)
  return (
    <div className='flex items-center gap-6'>
      <Link href="/" className="flex items-center pl-6">
        <Image src="/logo.png" alt='logo' className="object-contain" height={60} width={60} />
      </Link>
      {
        user?.profileType === "employer" ? (
          <>
            <Button variant="secondary" className="md:text-[16px] whitespace-nowrap text-[14px] px-3" onClick={() => protectedRoute("/post-a-job")}>
              Ажил байршуулах
            </Button>
            <Link href="/search/work" className='hidden sm:flex  hover:bg-secondary transition-all text-[16px] font-semibold hover:text-white px-3 items-center h-[75px]' >
              Ажил хайх
            </Link>
          </>


        ) : user?.profileType === "talent" ? (

          <Link href="/search/work" >
            <Button variant="secondary" className="md:text-[16px] whitespace-nowrap text-[14px] px-3">
              Ажил хайх
            </Button>
          </Link>
        ) : null
      }


      <MegaLinks />
      <Link href="/news" className="hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden sm:flex">
        Мэдээ
      </Link>
      {
        isAuth ? (
          <>
            {
              user?.profileType === "talent" ? (
                <Link href="/my-jobs" className='hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden xl:flex'>
                  Миний ажлууд
                </Link>
              ) : user?.profileType === "employer" ? (
                <Link href="/dashboard" className='hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden  xl:flex'>
                  Миний ажлууд
                </Link>
              ) : null
            }
          </>
        ) : (
          <>
              <Link href="/aboutUs" className='hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden lg:flex'>
                Бидний тухай
              </Link>
              <Link href="/contactUs" className='hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden lg:flex'>
                Холбоо барих
              </Link>
          </>
        )
      }


      <a onClick={() => protectedRoute("/messages")} className='hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden 2xl:flex'>
        Зурвас
      </a>


      {/* <Link href="#">
        <p className="hover:bg-secondary h-[75px] font-semibold text-[16px] transition-all hover:text-white px-3 items-center hidden 2xl:flex">Мэдээ мэдээлэл</p>
      </Link> */}
    </div>
  );
}

export default LeftLinks;
