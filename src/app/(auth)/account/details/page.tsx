"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"

const detailShema = z.object({
  username: z.string(),
  mobileNumber: z.string(),
  email: z.string().email()
})


function page() {

  const { token } = useUser()
  const {toast} = useToast()

  const { data:user, isError, isLoading } = useQuery<Partial<User>>({
    queryKey: ["accountDetails","me",token],
    queryFn: async () => {
      const res = await myApi.get("/api/users/me", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      return res.data;
    }
  })

  const form = useForm<z.infer<typeof detailShema>>({
    resolver: zodResolver(detailShema),
    defaultValues: {
      username:user?.username,
      mobileNumber: user?.mobileNumber,
      email: user?.email
    }
  })


  const updateMutation = useMutation({
    mutationFn: async (detail: z.infer<typeof detailShema>) => {
      const res = await myApi.put(`/api/users/${user?.id}`, detail, {
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
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  const handleSubmit = (values: z.infer<typeof detailShema>) => {
    console.log(values)
    updateMutation.mutate(values);
  }

  return (
    <div className='bg-white p-4 sm:p-10'>
      <div className='flex gap-4 sm:gap-10 items-center mb-12 w-full'>
        <Link href="/account" className='hover:bg-gray-100 rounded-full p-3'>
          <ChevronLeft size={25} strokeWidth={3} />
        </Link>
        <div className='w-full'>
          <h3 className='text-lg font-medium'>Бүртгэлийн дэлгэрэнгүй</h3>
          <p className='text-gray-600'>Хувийн мэдээлэл болон гар утасны дугаараа тохируулна уу</p>
        </div>
      </div>
      {
        isLoading ? (
          <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
              <Skeleton  className='h-[45px] w-full'/>
              <Skeleton  className='h-[45px] w-full'/>
              <Skeleton  className='h-[45px] w-full'/>
              <Skeleton  className='h-[45px] w-full'/>
            </div>
          </div>
        ) : user && (
          <Form {...form}>
            <form className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
              <FormField
              defaultValue={user.username}
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <Label>
                      Хэрэглэчийн нэр</Label>
                    <FormControl>

                      <Input placeholder='Нэр' type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                  defaultValue={user?.mobileNumber}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <Label>
                      Утасны дугаар
                    </Label>
                    <FormControl>

                      <Input placeholder='Утасны дугаар' type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                defaultValue={user?.email}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label>
                      Имэйл</Label>
                    <FormControl>

                      <Input placeholder='Имэйл хаяг' type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )
      }

      <div className='mt-12 flex justify-end gap-4 w-full'>
        <Link href="/account">
          <Button>
            Буцах
          </Button>
        </Link>
        <Button type="submit" variant='secondary' onClick={form.handleSubmit(handleSubmit)}>
          Хадгалах
        </Button>
      </div>
    </div>
  );
}

export default page;
