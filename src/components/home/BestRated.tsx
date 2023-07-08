"use client"
import React from 'react';
import UserCardContainer from './UserCardContainer';
import Container from '../ui/container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';


// const onChange = (key: string) => {
//   console.log(key);
// };

const BestRated: React.FC = () => (
  <Container>
    <div className='my-20 xl:container mx-auto'>
      <Tabs defaultValue="1" className="w-full">
        <TabsList className='flex md:inline-block'>
          <TabsTrigger value="1" className='flex-[1]'>Мэргэжилтэн</TabsTrigger>
          <TabsTrigger value="2" className='flex-[1]'>Инфлүүнсер</TabsTrigger>
        </TabsList>
        <TabsContent value="1"><UserCardContainer/></TabsContent>
        <TabsContent value="2"><UserCardContainer /></TabsContent>
      </Tabs>
  </div>
  </Container>
);

export default BestRated;
