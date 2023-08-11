"use client"
import EmptyStatus from '@/components/element/EmptyStatus';
import { H3, H4 } from '@/components/ui/Typography/Heading';
import { Skeleton } from '@/components/ui/skeleton';
import useGetNewsCategory from '@/hooks/news/useGetNewsCategory';
import useNews from '@/hooks/useNews';
import getNews from '@/utils/news/getNews';
import { Pagination } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
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

  const pagination = allnews?.meta.pagination;

  const { data: category } = useGetNewsCategory({ variables: { catId: catId as string } })




  return (
    <div className=''>
      <div className='bg-white p-4  md:p-7 rounded-lg shadow '>
        <H4 className='uppercase mb-4'>
          {category ? category?.data.attributes.name : "Мэдээ мэдээлэл"}
        </H4>
        {
          isLoading ? (
            <div>
              <Skeleton className='h-[200px]' />
            </div>
          ) : allnews?.data.length ? (
            allnews.data.map(news => (
              <div>
                <Link className='flex mb-5 gap-4' href={`/news/${news.id}`}>
                  <div className='aspect-[1/1] w-full max-w-[200px] relative rounded-md overflow-hidden'>
                    <Image src={news.attributes.image.data.attributes.url} className='object-cover' alt={news.attributes.title} fill />
                  </div>
                  <div>
                    <H4>{news.attributes.title}</H4>
                  </div>
                </Link>
              </div>
            ))
          ) : <EmptyStatus message='Мэдээ олдсонгүй' />
        }
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
