"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import usePostJob from '@/hooks/usePostJob';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import Box from '../../components/Box';
import Select from '@/components/ui/select';
import MultipleSelect from '@/components/ui/MultipleSelect';
import { bodyTypes, hairColors } from '@/utils/data';
import getAttributes from '@/utils/fetch/getAttributes';
import { useQuery } from '@tanstack/react-query';

const jobShema = z.object({
  descTypeOfTalent: z.string(),
  minAge: z.number(),
  maxAge: z.number(),
  gender: z.string().toLowerCase(),
  hairColor: z.string().toLowerCase(),
  minHeight: z.number(),
  bodyType: z.string().array().nonempty(),
}).superRefine(({ maxAge, minAge }, ctx) => {
  if (minAge >= maxAge) {
    ctx.addIssue({
      code: "custom",
      message: "Дээд нас нь доод наснаасаа их байх ёстой.",
      path: ["minAge"]
    })
  }
})

function Step2() {

  const { data } = useQuery({ queryKey: ["attributes"], queryFn: getAttributes })
  const attributes = data?.attributes;

  const { nextStep, previousStep, job, setJob } = usePostJob()

  const form = useForm<z.infer<typeof jobShema>>({
    resolver: zodResolver(jobShema),
    defaultValues: {
      bodyType:job?.castTalent?.bodyType || [],
      hairColor:job?.castTalent?.hairColor,
      descTypeOfTalent:job?.castTalent?.descTypeOfTalent,
      minHeight:job?.castTalent?.minHeight,
      ...job
    }
  })

  const handleSubmit = ({minAge,minHeight,maxAge,bodyType,hairColor,gender,descTypeOfTalent}: z.infer<typeof jobShema>) => {
    setJob({...job, castTalent: { ...job?.castTalent, minHeight, hairColor, bodyType, descTypeOfTalent },minAge,maxAge,gender})
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
            name="descTypeOfTalent"
            render={({ field }) => (
              <FormItem>
                <Label>
                  Ямар төрлийн авъяас чадвараа тоглуулахыг хүсч байгаагаа тодорхойл</Label>
                <FormControl>
                  <Textarea {...field}/>
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
                            value: (i+10).toString(),
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
                     attributes?.genders.map(gender=>({value:gender.value,label:gender.value}))
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
                    <Select defaultValue={field.value} onChange={(val) => field.onChange(val as any)} 
                    values={
                      attributes?.hairColors.map(att => ({ value: att.value, label: att.value }))
                    } 
                      className='w-full' />
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
                  <Label>Хамгийн багадаа өндөр (см)</Label>
                  <FormControl>
                    <Select defaultValue={field.value?.toString()} onChange={(val) => field.onChange(Number(val))} values={
                      Array(150).fill(null).map((_, i) => (
                        {
                          value: `${(i + 100)}`,
                          label: `${(i + 100)}cm`
                        }
                      ))
                    } className='flex-[1]' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <h1 className='text-xl font-semibold'>
              Та хаанаас өргөдөл хүлээн авахыг хүсч байна вэ?</h1>
            <p className='text-gray-500 font-normal mb-4'>
              Ажил горилогчид дэлхийн аль улс орнуудаас ажилд орохыг хүсч байгаагаа сонгоорой</p>
          </div>
          <FormField
            control={form.control}
            name="bodyType"
            render={({ field }) => (
              <FormItem>
                <Label>Биеийн хэлбэр</Label>
                <FormControl>
                  <MultipleSelect
                    values={
                      attributes?.bodyTypes.map(att => att.value)
                    }
                    value={field.value}
                    onChange={(val) => field.onChange(val as [string, ...string[]] | ChangeEvent<Element>)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
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
