"use client"
import Link from "next/link";
import { Button } from "../ui/button";
import Container from "../ui/container";
import { useQuery } from "@tanstack/react-query";
import getHomePageContents from "@/utils/fetch/getHomePageContents";


const Banner = () => {

  const { data } = useQuery({ queryKey: ["home-page"], queryFn: getHomePageContents })
  return (
    <Container className="">
      <section className='box-border text-center relative md:text-left '>
        <div className='xl:container mx-auto flex items-center pt-16 pb-9 sm:min-h-[300px]'>
        <div className='flex gap-12 sm:gap-10 justify-between sm:flex-row flex-col'>
            {/* image */}
            <div className="px-16 sm:px-0">
              <div data-aos='fade-up' data-aos-delay='800' className="flex justify-center max-w-[480px] 2xl:max-w-full">
                <img src={data?.attributes.section1_image.data.attributes.url} alt='' className="float-center w-full h-full max-h-[calc(100vh-200px)] " />
              </div>
            </div>
          {/* text */}
          <div className="items-center flex md:max-w-[50%]">
            <div className="">
              <h1
                className='md:text-3xl text-2xl font-secondary text-secondary bg-clip-text font-bold mb-8 lg:text-4xl lg:leading-snug'
                data-aos='fade-down'
                data-aos-delay='500'

              >
                Шилдэг загвар өмсөгч, жүжигчид болон инфлүүнсер мэргэжилтэнгүүдийг захиал
              </h1>
              <p
                className='text-xl lg:text-2xl font-secondary bg-clip-text text-gray-600 mb-12 max-w-[440px] mx-auto lg:mx-0'
                data-aos='fade-down'
                data-aos-offset='0'
              >
                тэргүүлэгч зах зээл.
              </p>
              {/* btns */}
              <div
                className='flex items-center justify-center space-x-5  lg:mx-0 lg:justify-start'
                data-aos='fade-right'
                data-aos-delay='0'
                data-aos-offset="0"

              >
                <Link href="/search/talent">
                  <Button variant="secondary" className="whitespace-nowrap" >
                    Мэргэжилтэн олох
                  </Button>
                </Link>
                
                <Link href="/search/work">
                  <Button variant="outline">
                    Ажил олох
                  </Button>
                </Link>
              </div>
            </div>
            {/* <Users /> */}
          </div>
          
        </div>
      </div>
      {/* <img src="/images/circle.png" className="absolute bottom-60 rotate-180 left-[-300px]"/> */}
    </section>
    </Container>
  );
};

export default Banner;