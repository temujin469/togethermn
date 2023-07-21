import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clapperboard, Shirt, Star, UserSquare2 } from 'lucide-react';
import Videos from './Videos';
import Reviews from './Reviews';
import Portfolio from './Portfolio';
import Bio from './Bio';
import Features from './Features';
import { GanttChartSquare } from 'lucide-react';

function RightContent() {
  return (
      <Tabs defaultValue="1" className="w-full h-full sm:shadow sm:rounded-md bg-white">
      <div className='p-2 sm:p-0 w-full left-0 right-0 sticky top-[70px] h-[56px] sm:h-auto z-[50] md:static bg-white shadow sm:rounded-t-md'>
        <TabsList className='w-full rounded-md sm:rounded-t-md sm:rounded-b-none p-2 sm:h-[50px]'>
          <TabsTrigger value="1" className='flex-[1] gap-1'><UserSquare2 size={18} /><p className='hidden md:block'>Нүүр</p></TabsTrigger>
          <TabsTrigger value="2" className='flex-[1] gap-1'><Shirt size={18} /><p className='hidden md:block'>Онцлог</p></TabsTrigger>
          <TabsTrigger value="3" className='flex-[1] gap-1'><Star size={18} /><p className='hidden md:block'>Санал шүүмж</p></TabsTrigger>
          <TabsTrigger value="4" className='flex-[1] gap-1'>
            <GanttChartSquare size={18} />
            <p className='hidden md:block'>Био</p>
          </TabsTrigger>
          <TabsTrigger value="5" className='flex-[1] gap-1'>
            <Clapperboard size={18} />
            <p className='hidden md:block'>Видео</p>
          </TabsTrigger>
        </TabsList>
      </div>
        <TabsContent value="1" className=' rounded-lg p-4 min-h-[calc(100vh-105px)] md:min-h-full'>
          <Portfolio />
        </TabsContent>
        <TabsContent value="2" className='rounded-lg p-4 min-h-[calc(100vh-105px)] md:min-h-full'>
          <Features/>
        </TabsContent>
        <TabsContent value="3" className='rounded-lg p-4 min-h-[calc(100vh-105px)] md:min-h-full'>
          <Reviews />
        </TabsContent>
        <TabsContent value="4" className='rounded-lg p-4 min-h-[calc(100vh-105px)] md:min-h-full'>
          <Bio />
        </TabsContent>
        <TabsContent value="5" className='rounded-lg p-4 min-h-[calc(100vh-105px)] md:min-h-full'>
          <Videos />
        </TabsContent>
      </Tabs>
  );
}

export default RightContent;
