"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Select from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import QueryString from 'qs';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {  shoeSizes } from '@/utils/data';
import { Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import getAttributes from '@/utils/fetch/getAttributes';

const infoShema = z.object({
  age: z.optional(z.number()).nullable(),
  gender: z.optional(z.string()).nullable(), 
  bodyType: z.optional(z.string()).nullable(), 
  hairColor: z.optional(z.string()).nullable(), 
  eyeColor: z.optional(z.string()).nullable(), 
  shoeSize: z.optional(z.string()).nullable(), 
  shirtSize: z.optional(z.string()).nullable(),
  diet: z.optional(z.string()).nullable(),
  maritalStatus: z.optional(z.string()).nullable(),
})


function EditFeaturesModal() {

  const { token } = useUser()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)


  const handleClickOpen = () => {
    // form.reset({ ...user?.profile })
    setOpen(true);
  };

  const handleClose = () => {
    form.reset({ ...user?.profile })
    setOpen(false);
  };




  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: attributesData } = useQuery({
    queryKey: ["attributes"],
    queryFn: getAttributes
  })
  const attributes = attributesData?.attributes;



  const query = QueryString.stringify({
    populate: {
      profile: true
    }
  })

  const { data: user, isError, isLoading } = useQuery<Partial<User>>({
    queryKey: ["myProfile", "me", token],
    queryFn: async () => {
      const res = await myApi.get(`/users/me?${query}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      return res.data;
    }
  });


  const form = useForm<z.infer<typeof infoShema>>({
    resolver: zodResolver(infoShema),
    defaultValues: {
      ...user?.profile
    }
  })


  const updateMutation = useMutation({
    mutationFn: async (values: z.infer<typeof infoShema>) => {
      const res = await myApi.put(`/talents/${user?.profile?.id}`, { data: values }, {
        headers: {
          Authorization: "Bearer " + token
        }
      })

      return res.data;
    },
    onSuccess: () => {
      setOpen(false)
      toast({
        title: "Хүсэлт амжилттай",
        description: "Таны мэдээлэл амжилттай шинэчлэгдлээ",
        variant: "success",
      })
      queryClient.invalidateQueries(["myProfile"])
      queryClient.invalidateQueries(["user"])
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive",
      })
    }
  })

  const handleSubmit = (values: z.infer<typeof infoShema>) => {
    console.log(values)
    updateMutation.mutate(values);
  }

  return (
    <div>
      <div className='flex justify-end mt-5'>
        <Button onClick={handleClickOpen}>Засах</Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Ерөнхий мэдээлэл
        </DialogTitle>
        <DialogContent className='sm:w-[400px]'>
          <Form {...form}>
            <form className='space-y-5 mb-4'>
              <FormField
                control={form.control}
                name="age"
                defaultValue={user?.profile?.age}
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between'>
                    <Label>Нас</Label>
                    <FormControl>
                      <Input className='w-[160px]' type='number' value={field.value as number} onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                defaultValue={user?.profile?.gender}
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between'>
                    <Label>Хүйс</Label>
                    <FormControl>
                      <Select defaultValue={field.value!} onChange={field.onChange} values={attributes?.genders.map((gender) => ({ value: gender.value, label: gender.value }))!}
                        className="w-[160px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bodyType"
                defaultValue={user?.profile?.bodyType}
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between'>
                    <Label>Биеийн хэлбэр</Label>
                    <FormControl>
                      <Select defaultValue={field.value!} onChange={field.onChange} values={attributes?.bodyTypes.map((type) => ({ label: type.value, value: type.value }))} className="w-[160px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hairColor"
                defaultValue={user?.profile?.hairColor}
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between'>
                    <Label>Үсний өнгө</Label>
                    <FormControl>
                      <Select defaultValue={field.value!} onChange={field.onChange} values={attributes?.hairColors.map((color) => ({ label: color.value, value: color.value }))} className="w-[160px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eyeColor"
                defaultValue={user?.profile?.eyeColor}
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between'>
                    <Label>Нүдгий өнгө</Label>
                    <FormControl>
                      <Select defaultValue={field.value!} onChange={field.onChange} values={attributes?.eyeColors.map((color) => ({ label: color.value, value: color.value }))} className="w-[160px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shoeSize"
                defaultValue={user?.profile?.shoeSize}
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between'>
                    <Label>Гутлын хэмжээ</Label>
                    <FormControl>
                      <Select defaultValue={field.value!} onChange={field.onChange} values={
                        Array(41).fill(null).map((_,i)=>({
                          value:i+20,
                          label:i+20
                        }))
                      } className="w-[160px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shirtSize"
                defaultValue={user?.profile?.shirtSize}
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between gap-4'>
                    <Label>Цамцны хэмжээ</Label>
                    <FormControl>
                      <Select
                        className="w-[160px]"
                        defaultValue={field.value!}
                        onChange={field.onChange}
                        values={attributes?.shirtSizes.map((size) => ({ label: size.value, value: size.value }))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="diet"
                defaultValue={user?.profile?.diet}
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between gap-4'>
                    <Label>Хоолны дэглэм</Label>
                    <FormControl>
                      <Select
                        className="w-[160px]"
                        defaultValue={field.value!}
                        onChange={field.onChange}
                        values={attributes?.diets.map((diet) => ({ label: diet.value, value: diet.value }))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maritalStatus"
                defaultValue={user?.profile?.maritalStatus}
                render={({ field }) => (
                  <FormItem className='flex items-center justify-between gap-4'>
                    <Label>Гэр бүлийн байдал</Label>
                    <FormControl>
                      <Select
                        className="w-[160px]"
                        defaultValue={field.value!}
                        onChange={field.onChange}
                        values={attributes?.maritalStatus.map((status) => ({ label: status.value, value: status.value }))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
           
            </form>
          </Form>
        </DialogContent>
        <DialogActions className='p-4'>
          <Button type="submit" variant="ghost" onClick={handleClose}>Болих</Button>
          <Button variant="secondary" onClick={form.handleSubmit(handleSubmit)}>Хадгалах</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditFeaturesModal;
