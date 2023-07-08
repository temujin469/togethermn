import React from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'
// import { Rate } from 'antd'
import { AiOutlineInstagram } from 'react-icons/ai'
import Link from 'next/link'

type Props = {
  talent:Talent
}

function UserCard({ talent }: Props) {
  return (
    <Link href="/talent/1">
    <div className='flex justify-center'
      data-aos="fade-up"
      data-aos-offset="100"
      data-aos-delay='10'>
      <div className='w-full max-w-[250px] xxl:max-w-[280px] rounded-lg overflow-hidden border border-color3/40 cursor-pointer'>
        <div className='h-[170px] md:h-[220px] lg:h-[200px] xl:h-[240px] w-full'>
          <img src={talent.profileImg} alt={talent.name} className="h-full w-full object-cover" />
        </div>
        <div className='p-4 lg:p-5'>
          <h4 className='text-lg font-medium'>{talent.name}</h4>
          {/* <div><Rate disabled defaultValue={user.rate} className="" /></div> */}
          <div className='flex gap-1 items-center text-gray-700'><HiOutlineLocationMarker className='text-[18px]' /><p>{talent.location}</p></div>
          <div className='flex gap-1 items-center text-gray-700'><AiOutlineInstagram className='text-[18px]' /><p>{talent.followers}</p></div>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default UserCard