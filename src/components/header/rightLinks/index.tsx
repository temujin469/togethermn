"use client"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Heart, Menu, User } from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import SidebarMenu from '../SidebarMenu';
import useRegisterModal from '@/hooks/useRegisterModal';
import UserMenu from './UserMenu';
import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import { myApi } from '@/utils/axios';
import QueryString from 'qs';


function RightLinks() {
  const { onOpen } = useRegisterModal();
  const {isLoading,token,user } = useUser();

  const meQuery = QueryString.stringify({
    fields: ["favourites", "id"],
    populate: {
      favourites: {
        fields: ["favourite"],
        populate: {
          favourite: {
            fields: ["id"]
          }
        }
      }
    },
  }, { encodeValuesOnly: true });

  const favourites = useQuery<any>({
    queryKey: ["me", token],
    queryFn: async () => {
      const res = await myApi.get(`/api/users/me?${meQuery}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      return res.data;
    }
  });

  const myFavourites = favourites?.data?.favourites;


  return (
    <div className="flex h-[70px] md:h-[75px] items-center gap-5"
      data-aos="fade-left"
    >
      <div className="md:hidden mr-4 flex items-center">
          <Sheet>
            <SheetTrigger><Menu /></SheetTrigger>
            <SheetContent>
              <SidebarMenu />
            </SheetContent>
          </Sheet>
      </div>
      {
        user ? (
          <div className='hidden md:flex items-center gap-6'>
            <Link href="/favourites" className='relative'>
              {
                Boolean(myFavourites?.length) && (
                  <div className='absolute top-[-9px] right-[-10px] bg-secondary w-5 h-5 flex items-center justify-center text-sm rounded-full'>{myFavourites.length}</div>
                )
              }
              <Heart size={20} strokeWidth={2.5} className='hover:text-secondary' />
            </Link>
            <UserMenu user={user} />
          </div>
        ) : (
          <>
            <div className="hidden sm:flex">
              <Link href="#">
                <p className="hover:bg-color1 transition-all hover:text-white px-3 h-[100%] flex items-center">
                  <HelpCircle size={20} />
                </p>
              </Link>
            </div>
            <div className="md:flex hidden h-[100%]">
              <div className=" flex items-center h-[100%] px-7 bg-secondary  gap-1" onClick={onOpen}>
                <User size={25} strokeWidth={2} />
                <p className="m-0 text-[16px] font-semibold">Бүртгүүлэх</p>
              </div>
            </div>
          </>
        )
      }

    </div>
  );
}

export default RightLinks
