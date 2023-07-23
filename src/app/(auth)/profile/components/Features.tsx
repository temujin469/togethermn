"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import QueryString from 'qs';
import React from 'react';
import EditFeaturesModal from './EditFeaturesModal';

const Row = ({ title, val }: { title: string, val?: string | number }) => {
  return val && (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell>{val}</TableCell>
    </TableRow>
  )
}

function Features() {
  const { user, token } = useUser()
  // const [isEdit, setIsEdit] = useState(false);


  const query = QueryString.stringify({
    fields: ["profile"],
    populate: {
      profile: true
    }
  }, { encodeValuesOnly: true })


  const { data, isLoading, isError } = useQuery<User>({
    queryKey: ["myProfile", "features", user],
    queryFn: async () => {
      const res = await myApi.get(`/api/users/me?${query}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      return res.data;
    }
  });

  const profile = data?.profile;

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
              <Row title='Хоолны дэглэм' val={profile?.diet} />
              <Row title='Гэр бүлийн байдал' val={profile?.maritalStatus} />
            </TableBody>
          </Table>
        )
      }
      <EditFeaturesModal/>
    </div>
  );
}

export default Features;
