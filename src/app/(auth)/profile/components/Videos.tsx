"use client"
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import QueryString from 'qs';
import React from 'react';
import UploadPhotos from './UploadPhotos';
import { Skeleton } from '@/components/ui/skeleton';
import UploadVideo from './UploadVideo';

function Videos() {
  const user = useUser()
  const userId = user.user?.id

  const query = QueryString.stringify({
    fields: ["profile"],
    populate: {
      profile: {
        fields: ["videos"],
        populate: ["videos"]
      }
    }
  }, { encodeValuesOnly: true })


  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["myProfile", "videos", userId, user?.token],
    queryFn: async () => {
      const res = await myApi.get(`/users/me?${query}`, {
        headers: {
          Authorization: "Bearer " + user?.token
        }
      });
      return res.data;
    }
  });

  const profile = data?.profile;
  const isHaveVideos = Boolean(profile?.videos?.length);


  return !isLoading ? (
    <div>
      <UploadVideo />
      <div className='grid md:grid-cols-2 lg:grid-cols-3'>
        {profile?.videos?.map(({ url, id }) => (
          <div key={id}>
            <video
              autoPlay={false}
              controls
              className='rounded-md'
            >
              <source src={url} type="video/mp4"></source>
              <source src="movie.ogg" type="video/ogg"></source>
            </video>
          </div>

        )) as any}
      </div>

    </div>
  ) : (
    <Skeleton className='h-[200px]' />
  )
}

export default Videos;
