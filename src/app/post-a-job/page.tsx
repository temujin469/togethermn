"use client"
import React from 'react';

import { H2 } from '@/components/ui/Typography/Heading';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from 'next/image';
import { professions } from '@/utils/data';
import { useRouter } from 'next/navigation';
import usePostJob from '@/hooks/usePostJob';
import RowWithIcon from './components/RowWithIcon';


// import { toast } from "@/components/ui/use-toast"

const pros = professions.map(pro => pro.slug)
const FormSchema = z.object({
  profession: z.enum(pros as [string, ...string[]], {
    required_error: "Та ямар нэгэн мэргэшил сонгох хэрэгтэй.",
  }),
})


function PostAJob() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { setJob } = usePostJob();

  const { push, back } = useRouter()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    const profession = data.profession.toLowerCase()

    setJob({profession})

    if (profession == "жүжигчин" || profession == "загвар-өмсөгч") {
      return push("/post-a-job/cast-talent")
    } else if (profession == "гэрэл-зурагчин" || profession == "видео-зураглаач" || profession == "графикч" || profession == "стилист" || profession == "үс-нүүр-будалт") {
      return push("/post-a-job/creative-production")
    } else if (profession == "инфлүүнсер") {
      return push("/post-a-job/influencer")
    } else if (profession == "Контент-эрхлэгч") {
      return push("/post-a-job/content-creator")
    } else {
      return;
    }
  }


  return (
    <div className='min-h-screen'>
      <div className='md:grid grid-cols-2 h-screen'>
        <div className='col-span-1 hidden md:block m-10  relative'>
          <Image
            fill
            src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="model" className='object-cover' />
        </div>
        <div className='p-5 md:p-10  flex justify-center'>
          <div className='max-w-[500px]'>
            <H2>
              Та хэнтэй ажиллахыг хүсч байна вэ?</H2>
            <p className='mb-5 text-gray-600'>
              Таны ажлын шаардлагад хамгийн сайн тохирох сонголтыг сонго. Энэ нь холбогдох өргөдөл гаргагчдад таны ажлын зарыг хайж олоход тусалдаг.</p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {
                            professions.map((pro) => (
                              <FormItem key={pro.slug} className="flex items-center space-x-3 space-y-0 rounded-lg border px-4 py-3 bg-gray-50 hover:bg-gray-100">
                                <FormControl>
                                  <RadioGroupItem value={pro.slug} />
                                </FormControl>
                                <FormLabel>
                                  <RowWithIcon icon={pro.icon}>
                                    {pro.name}
                                  </RowWithIcon>
                                </FormLabel>
                              </FormItem>
                            ))
                          }
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex justify-between fixed md:static bottom-0 left-0 w-full px-5 py-2 bg-white border-t md:border-none md:p-0'>
                  <Button type="button" variant="ghost" size="lg" onClick={back}>Буцах</Button>
                  <Button type="submit" variant="secondary" size="lg">Үргэлжлүүлэх</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostAJob;
