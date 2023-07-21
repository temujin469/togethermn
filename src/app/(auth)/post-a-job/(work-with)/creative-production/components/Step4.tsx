"use client"

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import usePostJob from '@/hooks/usePostJob';
import React from 'react';
import Box from '../../components/Box';
import { useMutation } from '@tanstack/react-query';
import { myApi } from '@/utils/axios';
import { CircularProgress } from '@mui/material';
import { useUser } from '@/hooks/useUser';
import { useToast } from '@/components/ui/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import ReactQuill from 'react-quill';


function Step4() {
  const { previousStep, job } = usePostJob()
  const { user, token } = useUser()
  const { toast } = useToast()
  const router = useRouter()
  const params = useSearchParams()
  const update = params.get("update")

  const { mutate, isError, isLoading } = useMutation({
    mutationKey: ["job"],
    mutationFn: async () => {
      if (update) {
        const res = await myApi.put(`/azhils/${update}`, { data: { ...job, user: user?.id, status: "хүлээгдэж байгаа" } }, {
          headers: {
            Authorization: "Bearer " + token
          }
        });
        return res.data

      } else {

        let uploadedFiles: undefined | File[];
        // // first upload files if file exists
        if (job?.files.length) {
          const formData = new FormData();
          job?.files?.forEach((file) => formData.append("files", file, file.name));

          const uploadRes = await myApi.post<any[]>("/upload", formData, {
            headers: {
              Authorization: "Bearer " + token,
            }
          })
          uploadedFiles = uploadRes.data;
        }

        const res = await myApi.post("/azhils",
          { data: { ...job, user: user?.id, files: uploadedFiles, status: "хүлээгдэж байгаа" } },
          {
            headers: {
              Authorization: "Bearer " + token
            }
          });
        return res.data
      }
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Хүсэлт амжилттай"
      })
      router.push("/search/work");
    },
    onError: () => {
      toast({
        title: "Хүсэлт амжилтгүй",
        description: "Ямар нэгэн алдаа гарлаа",
        variant: "destructive"
      })
    }
  });


  const handleSubmit = () => {
    console.log(job)
    mutate();
  }


  return (
    <div className='flex gap-10 flex-col-reverse relative lg:flex-row'>
      <Box>
        {
          isLoading && <div className='absolute top-0 left-0 w-full h-full bg-white/50 flex justify-center items-center'><CircularProgress /></div>
        }
        <div className='space-y-6'>
          <div>
            <h1 className='text-xl font-semibold mb-3'>
              Урьдчилан үзэх
            </h1>
            <p className='text-gray-500 font-normal mb-4'>
              Та орхисон бүх зүйлээ эргэн харж, тааруулж болно. Та бүх зүйлд сэтгэл хангалуун болсны дараа "Илгээх" товчийг дарна уу!
            </p>
          </div>
          <h1 className='text-lg font-semibold'>
            {job?.title}
          </h1>
          <div>
            <Label>
              Ажлын дэлгэрэнгүй мэдээлэл</Label>
            <ReactQuill value={job?.description} modules={{ toolbar: null }} readOnly />
          </div>
          {
            job?.isAdditionalMaterial && (
              <div>
                <Label>
                  Нэмэлт материалууд</Label>
                <p className='text-gray-500'>{job?.additionalMaterial}</p>
              </div>
            )
          }
          <div className='grid grid-cols-2 gap-5'>
            <div>
              <Label>
                Огноо</Label>
              <p className='text-gray-500'>{job?.creativeProduction?.shootDate}</p>
            </div>
            <div>
              <Label>
                Байршил</Label>
              <p className='text-gray-500'>{job?.locations.join("\n")}</p>
            </div>
            <div>
              <Label>
                Төсөв</Label>
              <p className='text-gray-500'>{job?.budget}</p>
            </div>
            <div>
              <Label>
                Үргэлжлэх хугацаа
              </Label>
              <p className='text-gray-500'>{job?.creativeProduction?.requiredDate}</p>
            </div>
          </div>

        </div>
        <div className='flex justify-end mt-10'>
          <Button type="button" variant="ghost" size="lg" onClick={previousStep}>Буцах</Button>
          <Button onClick={handleSubmit} className='' variant="secondary" size="lg">
            Илгээх
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default Step4;
