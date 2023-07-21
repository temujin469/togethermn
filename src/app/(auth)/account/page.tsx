import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Item = ({ title, desc, link,btnTitle }: { title: string, desc: string, link: string,btnTitle?:string }) => {
  return (
    <div className='flex flex-col sm:flex-row bg-white mb-1 items-center justify-between gap-4 p-4 sm:p-6'>
      <div className='w-full'>
        <h3 className='text-lg font-medium'>{title}</h3>
        <p className='text-gray-600'>{desc}</p>
      </div>
      <div className='flex justify-end w-full sm:w-auto'>
        <Link href={link}>
          <Button className='whitespace-nowrap'>
            {
              btnTitle ? btnTitle : "Засах"
            }
          </Button>
        </Link>
      </div>
    </div>
  )
}

function page() {
  return (
    <div>
      <Item
        title='Бүртгэлийн дэлгэрэнгүй'
        desc='Хувийн мэдээлэл болон гар утасны дугаараа тохируулна уу'
        link='/account/details'
      />
      <Item
        title='Нууц үгээ солих'
        desc='Нууц үгээ шинээр солих'
        link='/account/resetPassword'
      />
      <Item
        title='Бүртгэлээ идэвхгүй болгох'
        desc='Together.mn сайтаас бүртгэлээ идэвхгүй болгох'
        link='/account/delete-account'
        btnTitle='Бүртгэл устгах'
      />
    </div>
  );
}

export default page;
