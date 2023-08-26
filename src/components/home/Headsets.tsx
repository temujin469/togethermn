"use client"
import Image from "next/image";
import Link from "next/link";
import { H2 } from "../ui/Typography/Heading";
import { Button } from "../ui/button";
import Container from "../ui/container";
import getProfessions from "@/utils/fetch/getProfessions";
import { useQuery } from "@tanstack/react-query";

const Headsets = () => {

  const { data } = useQuery({ queryKey: ["professions"], queryFn:getProfessions })

  return (
    <Container>
    <section className='py-12 lg:py-24'>
      <div className='xl:container mx-auto'>
        {/* title */}
        <H2 data-aos='fade-right' className="mb-6">Танд хэн хэрэгтэй вэ?</H2>
        {/* grid */}
        <div>
          <div className='grid gap-5 sm:gap-8 md:gap-10 lg:gap-8 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4'>
            {/* item */}
            {
              data?.slice(0,8).map((pro) => (
                <div
                  data-aos='zoom-in'
                  data-aos-delay='0'
                  key={pro.id}
                  className='border overflow-hidden p-2 border-pink-400 rounded-lg h-[200px] sm:h-[250px]  lg:h-[300px] md:max-w-[250px] lg:max-w-[300px]'>
                  <div
                    className='relative w-full h-full overflow-hidden'

                  >
                    <Image src={pro.attributes.background_image?.data.attributes.url} alt='' className="object-cover w-full rounded-lg" layout="fill" />
                    <div className='absolute rounded-lg left-0 bottom-0 h-full p-6 w-full flex flex-col justify-between items-center hover:backdrop-blur-sm transition-all duration-200'>
                      <h4 className='text-white text-lg font-[600] mb-2'>{pro.attributes.name}</h4>
                        <Link href="/search/talent">
                          <Button variant="outline" className="text-white">
                            бүгдийг үзэх
                          </Button>
                        </Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
    </Container>
  );
};

export default Headsets;