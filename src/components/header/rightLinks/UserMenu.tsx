"use client"
import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/useUser';
import useCreateProfileModal from '@/hooks/useCreateProfileModal';

function UserMenu({ user }: { user?: User }) {
  const { logout } = useUser();
  const { onOpen } = useCreateProfileModal()

  // console.log(user?.isCreatedProfile);

  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className='hover:bg-secondary/90 bg-secondary w-[175px]  px-7 h-[75px] rounded-none'>
            <p className="text-[16px] w-[180px] overflow-hidden text-ellipsis font-semibold">{user?.username}</p>
            <div>
              <ChevronDown size={20} strokeWidth={3} />
            </div>
          </MenubarTrigger>
          <MenubarContent className='rounded-none text-white bg-primary p-0 border-none absolute w-[275px] left-[-100px] top-[-8px] data-[side=bottom]:slide-in-from-top-0'>
            {
              user?.profileType === "talent" && (
                <MenubarItem className='hover:bg-transparent focus:bg-none p-4 rounded-none'>
                  {
                    user?.isCreatedProfile ? (
                      <Link href="/profile" className='font-medium text-[16px]'>Профайл</Link>
                    ) : (
                      <div onClick={onOpen} className='font-medium text-[16px]'>Профайл</div>
                    )
                  }
                </MenubarItem>
              )
            }
            <MenubarItem className='hover:bg-transparent focus:bg-none p-4 rounded-none'>
              <Link href="/favourites" className='font-medium text-[16px]'>Миний дуртай</Link>
            </MenubarItem>
            {
              user?.profileType === "talent" ? (

                <MenubarItem className='hover:bg-transparent focus:bg-none p-4 rounded-none'>
                  <Link href="/my-jobs" className='font-medium text-[16px]'>Миний ажилууд</Link>
                </MenubarItem>
              ) : user?.profileType === "employer" ? (
                <MenubarItem className='hover:bg-transparent focus:bg-none p-4 rounded-none'>
                  <Link href="/dashboard" className='font-medium text-[16px]'>Миний ажилууд</Link>
                </MenubarItem>
              ) : null
            }
            <MenubarItem className='hover:bg-transparent focus:bg-none p-4 rounded-none'>
              <Link href="/messages" className='font-medium text-[16px]'>Зурвас</Link>
            </MenubarItem>
            <MenubarItem className='hover:bg-transparent focus:bg-none p-4 rounded-none'>
              <Link href="/account" className='font-medium text-[16px]'>Тохиргоо</Link>
            </MenubarItem>
            <MenubarItem className='hover:bg-transparent focus:bg-none p-4 rounded-none'>
              <Link href="/reviews" className='font-medium text-[16px]'>Санал шүүмж</Link>
            </MenubarItem>
            <MenubarItem className='hover:bg-transparent focus:bg-none p-4 rounded-none'>
              <p className='font-medium text-[16px]' onClick={logout}>Гарах</p>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default UserMenu;
