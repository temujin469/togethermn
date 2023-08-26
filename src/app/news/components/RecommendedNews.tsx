"use client"
import EmptyStatus from '@/components/element/EmptyStatus';
import { H4 } from '@/components/ui/Typography/Heading';
import { Skeleton } from '@/components/ui/skeleton';
import useNews from '@/hooks/useNews';
import getNews from '@/utils/news/getNews';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import QueryString from 'qs';
import React, { useState } from 'react';

function RecommendedNews() {

  const catId = useSearchParams().get("cat");
  const [page, setPage] = useState(0)

  const { filter } = useNews();

  const query = QueryString.stringify({
    sort: ["createdAt:desc"],
    fields: ["title", "image", "date"],
    filters: () => {

      return catId ? ({
        categories: catId,
        title: {
          $contains: filter?.searchKey
        }
      }) : ({
        title: {
          $contains: filter?.searchKey
        }
      })
    },
    populate: {
      image: {
        fields: ["url"]
      }
    },
    pagination: {
      page: 0,
      pageSize: 10
    }
  }, {
    encodeValuesOnly: true
  })


  const { data: allnews, isLoading } = useQuery({
    queryKey: ["/articles", query],
    queryFn: () => getNews(query)
  })

  return (
    <div>
      {
        isLoading ? (
          <div>
            <Skeleton className='h-[200px]' />
          </div>
        ) : allnews?.data?.length ? (
          allnews.data?.slice(0,6)?.map(news => (
            <div className='bg-white xl:bg-transparent p-[13px] xl:p-0  mb-[10px] md:mb-[20px] rounded-md 2xl:bg-white 2xl:p-[13px]'>
              <Link className='flex flex-row lg:flex-col xl:flex-row gap-[13px] md:gap-3' href={`/news/${news.id}`}>
                <div className='aspect-[1/1] w-full xl:max-w-[200px] relative rounded-md overflow-hidden'>
                  <Image src={news.attributes.image.data.attributes.url} className='object-cover' alt={news.attributes.title} fill />
                </div>
                <div>
                  <p className="mb-1 text-neutral-500 dark:text-neutral-300">
                    <small className='flex gap-1'><Calendar size={17} /><u>{moment(news.attributes.date).format('ll')}</u></small>
                  </p>
                  <p className="text-ellipsis overflow-hidden">{news.attributes.title}</p>
                </div>
              </Link>
            </div>
          ))
        ) : <EmptyStatus message='Мэдээ олдсонгүй' />
      }
    </div>
  );
}

export default RecommendedNews;
