"use client"
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation} from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"

const passwordShema = z.object({
  newPassword: z.string({
    required_error: "Шинэ нууц үг оруулан уу!",
  }).min(6,{
    message:"Хамгйин багадаа 6 тэмдэгт байх ёстой"
  }),
  confirmPassword: z.string({
    required_error: "Нууц үгээ давтан оруулан уу!",
  }),
}).superRefine(({confirmPassword,newPassword},ctx)=>{
  if(confirmPassword !== newPassword){
    ctx.addIssue({
      code: "custom",
      message:"Баталгаажуулах нууц үг таарахгүй байна",
      path:["confirmPassword"]
    })
  }
})


function page() {

  const { token, user } = useUser()
  const { toast } = useToast()

  // const { data: user, isError, isLoading } = useQuery<Partial<User>>({
  //   queryKey: ["accountDetails", "user", token],
  //   queryFn: async () => {
  //     const res = await myApi.get("/users/me", {
  //       headers: {
  //         Authorization: "Bearer " + token
  //       }
  //     })
  //     return res.data;
  //   }
  // })

  // console.log(user)

  const form = useForm<z.infer<typeof passwordShema>>({
    resolver: zodResolver(passwordShema),
  })


  const updateMutation = useMutation({
    mutationFn: async (password: string) => {
      const res = await myApi.put(`/users/${user?.id}`, {password}, {
        headers: {
          Authorization: "Bearer " + token
        }
      })

      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Хүсэлт амжилттай",
        description: "Таны нууц үг амжилттай шинэчлэгдлээ",
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

  const handleSubmit = (values: z.infer<typeof passwordShema>) => {
    console.log(values)
    updateMutation.mutate(values.newPassword);
  }

  return (
    <div className='bg-white p-4 sm:p-10'>
      <div className='flex gap-4 sm:gap-10 items-center mb-12 w-full'>
        <Link href="/account" className='hover:bg-gray-100 rounded-full p-3'>
          <ChevronLeft size={25} strokeWidth={3} />
        </Link>
        <div className='w-full'>
          <h3 className='text-lg font-medium'>Нууц үгээ солих</h3>
          <p className='text-gray-600'>Нууц үгээ шинээр солих</p>
        </div>
      </div>

      <Form {...form}>
        <form className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Шинэ нууц үг</Label>
                <FormControl>

                  <Input placeholder='Нууц үг сонгох' type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Шинэ нууц үг баталгаажуулах
                </Label>
                <FormControl>

                  <Input placeholder='Нууц үгээ дахин оруулна уу' type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
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
