"use client"
import useLoginModal from '@/hooks/useLoginModal';
import React, { useCallback, useState } from 'react';
import Modal from '../Modal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import useRegisterModal from '@/hooks/useRegisterModal';

const loginFormSchema = z.object({
  email: z.string().email({
    message: "хүчингүй мэйл хаяг"
  }),
  password: z.string().min(6, {
    message: "Нууц үг дор хаяж 6 тэмдэгт байх ёстой"
  }).max(18),
})

function LoginModal() {
  const [isLoading,setIsLoading] = useState(false);
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal()

  const form = useForm({
    resolver:zodResolver(loginFormSchema),
    defaultValues:{
      email: "",
      password: ""
    }
  });


  const onSubmit = (values:z.infer<typeof loginFormSchema>)=>{
    console.log(values)
  }

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();

  }, [registerModal, loginModal])

  const content = (
    <Form {...form}>
      <FormField
      control={form.control}
      name="email"
      render={({field})=>(
        <FormItem>
          <FormLabel>Имэйл</FormLabel>
          <FormControl>
            <Input  {...field} />
          </FormControl>
          <FormMessage/>
        </FormItem>
      )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({field}) => (
          <FormItem>
            <FormLabel>Нууц үг</FormLabel>
            <FormControl>
              <Input  {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({field}) => (
          <FormItem>
            <FormLabel>ууц үг давтах</FormLabel>
            <FormControl>
              <Input {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div className='flex justify-center'>
        <Button variant="ghost"
        // onClick={() => signIn('google')}
        >
          <Image src="/images/google.webp" width={30} height={30} alt='google' />
        </Button>
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
