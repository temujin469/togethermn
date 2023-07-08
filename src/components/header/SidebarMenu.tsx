"use client"
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import Link from 'next/link';
import { Separator } from '../ui/separator';
import { ChevronDown, User } from 'lucide-react';
import { Button } from '../ui/button';
import useRegisterModal from '@/hooks/useRegisterModal';
import { professions } from '@/utils/data';



const SidebarMenu: React.FC = () => {

  const {onOpen} = useRegisterModal();

  return (
    <div className='py-5'>
      <Collapsible>
        <CollapsibleTrigger className='text-lg flex items-center justify-between w-full font-medium py-2'>Ажил олох <ChevronDown /></CollapsibleTrigger>
        <CollapsibleContent>
          <Separator />
          <div className='p-2 px-3'>
          {
            professions.map(pro => (
              <div className='p-1'>
                <Link href="/search/work" key={pro.slug}>
                  {pro.name}
                </Link>
              </div>

            ))
          }
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger className='text-lg flex items-center justify-between w-full font-medium py-2'>Мэргэжилтэн олох<ChevronDown /></CollapsibleTrigger>
        <CollapsibleContent>
          <Separator />

          <div className='p-2 px-3'>
            {
              professions.map(pro => (
                <div className='p-1'>
                  <Link href="/search/talent" key={pro.slug}>
                    {pro.name}
                  </Link>
                </div>

              ))
            }
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      <div className='mt-5'>
        <Button variant="secondary" size="lg" className='w-full' onClick={onOpen}>
          <User size={20} />
          <p className="m-0">Бүртгүүлэх</p>
        </Button>
      </div>
          
    </div>
  );
};

export default SidebarMenu;