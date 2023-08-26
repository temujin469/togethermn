"use client"
import useRegisterModal from '@/hooks/useRegisterModal';
import React, { useCallback, useState } from 'react';
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
import { Dialog, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material';


const registerFormSchema = z.object({
  profileType: z.enum(["talent", "employer"],{
    required_error:"Профайлын төрөлөө оруулан уу!"
  }),
  username: z.string({
    required_error: "Хэрэглэгчийн нэр!"
  }).min(2, {
    message: "Хэрэглэгчийн нэр дор хаяж 2 тэмдэгт байх ёстой"
  }),
  email: z.string({
    required_error: "Мэйл хаягаа оруулан уу!"
  }).email({
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
      <form className='space-y-5 mt-5' onSubmit={form.handleSubmit(onSubmit)}>
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
        <div className='flex justify-end mb-5 pb-3'>
          <Button type='submit' variant="secondary">
            Бүртгүүлэх
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
        <Dialog
      open={registerModal.isOpen}
      onClose={registerModal.onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className='border-b'>
        Бүртгүүлэх
      </DialogTitle>
      <DialogContent className='pt-5'>
        {content}
        {footerContent}
      </DialogContent>
    </Dialog>

  );
}

export default RegisterModal;
