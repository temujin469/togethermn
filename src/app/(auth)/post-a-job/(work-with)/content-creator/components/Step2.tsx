"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import usePostJob from '@/hooks/usePostJob';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import Box from '../../components/Box';
import Select from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useQuery } from '@tanstack/react-query';
import getAttributes from '@/utils/fetch/getAttributes';

const jobShema = z.object({
  categoryOfCreator: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "Та дор хаяж нэг ангилал сонгох хэрэгтэй.",
    }),
  descTypeOfCreator: z.string(),
  minAge: z.number(),
  maxAge: z.number(),
  gender: z.string().toLowerCase(),
}).superRefine(({ maxAge, minAge }, ctx) => {
  if (minAge >= maxAge) {
    ctx.addIssue({
      code: "custom",
      message: "Дээд нас нь доод наснаасаа их байх ёстой.",
      path: ["minAge"]
    })
  }
})

const categories = [
  'Загвар',
  'Хоол хүнс',
  'Гоо сайхан',
  'Тансаг зэрэглэлийн',
  'Бизнес ба технологи',
  'Аялал',
  'Эрүүл мэнд, фитнесс',
  'Гэр, цэцэрлэг',
  'Хөгжим',
  'Агуулга үүсгэх',
  'Ерөнхий амьдралын хэв маяг',
  'Алдартан',
]

function Step2() {

  const { data } = useQuery({ queryKey: ["attributes"], queryFn: getAttributes })
  const attributes = data?.attributes;

  const { nextStep, previousStep, job, setJob } = usePostJob()

  const form = useForm<z.infer<typeof jobShema>>({
    resolver: zodResolver(jobShema),
    defaultValues: {
      categoryOfCreator: job?.contentCreator?.categoryOfCreator || [],
      ...job
    }
  })

  const handleSubmit = ({ minAge, categoryOfCreator, maxAge, gender, descTypeOfCreator }: z.infer<typeof jobShema>) => {
    console.log(categoryOfCreator);
    setJob({...job, contentCreator: { ...job?.castTalent, categoryOfCreator, descTypeOfCreator }, minAge, maxAge, gender })
    nextStep()
  }


  return (
    <Box className='max-w-[800px] mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-7'>
          <FormField
            control={form.control}
            name="descTypeOfCreator"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Хамтран ажиллахыг хүсч буй контент бүтээгчдийн төрлийг тайлбарлана уу</Label>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <h1 className='text-xl font-semibold'>
              Зохиогчийн аль ангилал хамгийн тохиромжтой вэ?</h1>
            <p className='text-gray-500 font-normal mb-4'>
              Таны кампанит ажилд хамгийн тохиромжтой зохиогчдын ангиллыг сонгоорой</p>
          </div>

            <FormField
              control={form.control}
              name="categoryOfCreator"
              render={() => (
                <FormItem>
                  <div className='grid grid-cols-2 gap-4'>
                    {categories.map((item) => (
                      <FormField
                        key={item}
                        control={form.control}
                        name="categoryOfCreator"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field?.value as string[], item])
                                      : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item
                                        )
                                      )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

          <div>
            <h1 className='text-xl font-semibold'>
              Илүү дэлгэрэнгүй мэдээллийг нэмнэ үү!</h1>
          </div>

          <div className='flex sm:flex-row flex-col w-full gap-5'>
            <div className='flex flex-[1] gap-5'>
              <FormField
                control={form.control}
                name="minAge"
                render={({ field }) => (
                  <FormItem className='flex-[1]'>
                    <Label>Насны хүрээ</Label>
                    <FormControl>
                      <Select defaultValue={field.value} onChange={(val) => field.onChange(Number(val))} placeholder='Багадаа' values={
                        Array(90).fill(null).map((_, i) => (
                          {
                            value: (i + 10).toString(),
                            label: (i + 10).toString()
                          }
                        ))
                      } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxAge"
                render={({ field }) => (
                  <FormItem className='flex-[1]'>
                    <div className='mt-[32px]'></div>
                    <FormControl>
                      <Select defaultValue={field.value} onChange={(val) => field.onChange(Number(val))} placeholder='Ихдээ' values={
                        Array(90).fill(null).map((_, i) => (
                          {
                            value: (i + 10).toString(),
                            label: (i + 10).toString()
                          }
                        ))
                      } />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className='flex-[1]'>
                  <Label>Хүйс</Label>
                  <FormControl>
                    <Select defaultValue={field.value} onChange={field.onChange} values={
                     attributes?.genders.map((att)=>({value:att.value,label:att.value}))
                    } className='w-full' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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

export default Step2;
