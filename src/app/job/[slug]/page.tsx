import { H2 } from '@/components/ui/Typography/Heading';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import React from 'react';

function page() {
  return (
    <div className='bg-gray-100'>
      <div className='max-w-[800px] mx-auto p-10 block bg-white'>
        <H2>Elevate Your Swimwear Game: Create content for Azure Belle Period Swimwear</H2>
        <p className='text-gray-400 font-semibold'>TRF-48405</p>
        <p className='text-lg font-semibold mb-2'>Content Creators</p>
        <p className='text-lg font-semibold'>Ажлын дэлгэрэнгүй мэдээлэл</p>
        <p className='mb-5'>
          Azure Belle Period Swimwear is seeking passionate content creators to create content for our leading period swimwear brand designed in Australia, by women, for women.

          You will create content that showcases the stylish and discreet period swimwear options that Azure Belle offers, highlighting the comfort, functionality, and leak-proof protection it provides during periods. Through your content, you'll help to inspire and empower ladies and teens to embrace their periods without sacrificing their love for water activities.

          You'll create engaging and relatable video and photo content that resonates with our female audience while promoting a brand that values sustainability. Content could include GRWM, beach day styling, showcasing the swimwear in or out of water/pool/beach.

          Join us in revolutionising the swimwear industry and empowering ladies and teens worldwide to embrace their periods with style and confidence. If you're passionate about promoting freedom for all women, no matter what day of the month we'd love to hear from you.
        </p>
        <p className='text-lg font-semibold'>
          Хамгийн тохиромжтой нэр дэвшигч</p>
        <p className='mb-5'>confident in swimwear</p>
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
                <TableCell>18 - 45</TableCell>
                <TableCell>Эмэгтэй</TableCell>
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
                <TableCell>Paid</TableCell>
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
                <TableCell>Paid</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        {/* <p className='text-lg font-semibold'>Attachments</p> */}
      </div>
    </div>
  );
}

export default page;
