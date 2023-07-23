"use client"
import MultipleSelect from '@/components/ui/MultipleSelect';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Select from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import { myApi } from '@/utils/axios';
import getAttributes from '@/utils/fetch/getAttributes';
import getProfessions from '@/utils/fetch/getProfessions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery, useTheme } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Pencil } from 'lucide-react';
import QueryString from 'qs';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';



const infoShema = z.object({
  firstname:z.string(),
  lastname:z.string(),
  professions: z.string().array().nonempty(),
  location: z.string()
})

function EditInfoModal() {

  const { token } = useUser()
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)


  const handleClickOpen = () => {
    form.reset({ ...user?.profile })
    setOpen(true);
  };

  const handleClose = () => {
    form.reset({ ...user?.profile })
    setOpen(false);
  };




  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: professions } = useQuery({ queryKey: ["professions"], queryFn: getProfessions })

  const { data: attributes } = useQuery({
    queryKey: ["attributes"],
    queryFn: getAttributes
  })

  const query = QueryString.stringify({
    populate: {
      profile: {
        fields: ["professions", "location","firstname", "lastname"]
      }
    }
  })

  const { data: user, isError, isLoading } = useQuery<Partial<User>>({
    queryKey: ["myProfile", "me", token],
    queryFn: async () => {
      const res = await myApi.get(`/api/users/me?${query}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      return res.data;
    }
  });

  console.log("user", user)


  const form = useForm<z.infer<typeof infoShema>>({
    resolver: zodResolver(infoShema),
    defaultValues: {
      firstname:user?.profile?.firstname,
      lastname:user?.profile?.lastname,
      professions: user?.profile?.professions,
      location: user?.profile?.location,
    }
  })

  const updateMutation = useMutation({
    mutationFn: async (values: z.infer<typeof infoShema>) => {
      const res = await myApi.put(`/api/talents/${user?.profile?.id}`, { data: values }, {
        headers: {
          Authorization: "Bearer " + token
        }
      })

      return res.data;
    },
    onSuccess: () => {
      handleClose()
      toast({
        title: "Хүсэлт амжилттай",
        description: "Таны мэдээлэл амжилттай шинэчлэгдлээ",
        variant: "success",
      })
      queryClient.invalidateQueries(["myProfile"])
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
    updateMutation.mutate(values);
  }

  return (
    <div className='w-full'>
      <Button className='w-full gap-2' onClick={handleClickOpen}><Pencil size={18} />Засах</Button>
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
            <form className='space-y-6'>
              <FormField
                control={form.control}
                defaultValue={user?.profile?.firstname}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <Label>Өөрийн нэр</Label>
                    <FormControl>
                      <Input {...field}/>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                defaultValue={user?.profile?.lastname}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <Label>Овог нэр</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                defaultValue={user?.profile?.professions as [string, ...string[]] | undefined}
                name="professions"
                render={({ field }) => (
                  <FormItem>
                    <Label>Мэргэжил</Label>
                    <FormControl>
                      <MultipleSelect value={field?.value} values={professions?.map(pro=>pro.attributes.name)} onChange={(val) => field?.onChange(val as any)} />
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
                defaultValue={user?.profile?.location}
                render={({ field }) => (
                  <FormItem className='flex-[1]'>
                    <Label>Байршил</Label>
                    <FormControl>
                      <Select defaultValue={field.value} onChange={field.onChange}
                        values={
                          attributes?.attributes.locations.map((location) => ({ value: location.value, label: location.value }))!
                        }
                        className='w-full' />
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

export default EditInfoModal;
