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
import { useRouter } from 'next/navigation';
import usePostJob from '@/hooks/usePostJob';
import RowWithIcon from './RowWithIcon';


function SelectProfession({professions}:{professions?:ResponseProfession[]}) {


  // const { data: professions } = useQuery({ queryKey: ["professions"], queryFn: getProfessions })


  const pros = professions?.map(pro => pro.attributes.name.toLowerCase())
  const FormSchema = z.object({
    profession: z.enum(pros as [string, ...string[]], {
      required_error: "Та ямар нэгэн мэргэшил сонгох хэрэгтэй.",
    }),
  })


  // console.log(professions)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const { setJob,job,setStep } = usePostJob();

  const { push, back } = useRouter()

  function onSubmit(value: z.infer<typeof FormSchema>) {
    const profession = value.profession.toLowerCase();
    const selectedProfession = professions?.find(pro=>pro.attributes.name.toLowerCase() == profession)
    setStep(1);
    setJob({ profession:selectedProfession?.attributes.name,category:selectedProfession?.attributes.category });
    push(`/post-a-job/${selectedProfession?.attributes.category}`);
  }

  return (
    <div>
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
                      professions?.map(({attributes,id}) => (
                        <FormItem key={id} className="flex items-center space-x-3 space-y-0 rounded-lg border px-4 py-3 bg-gray-50 hover:bg-gray-100">
                          <FormControl>
                            <RadioGroupItem value={attributes.name.toLowerCase()} />
                          </FormControl>
                          <FormLabel>
                            <RowWithIcon>
                              {attributes.name}
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
  );
}

export default SelectProfession;
