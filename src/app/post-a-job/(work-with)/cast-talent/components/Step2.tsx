"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem,FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import usePostJob from '@/hooks/usePostJob';
import { zodResolver } from '@hookform/resolvers/zod';
import React  from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import Box from '../../components/Box';
import Select from '@/components/ui/select';

const jobShema = z.object({
  typeOfTalent: z.string(),
  minAge: z.number(),
  maxAge: z.number(),
  gender: z.string(),
  hairColor: z.string(),
  minHeight: z.number(),
  bodyType: z.string(),
})

function Step2() {
  const { nextStep, previousStep, job, setJob } = usePostJob()

  const form = useForm<z.infer<typeof jobShema>>({
    resolver: zodResolver(jobShema),
    defaultValues: {
      ...job
    }
  })

  const handleSubmit = (values: z.infer<typeof jobShema>) => {
    console.log(values)
    setJob({ ...values as Partial<typeof jobShema> })
    nextStep()
  }


  return (
    <Box className='max-w-[800px] mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-7'>
          <h1 className='text-xl font-semibold'>
            Илүү дэлгэрэнгүй мэдээллийг нэмнэ үү</h1>

          <FormField
            control={form.control}
            name="typeOfTalent"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Ямар төрлийн авъяас чадвараа тоглуулахыг хүсч байгаагаа тодорхойл</Label>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex sm:flex-row flex-col w-full gap-5'>
            <div className='flex flex-[1] gap-5'>
              <FormField
                control={form.control}
                name="minAge"
                render={({ field }) => (
                  <FormItem className='flex-[1]'>
                    <Label>Насны хүрээ</Label>
                    <FormControl>
                      <Input placeholder='Багадаа' type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
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
                      <Input placeholder='Ихдээ' type="number" {...field} onChange={(e)=>field.onChange(Number(e.target.value))} />
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
                      [{
                        value: 'эрэгтэй',
                        label: 'эрэгтэй'
                      },
                      {
                        value: 'эмэгтэй',
                        label: 'эмэгтэй'
                      },
                      {
                        value: 'Бүгд',
                        label: 'Бүгд'
                      }
                      ]
                    } className='w-full' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex w-full gap-5'>
            <FormField
              control={form.control}
              name="hairColor"
              render={({ field }) => (
                <FormItem className='flex-[1]'>
                  <Label>Үсний өнгө</Label>
                  <FormControl>
                    <Select defaultValue={field.value} onChange={(val) => field.onChange(val as any)} values={
                      [{
                        value: 'Хар',
                        label: 'Хар',
                      }, {
                        value: 'Бор',
                        label: 'Бор',
                      },
                      {
                        value: 'Улаан',
                        label: 'Улаан',
                      },
                      {
                        value: 'Шаргал',
                        label: 'Шаргал',
                      }
                      ]
                    } className='w-full' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minHeight"
              render={({ field }) => (
                <FormItem className='flex-[1]'>
                  <Label>Хамгийн бага өндөр (см)</Label>
                  <FormControl>
                    <Select defaultValue={field.value?.toString()} onChange={(val) => field.onChange(Number(val))} values={
                      Array(101).fill(null).map((_, i) => (
                        {
                          value: `${(i + 120)}`,
                          label: `${(i + 120)}cm`
                        }
                      ))
                    } className='flex-[1]' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="bodyType"
            render={({ field }) => (
              <FormItem className='flex-[1]'>
                <Label>Биеийн хэлбэр</Label>
                <FormControl>
                  <Select defaultValue={field.value} onChange={field.onChange} values={
                    [
                      {
                        value: 'туранхай',
                        label: 'туранхай',
                      }, {
                        value: 'булчинлаг',
                        label: 'булчинлаг',
                      },
                      {
                        value: 'тарган',
                        label: 'тарган',
                      },
                      {
                        value: 'дундаж',
                        label: 'дундаж',
                      }
                    ]
                  } className='w-full' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
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
