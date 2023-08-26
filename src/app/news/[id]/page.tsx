
import getNewsDetail from '@/utils/news/getNewsDetail';
import Image from 'next/image';
import React from 'react';
import Widget from '../components/Widget';
import { marked } from 'marked';
import moment from 'moment';
import "moment/locale/mn"
import { Calendar } from 'lucide-react';
import RecommendedNews from '../components/RecommendedNews';
type Props = {
  params:{
    id:number
  }
}


async function NewsDetail({params}:Props) {

  const newsDetail = await getNewsDetail(params.id)
  return (
    <div className='lg:grid grid-cols-6 lg:gap-[20px]  2xl:gap-[30px]'>
    <div className='col-span-4'>
        <Widget title={newsDetail?.data.attributes.title}>
          <p className='text-gray-600 flex gap-1 text-lg font-md mb-2'> <Calendar />{moment(newsDetail?.data.attributes.date).format("ll")}</p>
          <div className='aspect-video relative rounded-lg overflow-hidden mb-5'>
            <Image className='object-cover' src={newsDetail?.data.attributes.image.data.attributes.url!} fill alt={newsDetail?.data.attributes.title!} />
          </div>
          <article className='prose text-justify prose-sm sm:prose xl:prose-lg mx-auto' dangerouslySetInnerHTML={{ __html: marked.parse(newsDetail?.data.attributes.content!) }} />
        </Widget>
    </div>
      <div className='col-span-2'>
        <RecommendedNews/>
      </div>
   </div>
  );
}

export default NewsDetail;
