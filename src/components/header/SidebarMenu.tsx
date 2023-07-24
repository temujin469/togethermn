"use client"
import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { Button } from '../ui/button';
import useRegisterModal from '@/hooks/useRegisterModal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Separator } from '../ui/separator';
import { useRouter } from 'next/navigation';
import useSearchTalent from '@/hooks/useTalentSearch';
import { useUser } from '@/hooks/useUser';
import { useQuery } from '@tanstack/react-query';
import getProfessions from '@/utils/fetch/getProfessions';
import useCreateProfileModal from '@/hooks/useCreateProfileModal';

const SidebarMenu = () => {
  const { data: professions } = useQuery({ queryKey: ["professions"], queryFn: getProfessions })
  
  const { onOpen } = useRegisterModal();
  const createProfileModal = useCreateProfileModal()
  const {logout ,user} = useUser();

  const router = useRouter();
  const { setFilter } = useSearchTalent()
  const handleClick = (profession:string) => {
    setFilter({ profession})
    router.push('/search/talent')
    router.refresh()
  }


  return (
    <div className='py-5'>
      <div className='mt-2'>
        <Accordion type="single" collapsible className='w-full'>
          <AccordionItem value="item-2">
            <AccordionTrigger>Мэргэжилтэн олох</AccordionTrigger>
            <AccordionContent>
              {
                professions?.map(pro => (
                    <div onClick={()=>handleClick(pro.attributes.name)} key={pro.id} className='p-1 py-2 block'>
                      {pro.attributes.name}
                    </div>
                ))
              }
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className='mt-5 flex flex-col gap-5'>
        <Link href="/search/work" className='font-medium text-[16px]'>Ажил олох</Link>
        <Separator/>
        {
          user ? (
            <>
              <Link href="/my-jobs" className='font-medium text-[16px]'>Миний ажилууд</Link>
              <Link href="/favourites" className='font-medium text-[16px]'>Миний дуртай</Link>
              <Link href="/account" className='font-medium text-[16px]'>Бүртгэлийн тохиргоо</Link>
              {
                user?.profileType === "talent" && (
                      user?.isCreatedProfile ? (
                        <Link href="/profile" className='font-medium text-[16px]'>Профайл</Link>
                      ) : (
                        <div onClick={createProfileModal.onOpen} className='font-medium text-[16px]'>Профайл</div>
                      )
                )
              }
              <Link href="/reviews" className='font-medium text-[16px]'>Тойм</Link>
              <p className='font-medium text-[16px]' onClick={logout}>Гарах</p></>
          ) : (
            <Button variant="secondary" size="lg" className='w-full' onClick={onOpen}>
              <User size={20} />
              <p className="m-0">Бүртгүүлэх</p>
            </Button>
          )
        }
      </div>
    </div>
  );
};

export default SidebarMenu;