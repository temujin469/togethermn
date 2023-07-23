"use client"
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import QueryString from 'qs';
import React, { useState } from 'react';

function Bio() {
  const { token } = useUser()
  const [isEdit, setIsEdit] = useState(false);
  const { toast } = useToast()
  const queryClient = useQueryClient()


  const query = QueryString.stringify({
    fields: ["profile"],
    populate: {
      profile: {
        fields: ["bio"]
      }
    }
  }, { encodeValuesOnly: true })


  const { data: user, isLoading, isError } = useQuery<User>({
    queryKey: ["myProfile", "bio", token],
    queryFn: async () => {
      const res = await myApi.get(`/users/me?${query}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      });
      return res.data;
    }
  });

  const [bio, setBio] = useState<string | undefined>(user?.profile?.bio)

  const updateMutation = useMutation({
    mutationFn: async (bio: string) => {
      const res = await myApi.put(`/talents/${user?.profile?.id}`, {
        data: {
          bio
        }
      }, {
        headers: {
          Authorization: "Bearer " + token
        }
      })

      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Хүсэлт амжилттай",
        description: "Таны мэдээлэл амжилттай шинэчлэгдлээ",
        variant: "success",
      })
      queryClient.invalidateQueries(["bio"])
      queryClient.invalidateQueries(["myProfile"])
      setIsEdit(false)
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  const handleSubmit = () => {
    updateMutation.mutate(bio as string);
  }




  const bioContent = (
    <div>
      {
        isLoading ? <Skeleton className='h-[100px] w-full' /> : (
          <p>{user?.profile?.bio}</p>
          // <Textarea placeholder='Био' value={bio} readOnly rows={10}>{user?.profile?.bio}</Textarea>
        )
      }
      <div className='flex justify-end mt-5'>
        <Button className='gap-2' onClick={() => setIsEdit(true)}>
          {
            user?.profile?.bio ? "Засах" : "Нэмэх"
          }
        </Button>
      </div>
    </div>
  )

  const editBioContent = (
    <div>
      <Textarea placeholder='Био' value={bio} onChange={(e) => setBio(e.target.value)} rows={15}>{user?.profile?.bio}</Textarea>
      <div className='flex justify-end mt-2 gap-4'>
        <Button className='gap-2' onClick={() => {
          setBio(user?.profile?.bio)
          setIsEdit(false)
        }} >
          Болих
        </Button>
        <Button disabled={!bio} className='gap-2' variant="secondary" onClick={handleSubmit} >
          Хадгалах
        </Button>
      </div>
    </div>
  )

  return (
    <div>
      {
        isEdit ? editBioContent : bioContent
      }
    </div>
  );
}

export default Bio;
