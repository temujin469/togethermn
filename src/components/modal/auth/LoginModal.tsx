"use client"
import useLoginModal from '@/hooks/useLoginModal';
import React, { useCallback, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import useRegisterModal from '@/hooks/useRegisterModal';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { myApi } from '@/utils/axios';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material';

const loginFormSchema = z.object({
  email: z.string({
    required_error:"Мэйл хаягаа оруулан уу!"
  }).email({
    message: "хүчингүй мэйл хаяг",
  }),
  password: z.string({
    required_error: "нууц үгээ оруулан уу!",
  }).min(6, {
    message: "Нууц үг дор хаяж 6 тэмдэгт байх ёстой"
  }).max(18),
})

function LoginModal() {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal()
  const auth = useAuth()
  const router = useRouter()

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // const cookieStore = cookies()

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast()

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {

    setIsLoading(true)
    setIsError(false)
    try {
      const res = await myApi.post("/api/auth/local", {
        identifier: values.email,
        password: values.password
      });

      const data = res.data;
      if (data) {
        auth.setToken(data.jwt);
        auth.setIsAuth(true);
        localStorage.setItem("token", JSON.stringify(data.jwt));
        loginModal.afterUrl && router.push(loginModal.afterUrl);
        loginModal.onClose()
      }

      toast({
        title: "Амжилттай нэвтэрлээ",
        description: "Та системд aмжилттай нэвтэрлээ",
        variant: "success",
      })

    } catch (err) {
      console.log(err)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();

  }, [registerModal, loginModal])

  const content = (
    <Form {...form}>
      <form className='space-y-6 mt-5' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label>Имэйл</Label>
              <FormControl>
                <Input placeholder='Бүртгэлтэй мэйл хаяг' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label>Нууц үг</Label>
              <FormControl>
                <Input placeholder='Нууц үг'  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError && (
          <div className='text-red-400 text-center mt-5'>Имэйл эсвэл нууц үг буруу байна!</div>
        )}
        <div className='flex justify-end mb-5 pb-3'>
          <Button type='submit' variant="secondary">
            Нэвтрэх
          </Button>
        </div>
      </form>
    </Form>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className='flex justify-center'>
        <a href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/google`}>
          <Button variant="ghost"
          // onClick={() => signIn('google')}
          >
            <Image src="/images/google.webp" width={30} height={30} alt='google' />
          </Button>
        </a>
        <a href={`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/connect/facebook`}>
        <Button variant="ghost">
          <Image src="/images/facebook.png" width={30} height={30} alt='facebook' />
        </Button>
        </a>
      </div>

      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p 
        onClick={onToggle}
          className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            ">Шинээр Бүртгүүлэх
        </p>
      </div>
    </div>
  )
  return (
    <Dialog
      open={loginModal.isOpen}
      onClose={loginModal.onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className='border-b'>
        Нэвтрэх
      </DialogTitle>
      <DialogContent>
        {content}
        {footerContent}
      </DialogContent>
    </Dialog>
  );
}

export default LoginModal;
