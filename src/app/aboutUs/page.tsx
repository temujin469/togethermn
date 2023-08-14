import Image from 'next/image';
import React from 'react';
import { marked } from 'marked';
import Header from '@/components/header';
import Footer from '@/components/footer/Footer';
import myFetch from '@/utils/myFetch';


async function AboutUs() {


  const aboutUs = await myFetch("/api/about-us?populate=*");

  return (
    <div className='bg-white'>
      <Header />
      <div className='max-w-[900px] mx-auto py-24'>
        {/* <p className='text-gray-600 flex gap-1 text-lg font-md mb-2'> <Calendar />{moment(newsDetail?.data.attributes.date).format("ll")}</p> */}
        <div className='aspect-video relative rounded-lg overflow-hidden mb-5'>
          <Image className='object-contain' src={aboutUs?.data.attributes.image.data.attributes.url!} fill alt={aboutUs?.data.attributes.title!} />
        </div>
        <article className='prose prose-sm sm:prose-lg xl:prose-xl mx-auto' dangerouslySetInnerHTML={{ __html: marked.parse(aboutUs?.data.attributes.content!) }} />
      </div>
      <Footer/>
    </div>
  );
}

export default AboutUs;
