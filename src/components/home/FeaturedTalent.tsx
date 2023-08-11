"use client"
// import { talents } from '@/utils/data';
import React  from 'react';
import Link from 'next/link';
import { Rating, useMediaQuery, useTheme } from '@mui/material';
import BlurImage from '@/components/ui/BlurImage';
import useGetHomeContent from '@/hooks/useGetHomeContent';


const TalentCard = ({ attributes, id }: { attributes: Profile, id: number }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Link href={`/talent/${id}`}>
      <div className='w-full bg-white max-w-[360px] rounded-md border overflow-hidden shadow hover:shadow-lg cursor-pointer'>
        <div className='aspect-square relative'>
          <BlurImage
            src={Boolean(attributes.profileImage?.data) ? attributes.profileImage?.data?.attributes.url! : "/images/no-user.jpg"}
            alt={attributes.firstname}
            fill
            blurDataURL={attributes.profileImage?.data.attributes.formats?.thumbnail.url}
            className="h-full w-full object-cover"
          />
        </div>
        <div className='sm:p-4 p-3 lg:p-5'>
          <h4 className='sm:text-lg font-semibold'>{attributes.firstname}</h4>
          <Rating size={sm ? "small" : "medium"} value={attributes.rate} readOnly />
          <div className='flex gap-1 text-sm sm:text-[16px] items-center text-gray-500'><p>{attributes.location}</p></div>
          <div className=' text-ellipsis gap-1 text-sm sm:text-[16px] whitespace-nowrap overflow-hidden text-gray-700'>
            {attributes.professions.join(", ")}
          </div>
          {/* <div className='flex text-sm sm:text-[16px] gap-1 items-center text-gray-700'><p><NumericFormat thousandSeparator value={attributes.instagramFollowers} /></p></div> */}
        </div>
      </div>
    </Link>
  )
}

function FeaturedTalent() {

  const { data, isError, isLoading } = useGetHomeContent()

  // console.log("sear",data)

  const talents = data?.attributes.featured_talents.data;

  console.log("talents", talents)

  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-5 gap-3'>
        {
          talents?.map(({ attributes, id }) => (
            <TalentCard key={id} attributes={attributes} id={id}  />
          ))
        }
      </div>
    </div>
  );
}

export default FeaturedTalent;
