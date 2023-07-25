"use client"
// import { talents } from '@/utils/data';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { myApi } from '@/utils/axios';
import qs from 'qs';
import useSearchTalent from '@/hooks/useTalentSearch';
import { AxiosResponse } from 'axios';
import { NumericFormat } from 'react-number-format';
import { Rating, useMediaQuery, useTheme } from '@mui/material';


const TalentCard = ({ attributes, id, firstname }: { attributes: Profile, id: number, firstname: string }) =>{
const theme = useTheme();
const sm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Link href={`/talent/${id}`}>
      <div className='w-full bg-white max-w-[360px] rounded-md border overflow-hidden shadow hover:shadow-lg cursor-pointer'>
        <div className='h-[170px] md:h-[220px] lg:h-[200px] xl:h-[240px] w-full'>
          <img
            src={Boolean(attributes.profileImage?.data) ? attributes.profileImage?.data?.attributes.url : "/images/no-user.jpg"}
            alt={firstname}
            className="h-full w-full object-cover"
          />
        </div>
        <div className='sm:p-4 p-3 lg:p-5'>
          <h4 className='sm:text-lg font-semibold'>{firstname}</h4>
          <Rating size={sm ? "small" : "medium"} value={attributes.rate} readOnly />
          <div className='flex gap-1 text-sm sm:text-[16px] items-center text-gray-500'><p>{attributes.location}</p></div>
          <div className='flex md:hidden gap-1 text-sm sm:text-[16px] whitespace-nowrap overflow-hidden items-center text-gray-700'>
            {attributes.professions.slice(0, 2).join(", ").length > 18 ?
              attributes.professions.slice(0, 2).join(", ").slice(0, 18) + "..." : attributes.professions.slice(0, 2).join(", ")}
          </div>
          <div className='hidden md:flex gap-1 text-sm sm:text-[16px] whitespace-nowrap overflow-hidden items-center text-gray-700'>
            {attributes.professions.slice(0, 2).join(", ")}
          </div>
          {/* <div className='flex text-sm sm:text-[16px] gap-1 items-center text-gray-700'><p><NumericFormat thousandSeparator value={attributes.instagramFollowers} /></p></div> */}
        </div>
      </div>
    </Link>
  )
}

function FilteredTalents() {
  const [page, setPage] = useState(1);
  const { setResult, filter } = useSearchTalent()

  const query = qs.stringify({
    populate: {
      profileImage: {
        fields: ["url"]
      },
      user: {
        fields: ["username", "firstname", "lastname"]
      }
    }

  }, { encodeValuesOnly: true });

  const filterQuery = qs.stringify({
    filters: {
      firsname: {
        $eqi: filter?.searchKey
      },
      gender: {
        $eqi: filter?.gender
      },
      hairColor: {
        $containsi: filter?.hairColor
      },
      bodyType: {
        $containsi: filter?.bodyType
      },
      professions: {
        $containsi: filter?.profession
      },
      locations: {
        $contains: filter?.location
      },

      $and: [
        {
          height: {
            $gte: filter?.minHeight
          },
        },
        {
          height: {
            $lte: filter?.maxHeight
          },
        },
        {
          age: {
            $gte: filter?.minAge
          },
        },
        {
          age: {
            $lte: filter?.maxAge
          },
        }
      ],
    },
  }, { encodeValuesOnly: true });

  const paginationQuery = qs.stringify({
    pagination: {
      page: page,
      pageSize: 6
    }
  }, { encodeValuesOnly: true })



  // console.log(filter)
  useEffect(() => {
    setPage(1);
  }, [filterQuery])

  const { data, isError, isLoading } = useQuery<ProfilesResponse>({
    queryKey: ["profiles", paginationQuery, filterQuery],
    queryFn: async () => {
      const res: AxiosResponse<ProfilesResponse> = await myApi.get(`/api/talents?${query}&${filter && filterQuery}&${paginationQuery}`);
      setResult(res.data.meta.pagination.total);
      return res.data;
    }
  });

  // console.log("sear",data)

  const talents = data?.data;

  console.log("talents", talents)

  const pagination = data?.meta.pagination
  return (
    <div className='sm:shadow sm:p-5'>
      <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 sm:gap-5 gap-4'>
        {
          talents?.map(({ attributes, id }) => (
            <TalentCard key={id} attributes={attributes} id={id} firstname={attributes.user.data.attributes.username} />
          ))
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

export default FilteredTalents;
