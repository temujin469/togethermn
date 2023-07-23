"use client"

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import usePostJob from '@/hooks/usePostJob';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import Box from '../../components/Box';
import FileInput from '../../components/FileInput';
import Tip1 from '../../components/tip/Tip1';
import MultipleSelect from '@/components/ui/MultipleSelect';
import { useRouter } from 'next/navigation';
import ReactQuill from 'react-quill';
import { useQuery } from '@tanstack/react-query';
import getAttributes from '@/utils/fetch/getAttributes';

const jobShema = z.object({
  title: z.string(),
  description: z.string(),
  files: z.optional(z.any().array()),
  shootDate: z.string(),
  requiredDate: z.string(),
  locations: z.string().array().nonempty(),
  additionalMaterial: z.optional(z.string()),
})

function Step1() {

  const { data } = useQuery({ queryKey: ["attributes"], queryFn: getAttributes })
  const attributes = data?.attributes;


  const { nextStep, job, setJob } = usePostJob();

  const router = useRouter()

  const [isAdditionalMaterial, setIsAdditionalMaterial] = useState(job?.isAdditionalMaterial);

  useEffect(() => {
    form.resetField("additionalMaterial");
  }, [isAdditionalMaterial])


  const form = useForm<z.infer<typeof jobShema>>({
    resolver: zodResolver(jobShema),
    defaultValues: {
      locations: [],
      files:job?.files as any | [],
      shootDate: job?.creativeProduction?.shootDate,
      requiredDate: job?.creativeProduction?.requiredDate,
      ...job
    }
  })

  const handleSubmit = ({ title, description, files, requiredDate, shootDate, locations, additionalMaterial }: z.infer<typeof jobShema>) => {
    // console.log(values)

    setJob({...job, creativeProduction: { ...job?.creativeProduction, shootDate, requiredDate }, title, description, files, additionalMaterial, isAdditionalMaterial, locations })
    nextStep()
  }


  return (
    <div className='flex gap-10 flex-col-reverse lg:flex-row'>
      <Box>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-7'>
            <div>
              <h1 className='text-xl font-semibold mb-3'>
                Ажлын талаар бидэнд хэлээрэй</h1>
              <p className='text-gray-500 font-normal mb-4'>
                Ажилд юу багтаж байгааг тайлбарла. Илүү дэлгэрэнгүй мэдээлэл авах тусам илүү сайн өргөдөл гаргагч хүлээн авах болно!</p>
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label>
                    Таны ажлын гарчиг юу вэ?</Label>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <Label>Дэлгэрэнгүй мэдээлэл</Label>

                  <FormControl className='border p-2 hover:border-blue-400'>
                    <ReactQuill className='rounded-lg' theme="snow" value={field.value} onChange={(val) => field.onChange(val)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="files"
              render={({ field }) => (
                <FormItem>
                  <Label>Зөв өргөдөл гаргагчдыг олж авахад тань туслахын тулд гэрэл зураг эсвэл лавлах медиа нэмнэ үү!</Label>
                  <FormControl>
                    <FileInput onChange={field.onChange} files={field.value as File[]} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-full gap-5'>
              <FormField
                control={form.control}
                name="shootDate"
                render={({ field }) => (
                  <FormItem className='flex-[1]'>
                    <Label>Таны зураг авалтын огноо хэзээ вэ?</Label>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Хэрэв та тодорхой огноог мэдэхгүй бол ойролцоо тоо эсвэл TBC нэмнэ үү</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requiredDate"
                render={({ field }) => (
                  <FormItem className='flex-[1]'>
                    <Label>Хэдэн өдөр, хэдэн цаг шаардагдах вэ?</Label>
                    <FormControl>
                      <Input type="text" {...field} />
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
              name="locations"
              render={({ field }) => (
                <FormItem>
                  <Label>Байршил</Label>
                  <FormControl>
                    <MultipleSelect value={field.value} values={attributes?.locations.map(location=>location.value)} onChange={(val) => field.onChange(val as any)} />
                  </FormControl>
                  <FormDescription>
                    Шаардлагатай бол та олон байршлыг сонгож болно</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <RadioGroup
              onValueChange={(val) => setIsAdditionalMaterial(val === "true")}
              defaultValue={String(isAdditionalMaterial)}
            >
              <Label>
                Авьяас өргөдөл гаргахдаа нэмэлт материал өгөх ёстой юу?</Label>
              <div className='md:flex gap-10'>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="false" />
                  </FormControl>
                  <FormLabel className='font-normal pl-2'>Үгүй ээ, дээрх багц одоогоор хангалттай</FormLabel>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="true" />
                  </FormControl>
                  <FormLabel className='font-normal pl-2'>Тиймээ</FormLabel>
                  <FormMessage />
                </FormItem>
              </div>
            </RadioGroup>
            {
              isAdditionalMaterial == true && (
                <FormField
                  control={form.control}
                  name="additionalMaterial"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Өргөдөл гаргагч бүрээс танд хэрэгтэй тодорхой зураг эсвэл видео бичлэгийг тайлбарлана уу</Label>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            }
            <div className='flex justify-end gap-4 pt-10'>
              <Button type="button" variant="ghost" size="lg" onClick={()=>router.back()}>Буцах</Button>
              <Button type='submit' className='' variant="secondary" size="lg">
                Үргэлжлүүлэх
              </Button>
            </div>
          </form>
        </Form>
      </Box>
      {/* tip1 for step1 */}
      <Tip1 />
    </div>
  );
}

export default Step1;
