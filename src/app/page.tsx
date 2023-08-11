import Footer from '@/components/footer/Footer'
import Header from '@/components/header'
import AreYouReady from '@/components/home/AreYouReady'
import Banner from '@/components/home/Banner'
import BestRated from '@/components/home/BestRated'
import Carousel from '@/components/home/Carousel'
import Experience from '@/components/home/Experience'
import Headsets from '@/components/home/Headsets'
import HowItWork from '@/components/home/HowItWork'
import Testimonial from '@/components/home/Testimonial'
import Video from '@/components/home/Video';
import NewsSection from '@/components/home/newsSection'
import useGetHomeContent from '@/hooks/useGetHomeContent'
import getQueryClient from '@/utils/getQueryClient'
import { Hydrate, dehydrate } from '@tanstack/react-query'

export default async function Home() {

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery(useGetHomeContent.getKey(),useGetHomeContent.queryFn)

  const dehydratedState = dehydrate(queryClient)
  return (
    <Hydrate state={dehydratedState}>
      <div className='bg-white'>
      <Header />
      <Carousel />
      <Banner />
      {/* <Experience /> */}
      <Video />
      <Headsets />
      <HowItWork />
      {/* <Explore /> */}
      <AreYouReady />
      <BestRated />
      <Testimonial />
      <NewsSection/>
      <Footer />
      </div>
    </Hydrate>
  )
}
