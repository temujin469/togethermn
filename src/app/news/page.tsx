"use client"
import EmptyStatus from '@/components/element/EmptyStatus';
import NewsCard from '@/components/home/newsSection/NewsCard';
import { H3, H4 } from '@/components/ui/Typography/Heading';
import { Skeleton } from '@/components/ui/skeleton';
import useGetNewsCategory from '@/hooks/news/useGetNewsCategory';
import useNews from '@/hooks/useNews';
import getNews from '@/utils/news/getNews';
import { Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Calendar } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import QueryString from 'qs';
import React, { useState } from 'react';

function News() {

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

  const pagination = allnews?.meta?.pagination;

  const { data: category } = useGetNewsCategory({ variables: { catId: catId as string } })




  return (
    <div className=''>
      <div className='py-4 md:p-0'>
        <H4 className='uppercase mb-4'>
          {category ? category?.data.attributes.name : "Мэдээ мэдээлэл"}
        </H4>
        <div className='grid grid-cols-12 gap-[20px]'>
          {
            isLoading ? (
              <div>
                <Skeleton className='h-[200px]' />
              </div>
            ) : allnews?.data?.length ? (
              allnews.data?.map(news => (
                // <div>
                //   <Link className='flex mb-5 gap-4' href={`/news/${news.id}`}>
                //     <div className='aspect-[1/1] w-full max-w-[200px] relative rounded-md overflow-hidden'>
                //       <Image src={news.attributes.image.data.attributes.url} className='object-cover' alt={news.attributes.title} fill />
                //     </div>
                //     <div>
                //       <H4>{news.attributes.title}</H4>
                //     </div>
                //   </Link>
                // </div>
                <div key={news.id} className="col-span-12 sm:col-span-6 lg:col-span-4 2xl:col-span-3 text-center pt-[20px]">
                  <div
                    className="relative block rounded-lg bg-white dark:bg-neutral-700 border">
                    <div className="flex">
                      <div
                        className="relative w-full aspect-[6/4] mx-4 -mt-4 overflow-hidden rounded-lg shadow-lg dark:shadow-black/20">
                        <Image src={news.attributes.image.data.attributes.url} className="object-cover" fill alt={news.attributes.title} />
                        <a href="#!">
                          <div
                            className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 bg-[hsla(0,0%,98.4%,.15)]">
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="p-4 lg:p-4">
                      <p className="mb-1 text-neutral-500 dark:text-neutral-300">
                        <small className='flex gap-1 justify-center'><Calendar size={17} /><u>{moment(news.attributes.date).format('ll')}</u></small>
                      </p>
                      <h5 className="mb-3 text-[17px] font-bold">{news.attributes.title}</h5>
                      <Link href={`/news/${news.id}`} data-te-ripple-init data-te-ripple-color="light"
                        className="inline-block rounded-full bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                        Цааш унших</Link>
                    </div>
                  </div>
                </div>
              ))
            ) : <EmptyStatus message='Мэдээ олдсонгүй' />
          }
        </div>
      </div>
      <div className='flex justify-center mt-10 mb-5'>
        <Pagination count={pagination?.pageCount} onChange={(e, val) => {
          setPage(val)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }} page={page} variant="outlined" shape="rounded" size="medium" />
      </div>
    </div>
  );
}

export default News;
