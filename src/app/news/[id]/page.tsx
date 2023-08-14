
import getNewsDetail from '@/utils/news/getNewsDetail';
import Image from 'next/image';
import React from 'react';
import Widget from '../components/Widget';
import { marked } from 'marked';
import moment from 'moment';
import "moment/locale/mn"
import { Calendar } from 'lucide-react';
type Props = {
  params:{
    id:number
  }
}


async function NewsDetail({params}:Props) {

  const newsDetail = await getNewsDetail(params.id)
  return (
    <Widget title={newsDetail?.data.attributes.title}>
        <p className='text-gray-600 flex gap-1 text-lg font-md mb-2'> <Calendar />{moment(newsDetail?.data.attributes.date).format("ll")}</p>
        <div className='aspect-video relative rounded-lg overflow-hidden mb-5'>
          <Image className='object-cover' src={newsDetail?.data.attributes.image.data.attributes.url!} fill alt={newsDetail?.data.attributes.title!} />
        </div>
      <article className='prose prose-sm sm:prose-lg xl:prose-xl mx-auto' dangerouslySetInnerHTML={{ __html: marked.parse(newsDetail?.data.attributes.content!) }} />
    </Widget>
  );
}

export default NewsDetail;
