"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import usePostJob from '@/hooks/usePostJob';
import { zodResolver } from '@hookform/resolvers/zod';
import { MenuItem, OutlinedInput, Select } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import Box from './Box';

const jobShema = z.object({
  title: z.string(),
  description: z.string(),
  photos: z.optional(z.any().array()),
  shootDate: z.string(),
  requiredDate: z.string(),
  locations: z.string().array().nonempty(),
  additionalMaterial: z.optional(z.string()),
})

function Step1() {
  const { nextStep, job, setJob } = usePostJob()

  const [isAdditionalMaterial, setIsAdditionalMaterial] = useState(job?.isAdditionalMaterial);

  const form = useForm<z.infer<typeof jobShema>>({
    resolver: zodResolver(jobShema),
    defaultValues: {
      locations: [],
      photos:[],

      ...job as Partial<typeof jobShema>
    }
  })

  const handleSubmit = (values: z.infer<typeof jobShema>) => {
    console.log(values)
    setJob({ ...values as Partial<typeof jobShema>,isAdditionalMaterial })
    nextStep()
  }

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

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
                  <Label>Брэнд болон ажлын байрыг тайлбарлана уу</Label>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photos"
              render={({ field }) => (
                <FormItem>
                  <Label>Зөв өргөдөл гаргагчдыг олж авахад тань туслахын тулд гэрэл зураг эсвэл лавлах медиа нэмнэ үү!</Label>
                  <FormControl>
                    {/* <FileInput onChange={field.onChange} file={field.value}/> */}
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
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      className='w-full h-[40px] rounded-md'
                      value={field.value}
                      onChange={(val) => field.onChange(val.target.value as [string, ...string[]] | React.ChangeEvent<Element>)}
                      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                      renderValue={(selected) => (

                        <div>
                          {selected.map((value) => (
                            <Badge className='bg-gray-100 text-gray-700'>{value}</Badge>
                          ))}
                        </div>
                      )}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: 230,
                          },
                        },
                      }}
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                        // style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Шаардлагатай бол та олон байршлыг сонгож болно</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />


            <RadioGroup
              onValueChange={setIsAdditionalMaterial}
              defaultValue={isAdditionalMaterial}
            // value={String(isAdditionalMaterial)}
            >
              <Label>
                Авьяас өргөдөл гаргахдаа нэмэлт материал өгөх ёстой юу?</Label>
              <div className='md:flex gap-10'>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="no" />
                  </FormControl>
                  <FormLabel className='font-normal pl-2'>Үгүй ээ, дээрх багц одоогоор хангалттай</FormLabel>
                  <FormMessage />
                </FormItem>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="yes" />
                  </FormControl>
                  <FormLabel className='font-normal pl-2'>Тиймээ</FormLabel>
                  <FormMessage />
                </FormItem>
              </div>
            </RadioGroup>
            {
              isAdditionalMaterial == "yes" && (
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
            <div className='flex justify-end'>
              <Button type="button" variant="ghost" size="lg">Буцах</Button>
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

export default Step1;
