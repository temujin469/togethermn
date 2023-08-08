import BlurImage from '@/components/ui/BlurImage';
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import UploadPhotos from '../../UploadPhotos';
import 'react-photo-view/dist/react-photo-view.css';


function PhotoGallery({ photos, profileId }: { photos: MyProfile["photos"], profileId:number }) {
  const md = useMediaQuery("(min-width:640px)");
  console.log(photos?.map(photo =>photo.formats.thumbnail))

  const isHavePhotos = Boolean(photos?.length);
  return (
    <div>
      <PhotoProvider>
        <ImageList variant="masonry" cols={md ? 3 : 1} gap={8}>
          {

            isHavePhotos && (<ImageListItem className='re' >
              {/* <div className=' relative h-[300px]'> */}
                <UploadPhotos profileId={profileId} />
              {/* </div> */}
            </ImageListItem>)
          }
          {photos?.map(({ url, id, formats }) => (
            <PhotoView key={id} src={`${url}`}>
              <ImageListItem className='relative '>
                {/* <div className='w-full relative h-[300px] max-h-[400px]'> */}
                  <img
                    src={`${url}?w=248&fit=crop&auto=format`}
                    // fill
                    // blurDataURL={formats.thumbnail.url}
                    srcSet={`${url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={"sdsf"}
                    className='rounded-md'
                  />
                {/* </div> */}
              </ImageListItem>
            </PhotoView>
          )) as any}
        </ImageList>
      </PhotoProvider>

    </div>
  )
}

export default PhotoGallery;
