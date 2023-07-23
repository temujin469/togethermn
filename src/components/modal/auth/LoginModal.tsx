"use client"
import useLoginModal from '@/hooks/useLoginModal';
import React, { useCallback, useState } from 'react';
import Modal from '../Modal';
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

const loginFormSchema = z.object({
  email: z.string().email({
    message: "хүчингүй мэйл хаяг"
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
      <form className='space-y-6'>
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
      </form>
    </Form>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className='flex justify-center'>
        <a href='http://localhost:1337/api/connect/google'>
          <Button variant="ghost"
          // onClick={() => signIn('google')}
          >
            <Image src="/images/google.webp" width={30} height={30} alt='google' />
          </Button>
        </a>
        <Button variant="ghost">
          <Image src="/images/facebook.png" width={30} height={30} alt='facebook' />
        </Button>
      </div>

      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>Шинээр Бүртгүүлэх
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          > Бүртгүүлэх</span>
        </p>
      </div>
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Нэвтрэх"
      actionLabel="Үргэлжлүүлэх"
      onClose={loginModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={content}
      footer={footerContent}
    />

  );
}

export default LoginModal;
