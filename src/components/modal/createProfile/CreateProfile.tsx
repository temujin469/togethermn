"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
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
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import useCreateProfileModal from '@/hooks/useCreateProfileModal';
import MultipleSelect from '@/components/ui/MultipleSelect';
import getProfessions from '@/utils/fetch/getProfessions';
import { useRouter } from 'next/navigation';
import getAttributes from '@/utils/fetch/getAttributes';

const infoShema = z.object({
  professions: z.string().array().nonempty(),
  location: z.string(),
  firstname: z.string(),
  lastname: z.string()
})


function CreateProfile() {

  const { data: professions } = useQuery({ queryKey: ["professions"], queryFn: getProfessions })

  const {data} = useQuery({queryKey:["attributes"],queryFn:getAttributes});
  const attributes = data?.attributes;

  const { token ,user} = useUser()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const router = useRouter()

  const {open,onClose,onOpen} = useCreateProfileModal()


  const handleClose = () => {
    onClose()
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const query = QueryString.stringify({
    populate: {
      profile: true
    }
  })

  const form = useForm<z.infer<typeof infoShema>>({
    resolver: zodResolver(infoShema),
  })

  const createMutation = useMutation({
    mutationKey:["myProfile"],
    mutationFn: async (values: z.infer<typeof infoShema>) => {
      const res = await myApi.post(`/talents`, { data: {user:user?.id,...values} }, {
        headers: {
          Authorization: "Bearer " + token
        }
      })

      await myApi.put(`/users/${user?.id}`, { isCreatedProfile:true  }, {
        headers: {
          Authorization: "Bearer " + token
        }
      })

      return res.data;
    },
    onSuccess: () => {
      router.push("/profile")
      onClose()
      toast({
        title: "Хүсэлт амжилттай",
        description: "Таны профайл амжилттай үүслээ",
        variant: "success",
      })
      queryClient.invalidateQueries(["me"])
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
    createMutation.mutate(values);
  }


  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Профайл үүсгэх
        </DialogTitle>
        <DialogContent className='sm:w-[400px] relative'>
          <DialogContentText className='mb-5 flex'>
            Та өөрийн гэсэн профайлаа үүсгэн үү
          
          </DialogContentText>
          <Form {...form}>
            <form className='space-y-5 mb-4'>
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <Label>Өөрийн нэр</Label>
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <Label>Овог</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                  control={form.control}
                  name="professions"
                  render={({ field }) => (
                    <FormItem>
                      <Label>Мэргэжил</Label>
                      <FormControl>
                        <MultipleSelect value={field?.value || []} values={professions?.map((pro)=>pro.attributes.name) as string[]} onChange={(val) => field?.onChange(val as any)} />
                      </FormControl>
                      <FormDescription>
                        Шаардлагатай бол та олон мэргэжил сонгож болно</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className='flex-[1]'>
                      <Label>Байршил</Label>
                      <FormControl>
                        <Select defaultValue={field.value} onChange={field.onChange} values={
                         attributes?.locations.map(att=>({value:att.value,label:att.value}))
                        } className='w-full' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </form>
          </Form>
        </DialogContent>
        <DialogActions className='p-4'>
          <CircularProgress size={25} hidden={!createMutation.isLoading} className='mr-5'/>
          <Button variant="secondary" disabled={createMutation.isLoading} onClick={form.handleSubmit(handleSubmit)}>Үүсгэх</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateProfile;
