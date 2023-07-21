"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem,FormLabel,FormMessage } from '@/components/ui/form';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useQuery } from '@tanstack/react-query';
import getAttributes from '@/utils/fetch/getAttributes';

const jobShema = z.object({
  descTypeOfInfluencer: z.string(),
  tiktokFollowers: z.optional(z.number()),
  youtubeFollowers: z.optional(z.number()),
  instagramFollowers: z.optional(z.number()),
  minAge: z.number(),
  maxAge: z.number(),
  gender: z.string(),
  areaOfExpertise: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Та дор хаяж нэг ангилал сонгох хэрэгтэй.",
  }),
}).superRefine(({maxAge,minAge},ctx)=>{
  if(minAge >= maxAge){
    ctx.addIssue({
      code:"custom",
      message: "Дээд нас нь доод наснаасаа их байх ёстой.",
      path:["minAge"]
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
      areaOfExpertise:job?.influencer?.areaOfExpertise || [],
      descTypeOfInfluencer:job?.influencer?.descTypeOfInfluencer,
      tiktokFollowers: job?.influencer?.tiktokFollowers,
      youtubeFollowers: job?.influencer?.youtubeFollowers,
      instagramFollowers: job?.influencer?.instagramFollowers,
      ...job
    }
  })

  console.log(job)

  const handleSubmit = ({areaOfExpertise ,descTypeOfInfluencer,tiktokFollowers,youtubeFollowers,instagramFollowers,maxAge,minAge,gender}: z.infer<typeof jobShema>) => {
    // console.log(values)
    setJob({...job, influencer:{...job?.influencer,areaOfExpertise,descTypeOfInfluencer,tiktokFollowers,youtubeFollowers,instagramFollowers},minAge,maxAge,gender })
    nextStep()
  }


  const areas = [
    'Загвар',
    'Гэр бүл',
    'Хоол хүнс',
    'Гоо сайхан',
    'Тансаг байдал',
    'Эрүүл мэнд',
  ];


  return (
    <Box className='max-w-[800px] mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-7'>
          <FormField
            control={form.control}
            name="descTypeOfInfluencer"
            render={({ field }) => (
              <FormItem>
                <Label>Хамтран ажиллахыг хүсч буй нөлөөлөгчдийн төрлийг тайлбарлана уу</Label>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
          control={form.control}
          name="areaOfExpertise"
          render={({ field }) => (
            <FormItem>
              <div className='mb-4'>
                <Label>Мэргэшсэн чиглэлүүд</Label>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                {areas.map((item) => (
                  <FormField
                    key={item}
                    control={form.control}
                    name="areaOfExpertise"
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

          <FormField
            control={form.control}
            name="instagramFollowers"
            render={({ field }) => (
              <FormItem className='flex-[1]'>
                <Label>
                  instagram дагагч нар</Label>
                <FormControl>
                  <Input placeholder='Багадаа' type='number' value={Boolean(field.value) ? Number(field.value) : undefined}  onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tiktokFollowers"
            render={({ field }) => (
              <FormItem className='flex-[1]'>
                <Label>
                  tiktok дагагч нар</Label>
                <FormControl>
                  <Input placeholder='Багадаа' type='number' value={Boolean(field.value) ? Number(field.value) : undefined} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="youtubeFollowers"
            render={({ field }) => (
              <FormItem className='flex-[1]'>
                <Label>
                  youtube дагагч нар</Label>
                <FormControl>
                  <Input placeholder='Багадаа' type='number' value={Boolean(field.value) ? Number(field.value) : undefined} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h1 className='text-xl font-semibold'>
            Илүү дэлгэрэнгүй мэдээллийг нэмнэ үү!
          </h1>

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
                      attributes?.genders.map(gender=>({value: gender.value,label: gender.value}))
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
