"use client"
import SubHeader from '@/components/header/SubHeader';
import { H2 } from '@/components/ui/Typography/Heading';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { myApi } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { NumericFormat } from 'react-number-format';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-photo-view/dist/react-photo-view.css';

type Props = {
  params: {
    id: string
  }
}

function page({ params }: Props) {

  const { data, isLoading, isError } = useQuery<JobDetailResponse>({
    queryKey: ["job-detail", params.id],
    queryFn: async () => {
      const res = await myApi.get(`/api/azhils/${params.id}?populate=*`);
      return res.data;
    }
  });

  console.log(data);

  const job = data?.data?.attributes;

  const images = job?.files.data.filter((file) => file.attributes.ext === ".jpg")
  const docs = job?.files.data.filter((file) => file.attributes.ext === ".docx")

  const detail = (
    <div>

      <H2>{job?.title}</H2>
      <p className='text-gray-400 font-semibold'>ID-{params.id}</p>
      <p className='text-lg font-semibold mb-2'>{job?.profession}</p>
      <p className='text-lg font-semibold'>Ажлын дэлгэрэнгүй мэдээлэл</p>
      <div className='mb-5'>
        <ReactQuill readOnly modules={{ toolbar: null }} value={job?.description} />
        {/* <div dangerouslySetInnerHTML={{ __html: job?.description as string | TrustedHTML }}/> */}
      </div>
      <p className='text-lg font-semibold'>
        Хамгийн тохиромжтой нэр дэвшигч</p>
      {job?.influencer && <p className='mb-5'>{job.influencer.descTypeOfInfluencer}</p>}
      {job?.contentCreator && <p className='mb-5'>{job.contentCreator.descTypeOfCreator}</p>}
      {job?.castTalent && <p className='mb-5'>{job.castTalent.descTypeOfTalent}</p>}
      {
        job?.castTalent ? (
          <>
            <div className='shadow rounded p-5 mb-5'>
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Насны хүрээ</TableCell>
                    <TableCell>{job.minAge}-{job.maxAge}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Хүйс</TableCell>
                    <TableCell>{job.gender}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Өндөр</TableCell>
                    <TableCell>{job.castTalent.minHeight + "cm"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Үсний өнгө</TableCell>
                    <TableCell>{job?.castTalent.hairColor}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Биеийн хэлбэр</TableCell>
                    <TableCell>{job?.castTalent.bodyType?.join(',\n')}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className='shadow rounded p-5 mb-5'>
              <Table>
                <TableCaption>дэлгэрэнгүй</TableCaption>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Огноо</TableCell>
                    <TableCell>{job.castTalent.shootDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Өргөдөл гаргагчдад нээлттэй</TableCell>
                    <TableCell>{job.locations.join(',\n')}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Үргэлжлэх хугацаа</TableCell>
                    <TableCell>{job.castTalent.requiredDate}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Төсөв</TableCell>
                    <TableCell>{job?.budget}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

          </>
        ) : job?.influencer ? (
          <>
            <div className='shadow rounded md:p-5 mb-5'>
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead>Нас</TableHead>
                    <TableHead>Хүйс</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{job?.minAge} - {job?.maxAge}</TableCell>
                    <TableCell>{job?.gender}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className='mb-5'>
              <p className='text-lg font-semibold'>Хамгийн багадаа дагагч </p>
              <p>instagram - <NumericFormat value={job.influencer.instagramFollowers} thousandSeparator /></p>
              <p>youtube - <NumericFormat value={job.influencer.youtubeFollowers} thousandSeparator /></p>
              <p>tiktok - <NumericFormat value={job.influencer.tiktokFollowers} thousandSeparator /></p>
            </div>

            <div className='shadow rounded md:p-5 mb-5'>
              <Table>
                <TableCaption>дэлгэрэнгүй</TableCaption>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Огноо</TableCell>
                    <TableCell>Батлагдсан байх ёстой</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Өргөдөл гаргагчдад нээлттэй</TableCell>
                    <TableCell>{job.locations.join(",\n")}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Үргэлжлэх хугацаа</TableCell>
                    <TableCell>Батлагдсан байх ёстой</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Төсөв</TableCell>
                    <TableCell>{job?.budget}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </>
        ) : job?.contentCreator ? (
          <>
            <div className='shadow rounded p-5 mb-5'>
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead>Нас</TableHead>
                    <TableHead>Хүйс</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{job?.minAge} - {job?.maxAge}</TableCell>
                    <TableCell>{job?.gender}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <p className='text-lg font-semibold'>Provide quote for</p>
            <p>Video for Instagram - 2</p>
            <p className='mb-5'>Video for tiktok - 2</p>
            <div className='shadow rounded p-5 mb-5'>
              <Table>
                <TableCaption>дэлгэрэнгүй</TableCaption>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Огноо</TableCell>
                    <TableCell>{ }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Өргөдөл гаргагчдад нээлттэй</TableCell>
                    <TableCell>Paid</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Үргэлжлэх хугацаа</TableCell>
                    <TableCell>Paid</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Төсөв</TableCell>
                    <TableCell>{job?.budget}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </>
        ) : job?.creativeProduction ? (
          <>
            <div className='shadow rounded p-5 mb-5'>
              <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                  <TableRow>
                    <TableHead>Нас</TableHead>
                    <TableHead>Хүйс</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{job?.minAge} - {job?.maxAge}</TableCell>
                    <TableCell>{job?.gender}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <p className='text-lg font-semibold'>Provide quote for</p>
            <p>Video for Instagram - 2</p>
            <p className='mb-5'>Video for tiktok - 2</p>
            <div className='shadow rounded p-5 mb-5'>
              <Table>
                <TableCaption>дэлгэрэнгүй</TableCaption>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Огноо</TableCell>
                    <TableCell>{ }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Өргөдөл гаргагчдад нээлттэй</TableCell>
                    <TableCell>Paid</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Үргэлжлэх хугацаа</TableCell>
                    <TableCell>Paid</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Төсөв</TableCell>
                    <TableCell>{job?.budget}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </>
        ) : null
      }

        <p className='text-lg font-semibold'>
          Нэмэлт материалууд</p>
        <p className='mb-5'>
          {job?.additionalMaterial}
        </p>


      <div>
        <p className='text-lg font-semibold'>
          Хавсралтууд</p>
        {
          docs?.map((file) => (
            <div key={file.id} className='mb-4'>
              <a className='text-blue-500 hover:underline' href={file.attributes.url}>{file.attributes.name}</a>
            </div>
          ))
        }
        <PhotoProvider>
          <div className='grid grid-cols-2 gap-4'>
            {
              images?.map((file) => (
                <PhotoView src={file.attributes.url}>
                  <img key={file.id} src={file.attributes.url} alt={file.attributes.name} className='rounded-md w-full object-contain' />
                </PhotoView>
              ))
            }
          </div>
        </PhotoProvider>
      </div>

    </div>

  )

  const loading = (
    <div>
      <div>
        <Skeleton className='h-[80px] mb-3' />
        <Skeleton className='h-[20px] mb-3' />
        <Skeleton className='h-[20px] mb-3' />
        <Skeleton className='h-[300px] mb-3' />
        <Skeleton className='h-[120px] mb-3' />
      </div>
    </div>
  )

  const router = useRouter()


  return (
    <div className='bg-gray-100'>
      {/* <Header/> */}
      <SubHeader left={<div className='flex items-center gap-2 font-medium cursor-pointer' onClick={() => router.back()}><ArrowLeft />Буцах</div>} />
      <div className='max-w-[800px] min-h-[calc(100vh-70px)] mx-auto px-4 py-5 md:p-10 block bg-white'>
        {
          job && !isLoading ? (
            detail
          ) : loading
        }
      </div>
    </div>
  );
}

export default page;
