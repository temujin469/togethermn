"use client"
import useRegisterModal from '@/hooks/useRegisterModal';
import React, { useCallback, useState } from 'react';
import Modal from '../Modal';
import useLoginModal from '@/hooks/useLoginModal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import * as z from "zod"

import {
  useForm
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { myApi } from '@/utils/axios';
import { useToast } from '@/components/ui/use-toast';


const registerFormSchema = z.object({
  profileType: z.enum(["talent", "employer"],{
    required_error:"Профайлын төрөлөө оруулан уу!"
  }),
  username: z.string({
    required_error: "Хэрэглэгчийн нэр!"
  }).min(2, {
    message: "Хэрэглэгчийн нэр дор хаяж 2 тэмдэгт байх ёстой"
  }),
  email: z.string().email({
    message: "Мэйл хаяг буруу байна"
  }),
  password: z.string({
    required_error: "нууц үгээ оруулан уу!",
  }).min(6, {
    message: "Нууц үг дор хаяж 6 тэмдэгт байх ёстой"
  }),
  confirmPassword: z.string({
    required_error: "Нууц үгээ давтан оруулан уу!",
  }),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Баталгаажуулах нууц үг таарахгүй байна",
      path: ["confirmPassword"]
    })
  }
})


function RegisterModal() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const auth = useAuth();
  const router = useRouter()

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
  })

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setIsLoading(true)
    setIsError(false)
    try {
      const res = await myApi.post("/api/auth/local/register", { ...values, isCreatedProfile:false });

      const data = res.data;
      if (data) {
        auth.setToken(data.jwt);
        auth.setIsAuth(true);
        localStorage.setItem("token", JSON.stringify(data.jwt));
        registerModal.afterUrl && router.push(registerModal.afterUrl);
        registerModal.onClose()
        toast({
          title: "Амжилттай бүртгэгдлээ",
          description: "Та системд aмжилттай бүртгэгдлээ",
          variant: "success",
        })

      }

    } catch (err) {
      console.log(err)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal])

  const content = (
    <Form {...form}>
      <form className='space-y-5'>
        <FormField

          control={form.control}
          name="profileType"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={(val: "talent" | "employer") => onChange(val)}
                  defaultValue={value}
                >
                  <div className='mb-3'>
                    <Label>
                      Профайлын төрөл?</Label>
                  </div>
                  <div className='flex gap-10'>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="talent" />
                      </FormControl>
                      <FormLabel className='font-normal pl-2'>Мэргэжилтэн</FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="employer" />
                      </FormControl>
                      <FormLabel className='font-normal pl-2'>
                        Ажил олгогч</FormLabel>
                    </FormItem>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Label>Нэр</Label>
              <FormControl>
                <Input placeholder='Tаны нэр' {...field} />
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
              <Label>Имэйл</Label>
              <FormControl>
                <Input placeholder='Имэйл хаяг' {...field} />
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
                <Input placeholder='Нууц үг' {...field} />
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
              <Label>Нууц үг баталгаажуулах</Label>
              <FormControl>
                <Input placeholder='Нууц үгээ давтах' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isError && (
          <div className='text-red-400 text-center mt-5'>Алдаа гарлаа</div>
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
