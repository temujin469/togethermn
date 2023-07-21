"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import usePostJob from '@/hooks/usePostJob';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import Box from '../../components/Box';
import { Checkbox } from '@/components/ui/checkbox';

const jobShema = z.object({
  useMediaTypes: z.optional(
    z.array(z.string())
  ),
  // howLongUse:z.optional(z.string())
})
// .superRefine(({useMediaTypes}, ctx) => {
//   if (true) {
//     ctx.addIssue({
//       code: "custom",
//       message: "Дээд нас нь доод наснаасаа их байх ёстой.",
//       path: ["minAge"]
//     })
//   }
// })


function Step3() {
  const { nextStep, previousStep, job, setJob } = usePostJob()

  const [isMakeContract, setIsMakeContract] = useState(job?.castTalent?.isMakeContract);

  useEffect(() => {
    form.resetField("useMediaTypes");
  }, [isMakeContract])


  const form = useForm<z.infer<typeof jobShema>>({
    resolver: zodResolver(jobShema),
    defaultValues: {
      useMediaTypes: job?.castTalent?.useMediaTypes || [],
      // howLongUse:job?.castTalent?.howLongUse,
    }
  })

  const handleSubmit = ({ useMediaTypes }: z.infer<typeof jobShema>) => {
    setJob({ ...job, castTalent: { ...job?.castTalent, useMediaTypes, isMakeContract } })
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
    <Box className='max-w-[800px] mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-7'>
          <div>
            <h1 className='text-xl font-semibold mb-3'>
              Энэ агуулгыг хаана ашиглахыг та мэдэх үү?</h1>
            <p className='text-gray-500 font-normal mb-4'>
              Энэ хэсгийг бөглөснөөр together.mn дээр захиалга хийх ашиглалтын гэрээ бий болно. Хэрэв та итгэлгүй байгаа бол үүнийг дараа нь хэзээ ч хийж болно.</p>
          </div>

          <RadioGroup
            onValueChange={(val) => setIsMakeContract(val === "true")}
            defaultValue={String(isMakeContract)}
          >
            <div className='flex gap-10'>
              <FormItem>
                <FormControl>
                  <RadioGroupItem value="false" />
                </FormControl>
                <FormLabel className='font-normal pl-2'>Хараахан үгүй</FormLabel>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormControl>
                  <RadioGroupItem value="true" />
                </FormControl>
                <FormLabel className='font-normal pl-2'>Тийм</FormLabel>
                <FormMessage />
              </FormItem>
            </div>
          </RadioGroup>

          {
            isMakeContract == true && (
              <div className='space-y-6'>
                <FormField
                  control={form.control}
                  name="useMediaTypes"
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
                          name="useMediaTypes"
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
                                        ? field.onChange([...field?.value as string[], item.id])
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
          <div className='flex justify-end gap-4 pt-10'>
            <Button type="button" variant="ghost" size="lg" onClick={previousStep}>Буцах</Button>
            <Button type='submit' className='' variant="secondary" size="lg">
              Үргэлжлүүлэх
            </Button>
          </div>
        </form>
      </Form>
    </Box>
  );
}

export default Step3;
