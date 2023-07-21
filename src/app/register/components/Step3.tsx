"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import usePostJob from '@/hooks/usePostJob';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { Checkbox } from '@/components/ui/checkbox';
import Box from './Box';

const jobShema = z.object({
  usageFor: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Та дор хаяж нэг зүйлийг сонгох хэрэгтэй.",
  }),
})

function Step3() {
  const { nextStep, previousStep, job, setJob } = usePostJob()

  const [isUse, setIsUse] = useState(job?.isUse);


  const form = useForm<z.infer<typeof jobShema>>({
    resolver: zodResolver(jobShema),
    defaultValues: {
      usageFor: [],
      ...job
    }
  })

  const handleSubmit = (values: z.infer<typeof jobShema>) => {
    console.log(values)
    setJob({ ...values as Partial<typeof jobShema>,isUse })
    nextStep()
  }


  const items = [
    {
      id: "Онлайн",
      label: "Онлайн",
    },
    {
      id: "home",
      label: "Зар сурталчилгааны самбар",
    },
    {
      id: "applications",
      label: "Олон нийтийн сүлжээ",
    },
    {
      id: "desktop",
      label: "Дэлгүүрт",
    },
    {
      id: "downloads",
      label: "Сэтгүүл / Каталог / Хэвлэл",
    },
    {
      id: "documents",
      label: "Кино театр",
    },
    {
      id: "documents",
      label: "ТВ",
    },
    {
      id: "documents",
      label: "Бусад",
    },
  ] as const

  return (
    <div className='flex gap-10 flex-col-reverse lg:flex-row'>
      <Box>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-7'>
            <div>
              <h1 className='text-xl font-semibold mb-3'>
                Энэ агуулгыг хаана ашиглахыг та мэдэх үү?</h1>
              <p className='text-gray-500 font-normal mb-4'>
                Энэ хэсгийг бөглөснөөр together.mn дээр захиалга хийх ашиглалтын гэрээ бий болно. Хэрэв та итгэлгүй байгаа бол үүнийг дараа нь хэзээ ч хийж болно.</p>
            </div>

            <RadioGroup
              onValueChange={setIsUse}
              defaultValue={isUse}
            // value={String(isUse)}
            >
              <div className='flex gap-10'>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="no" />
                  </FormControl>
                  <FormLabel className='font-normal pl-2'>Хараахан үгүй</FormLabel>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="yes" />
                  </FormControl>
                  <FormLabel className='font-normal pl-2'>Тийм</FormLabel>
                  <FormMessage />
                </FormItem>
              </div>
            </RadioGroup>

            {
              isUse == "yes" && (
                <div className='space-y-6'>
                  <FormField
                    control={form.control}
                    name="usageFor"
                    render={() => (
                      <FormItem>
                        <div className="mb-2">
                          <Label>
                            Ямар төрлийн медиа ашиглах вэ? Холбогдох бүх зүйлийг сонгоно уу</Label>
                        </div>
                        {items.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="usageFor"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field?.value, item.id])
                                          : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )
            }
            <div className='flex justify-end'>
              <Button type="button" variant="ghost" size="lg" onClick={previousStep}>Буцах</Button>
              <Button type='submit' className='' variant="secondary" size="lg">
                Үргэлжлүүлэх
              </Button>
            </div>
          </form>
        </Form>
      </Box>
    </div>
  );
}

export default Step3;
