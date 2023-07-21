"use client"
import { Rating } from '@mui/material';
import Link from 'next/link';
import { NumericFormat } from 'react-number-format';

const AppliedTalentItem = ({ talentProfile, username,profileId }: { talentProfile: Profile, username: string, profileId :number}) => {

  return (
    <Link href={`/talent/${profileId}`}>
      <div className='w-full max-w-[360px] rounded-md border-2 hover:border-secondary overflow-hidden cursor-pointer'>
        <div className='h-[180px] w-full'>
          <img
            src={Boolean(talentProfile.profileImage?.data) ? talentProfile.profileImage?.data?.attributes.url : "/images/no-user.jpg"}
            alt={username}
            className="h-full w-full object-cover"
          />
        </div>
        <div className='p-3 lg:p-4'>
          <h4 className='text-md mb-1 text-sm font-semibold'>{username}</h4>
          <Rating value={talentProfile.rate} readOnly size='small' className='mb-0' />
          <div className='flex gap-1 items-center text-gray-500'><p>{talentProfile.location}</p></div>
          <div className='flex gap-1 text-sm items-center whitespace-nowrap overflow-x-hidden text-gray-700'><p>{talentProfile.professions.slice(0, 2).join(", ")}</p></div>
          <div className='flex text-sm gap-1 items-center text-gray-700'>
            <NumericFormat readOnly thousandSeparator value={talentProfile.instagramFollowers} />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AppliedTalentItem;
