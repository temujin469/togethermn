"use client"
import useRegisterModal from '@/hooks/useRegisterModal';
import React, { useCallback, useState } from 'react';
import Modal from '../Modal';
import useLoginModal from '@/hooks/useLoginModal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import * as z from "zod"

import {
  FieldValues,
  SubmitHandler,
  useForm
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button';
import Image from 'next/image';


const registerFormSchema = z.object({
  name: z.string({
    required_error:"Хэрэглэгчийн нэр!"
  }).min(2, {
    message: "Хэрэглэгчийн нэр дор хаяж 2 тэмдэгт байх ёстой"
  }),
  email: z.string().email({
    message:"хүчингүй мэйл хаяг"
  }),
  password: z.string().min(6, {
    message: "Нууц үг дор хаяж 6 тэмдэгт байх ёстой"
  }).max(18),
})


function RegisterModal() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  const [isLoading, setIsLoading] = useState(false);



  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const content = (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Нэр</FormLabel>
            <FormControl>
              <Input placeholder='' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Имэйл</FormLabel>
            <FormControl>
              <Input placeholder='' {...field} />
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
            <FormLabel>Нууц үг</FormLabel>
            <FormControl>
              <Input placeholder='' {...field} />
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
        <p>Бүртгэлтэй юу?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >Нэвтрэх</span>
        </p>
      </div>
    </div>
  )


  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Бүртгүүлэх"
      actionLabel="Үргэлжлүүлэх"
      onClose={registerModal.onClose}
      onSubmit={form.handleSubmit(onSubmit)}
      body={content}
      footer={footerContent}
    />

  );
}

export default RegisterModal;
