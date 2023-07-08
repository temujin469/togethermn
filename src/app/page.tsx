import Footer from '@/components/footer/Footer'
import Header from '@/components/header'
import AboutTab from '@/components/home/AboutTab'
import AreYouReady from '@/components/home/AreYouReady'
import Banner from '@/components/home/Banner'
import BestRated from '@/components/home/BestRated'
import Experience from '@/components/home/Experience'
import Headsets from '@/components/home/Headsets'
import HowItWork from '@/components/home/HowItWork'
import Testimonial from '@/components/home/Testimonial'
import Video from '@/components/home/Video';


export default function Home() {

  return (
    <>
    <Header/>
      <Banner />
      <Experience />
      <AboutTab />
      <Video />
      <Headsets />
      <HowItWork />
      {/* <Explore /> */}
      <AreYouReady />
      <BestRated />
      <Testimonial />
      <Footer />
    </>
  )
}
