import React from 'react';
import Image from 'next/image';
import { marked } from 'marked';
import myFetch from '@/utils/myFetch';
import EmptyStatus from '@/components/element/EmptyStatus';


 const page = async () => {


  const aboutUs = await myFetch("/api/about-us?populate=*");
  // const { data: aboutUs } = useQuery({
  //   queryKey: ["about-us"],
  //   queryFn: async () => {
  //     return await myFetch("/api/about-us?populate=*");
  //   }
  // });

  return (
    <div>
      {/* <p className='text-gray-600 flex gap-1 text-lg font-md mb-2'> <Calendar />{moment(newsDetail?.data.attributes.date).format("ll")}</p> */}
     {
      aboutUs?.data ? (
        <>
            <div className='aspect-video relative rounded-lg overflow-hidden mb-5'>
              <Image className='object-contain' src={aboutUs?.data.attributes.image.data.attributes.url!} fill alt={aboutUs?.data.attributes.title!} />
            </div>
            {
              aboutUs?.data.attributes.content ? (
                <article className='prose prose-sm sm:prose-lg xl:prose-xl mx-auto'
                  dangerouslySetInnerHTML={{ __html: marked.parse(aboutUs?.data.attributes.content) }}
                />
              ) : null
            }

        </>
      ) : <EmptyStatus/>
     }
    </div>
  );
}

export default page;
