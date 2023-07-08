import React from 'react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ChevronDown } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

function UserMenu() {
  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger className='hover:bg-secondary/90 bg-secondary px-7 h-[75px] rounded-none'>
                <p className="text-[16px] font-semibold">Тэмүүжин</p>
            <ChevronDown size={20} strokeWidth={3} />
          </MenubarTrigger>
          <MenubarContent className='rounded-none text-white bg-primary p-0 border-none absolute w-[275px] left-[-100px] top-[-8px] data-[side=bottom]:slide-in-from-top-0'>
            <MenubarItem className='hover:bg-transparent focus:bg-none p-4 rounded-none'>
              <Link href="/favourites" className='font-medium text-[16px]'>Миний дуртай</Link>
            </MenubarItem>
            <MenubarItem className='hover:bg-transparent focus:bg-none p-4 rounded-none'>
              <Link href="/account" className='font-medium text-[16px]'>Бүртгэлийн тохиргоо</Link>
            </MenubarItem>
            <MenubarItem className='hover:bg-transparent focus:bg-none p-4 rounded-none'>
              <Link href="/reviews" className='font-medium text-[16px]'>Тойм</Link>
            </MenubarItem>
            <MenubarItem className='hover:bg-transparent focus:bg-none p-4 rounded-none'>
              <p className='font-medium text-[16px]'>Гарах</p>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default UserMenu;
