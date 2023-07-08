import Link from 'next/link'
import React from 'react'
import UserCard from './UserCard'
import { Button } from '../ui/button'
import { talents } from '@/utils/data'


function UserCardContainer() {
  return (
    <div className='md:px-10 xl:px-24'>
      <div className='py-5 grid gap-4 sm:gap-5 xl:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'>
        {
          Array(2).fill(null).map((_) => (
            talents.map(talent=> (
              <UserCard talent={talent} key={talent.slug} />
            ))
          ))
        }
      </div>
      <div className='flex justify-end 2xl:pr-3.5'
      data-aos="fade-left">
        
          <Link href="/search/talent">
          <Button variant="secondary">
            Цааш үзэх
          </Button>
          </Link>
      </div>
    </div>

  )
}

export default UserCardContainer