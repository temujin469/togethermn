"use client"
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { ImagePlus } from 'lucide-react';
import QueryString from 'qs';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import UploadPhotos from './UploadPhotos';
import { Skeleton } from '@/components/ui/skeleton';

function Portfolio() {
  const md = useMediaQuery("(min-width:640px)");
  const user = useUser()
  const userId = user.user?.id

  const query = QueryString.stringify({
    fields: ["profile"],
    populate: {
      profile: {
        fields: ["photos"],
        populate: ["photos"]
      }
    }
  }, { encodeValuesOnly: true })


  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["myProfile", "portfolio", userId, user?.token],
    queryFn: async () => {
      const res = await myApi.get(`/api/users/me?${query}`, {
        headers: {
          Authorization: "Bearer " + user?.token
        }
      });
      return res.data;
    }
  });

  console.log(data);

  const profile = data?.profile;
  const isHavePhotos = Boolean(profile?.photos?.length);


  return !isLoading ? (
    <div>
      {
        !isHavePhotos && <UploadPhotos profileId={profile?.id} />
      }
      <PhotoProvider>
        <ImageList variant="masonry" cols={md ? 3 : 1} gap={8}>
          {

            isHavePhotos && (<ImageListItem >
              <UploadPhotos profileId={profile?.id} />
            </ImageListItem>)
          }
          {profile?.photos?.map(({ url, id }) => (
            <PhotoView key={id} src={`${url}`}>
              <ImageListItem >
                <img
                  src={`${url}?w=248&fit=crop&auto=format`}
                  srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={"sdsf"}
                  loading="lazy"
                  className='rounded-md'
                />
                <div></div>
              </ImageListItem>
            </PhotoView>
          )) as any}
        </ImageList>
      </PhotoProvider>

    </div>
  ) : (
    <Skeleton className='h-[200px]'/>
  )
}

export default Portfolio;
