"use client"
import { H4 } from '@/components/ui/Typography/Heading';
import Show from '@/components/ui/show';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { BadgeCheck, Instagram, MapPin, UserCircle2 } from 'lucide-react';
import React from 'react';
import qs from "qs"
import EditInfoModal from './EditInfoModal';
import EditProfileImage from './EditProfileImage';
import { Skeleton } from '@/components/ui/skeleton';


function LeftContent() {
  const user = useUser()
  const userId = user?.user?.id;


  const query = qs.stringify({
    populate: {
      profileImage:true,
      profile: {
        populate: ["profileImage"]
      }
    }
  }, { encodeValuesOnly: true })

  const { data:me, isLoading, isError } = useQuery<User>({
    queryKey: ["myProfile","me", userId,user?.token],
    queryFn: async () => {
      const res = await myApi.get(`/api/users/me?${query}`,{
        headers:{
          Authorization: "Bearer " + user.token
        }
      });
      return res.data;
    }
  });


  const profile = me?.profile;

  // console.log(profile)

  // if(isLoading) {
  //   return (
  //       <Skeleton className='h-[560px] w-full'/>
  //   )
  // }

  return (
    <div>
      <div className='sm:shadow sm:rounded-lg bg-white'>
        <div className='w-full h-[300px] relative'>
          <img
            src={profile?.profileImage ? profile?.profileImage?.url : "/images/no-user.jpg"} alt='profile' 
          className='object-cover sm:rounded-t-lg w-full h-[300px]' />
          <EditProfileImage profileId={profile?.id} imageId={profile?.profileImage?.id}/>
        </div>
       {
        !isLoading ? (
            <div className='p-4 capitalize'>
              <H4 >{me?.username}</H4>
              <H4 className='mb-4 '>{profile?.firstname} {profile?.lastname}</H4>
              <Show isShow>
                <div className='flex text-sm items-center font-medium gap-1'><BadgeCheck size={13} color='green' />Баталгаажсан</div>
              </Show>
              <Show isShow>
                <div className='flex text-sm items-center font-medium gap-1'><MapPin size={13} />{profile?.location}</div>
              </Show>
              <Show isShow>
                <div className='flex text-sm font-medium gap-1'><UserCircle2 size={13} />{profile?.professions.join(", ")}</div>
              </Show>
              <Show isShow>
                <div className='flex text-sm items-center font-medium gap-1'><Instagram size={13} />Идэвхтэй</div>
              </Show>
            </div>
        ) : (
          <div className='h-[184px] p-4'>
                <Skeleton className='w-full h-full' />
          </div>
        )
       }
        <div className='border-t p-4 flex justify-center'>
          <EditInfoModal/>
        </div>
      </div>
      {/* <div className='bg-gray-100 sm:rounded-lg p-4'>
        <ul>
          <li className='font-medium mb-2'>Yeimy Lorena C Rates</li>
          <li className='font-medium mb-2'>Hair & Makeup Artist</li>
          <li className='font-medium mb-2'>$100 per hour</li>
          <li className='font-medium mb-2'>$700 per day</li>
          <Separator />
          <li className='font-medium mb-2'>Hair & Makeup Artist</li>
          <li className='font-medium mb-2'>$100 per hour</li>
          <li className='font-medium mb-2'>$700 per day</li>
          <Separator />
          <li className='font-medium mb-2'>Hair & Makeup Artist</li>
          <li className='font-medium mb-2'>$100 per hour</li>
          <li className='font-medium mb-2'>$700 per day</li>
        </ul>
      </div> */}
    </div>
  );
}

export default LeftContent;
