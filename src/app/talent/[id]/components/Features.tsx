"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { myApi } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import QueryString from 'qs';
import React from 'react';

const Row = ({ title, val }: { title: string, val?: string | number }) => {
  return val && (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell>{val}</TableCell>
    </TableRow>
  )
}

function Features({id}:{id:number}) {

  const query = QueryString.stringify({
    // fields:["height","bodyType","eyeColor","hairColor","shoeSize","shirtSize","maritalStatus"]
  }, { encodeValuesOnly: true })

  const { data, isLoading, isError } = useQuery<ProfileDetailResponse>({
    queryKey: ["profile", "features", id],
    queryFn: async () => {
      const res = await myApi.get(`/api/talents/${id}?${query}`);
      return res.data;
    }
  });

  console.log(data)

  const profile = data?.data.attributes;

  return (
    <div>
      {
        isLoading ? <Skeleton className='h-[100px] w-full' /> : (
          <Table>
            <TableBody>
              <Row title='Нас' val={profile?.age} />
              <Row title='Хүйс' val={profile?.gender} />
              <Row title='Өндөр' val={profile?.height} />
              <Row title='Биеийн хэлбэр' val={profile?.bodyType} />
              <Row title='Үсний өнгө' val={profile?.hairColor} />
              <Row title='Нүдгий өнгө' val={profile?.eyeColor} />
              <Row title='Гутлын хэмжээ' val={profile?.shoeSize} />
              <Row title='Цамцны хэмжээ' val={profile?.shirtSize} />
              <Row title='Гэр бүлийн байдал' val={profile?.maritalStatus} />
            </TableBody>
          </Table>
        )
      }
    </div>
  );
}

export default Features;
