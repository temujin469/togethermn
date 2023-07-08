"use client"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Heart, Menu, User } from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import SidebarMenu from '../SidebarMenu';
import useRegisterModal from '@/hooks/useRegisterModal';
import UserMenu from './UserMenu';

function RightLinks() {
  const { onOpen } = useRegisterModal();

  const isAuth = false

  return (
    <ul className="flex h-[70px] md:h-[75px] items-center gap-5"
      data-aos="fade-left"
    >
      <li className="md:hidden mr-4">
        <button
          className="clrCrad rounded-[20px] flex items-center justify-center w-[40px] h-[40px] text-white border-none"
        >
          <Sheet>
            <SheetTrigger><Menu /> </SheetTrigger>
            <SheetContent>
              <SidebarMenu />
            </SheetContent>
          </Sheet>
        </button>
      </li>
      {
        isAuth ? (
          <li className='hidden md:flex items-center gap-6'>
            <Link href="/favourites">
              <Heart size={20} strokeWidth={2.5} className='hover:text-secondary' />
            </Link>
            <UserMenu />
          </li>
        ) : (
          <>
            <li className="hidden sm:flex">
              <Link href="#">
                <p className="hover:bg-color1 transition-all hover:text-white px-3 h-[100%] flex items-center">
                  <HelpCircle size={20} />
                </p>
              </Link>
            </li>
            <li className="md:flex hidden h-[100%]">
              <div className=" flex items-center h-[100%] px-7 bg-secondary  gap-1" onClick={onOpen}>
                <User size={25} strokeWidth={2} />
                <p className="m-0 text-[16px] font-semibold">Бүртгүүлэх</p>
              </div>
            </li>
          </>
        )
      }

    </ul>
  );
}

export default RightLinks
