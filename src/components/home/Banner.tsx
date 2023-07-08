import Link from "next/link";
import { Button } from "../ui/button";
import Container from "../ui/container";


const Banner = () => {
  return (
    <Container className="bg-primary">

    
      <section className='mt-[68px] md:mt-[75px] box-border text-center relative md:text-left '>
        <div className='xl:container mx-auto flex items-center  sm:pt-16 pb-9 sm:min-h-[300px] h-[calc(100vh-69px)]  lg:min-h-[calc(100vh-75px)]'>
        <div className='flex gap-12 sm:gap-10 justify-between sm:flex-row flex-col-reverse'>
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
                className='text-xl lg:text-2xl font-secondary bg-clip-text text-white mb-12 max-w-[440px] mx-auto lg:mx-0'
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
                
                <Link href="#">
                  <Button variant="outline" className="text-white">
                    Дэлгэрэнгүй
                  </Button>
                </Link>
              </div>
            </div>
            {/* <Users /> */}
          </div>
          {/* image */}
          <div className="px-16 sm:px-0">
            <div data-aos='fade-up' data-aos-delay='800' className="flex justify-center max-w-[480px] 2xl:max-w-full">
              <img src='/images/Success.png' alt='' className="float-center w-full h-full max-h-[calc(100vh-200px)] " />
            </div>
          </div>
        </div>
      </div>
      <img src="/images/circle.png" className="absolute bottom-0 rotate-180 left-[-300px] md:w-[800px] h-[400px]"/>
    </section>
    </Container>
  );
};

export default Banner;