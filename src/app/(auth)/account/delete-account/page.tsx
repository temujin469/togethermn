"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { DialogClose } from '@radix-ui/react-dialog';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';


function page() {

  const { token,logout } = useUser()
  const { toast } = useToast()
  const router = useRouter()

  const { data: user, isError, isLoading } = useQuery<Partial<User>>({
    queryKey: ["accountDetails", "me", token],
    queryFn: async () => {
      const res = await myApi.get("/users/me", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      return res.data;
    }
  })



  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await myApi.delete(`/users/${user?.id}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })

      return res.data;
    },
    onSuccess: () => {
      toast({
        title: "Хүсэлт амжилттай",
        description: "Таны бүртгэл together.mn сайтаас устгагдлаа",
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

  const handleDelete = () => {
    deleteMutation.mutate();
    logout();
    router.push("/");
  }

  return (
    <div className='bg-white p-4 sm:p-10'>
      <div className='flex gap-4 sm:gap-10 items-center mb-12 w-full'>
        <Link href="/account" className='hover:bg-gray-100 rounded-full p-3'>
          <ChevronLeft size={25} strokeWidth={3} />
        </Link>
        <div className='w-full'>
          <h3 className='text-lg font-medium'>Бүртгэлээ идэвхгүй болгох</h3>
          <p className='text-gray-600'>Together.mn сайтаас бүртгэлээ идэвхгүй болгох</p>
        </div>
      </div>
        
      <Dialog>
        <DialogTrigger asChild>
          <Button className='w-full' variant="destructive">Бүртгэлээ устгах</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Бүртгэлээ идэвхгүй болгох</DialogTitle>
            <DialogDescription>
              Та бүртгэлээ устгахдаа итгэлтэй байна уу?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className='flex gap-2 justify-end'>
              <DialogClose>
                <Button type="submit" variant="ghost">Үгүй</Button>
              </DialogClose>
              <Button type="submit" variant="destructive" onClick={handleDelete}>Тийм</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default page;
