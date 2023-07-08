import Link from 'next/link'
import React from 'react'
import { H3,H2 } from '../ui/Typography/Heading'
import Container from '../ui/container'

function HowItWork() {
  return (
    <Container>

    
    <div className='mt-5 mb-16'>
      <div className='xl:container mx-auto'>
        <div className='bg-bgClr rounded-lg py-8'>
          <Link href="#">
            <H2 data-aos='fade-right'
              data-aos-offset='100' className='mb-6'>
              Яагаад Together гэж ?
            </H2>
          </Link>
            <div className='flex flex-col md:flex-row px-4 gap-8 lg:gap-12 xl:mx-16'>
            <div className='flex flex-col'
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay='50'>
              <img src='/images/work-with.png' alt='phto'/>
              <div>
                <Link href='/search/talent'>
                  <H3 className='mb-3'>Мэргэжилтэн олох</H3>
                </Link>
                <p>Хэдхэн товшилтоор олон төрлийн загвар өмсөгч, жүжигчид, нөлөөлөгчдийг хурдан олж, захиалаарай.</p>
              </div>
            </div>
            <div className='flex flex-col'
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay='50'>
              <img src='/images/stock-broker.png'/>
              <div>
                <Link href='#'>
                  <H3 className='mb-3'>Төлбөр тооцоо</H3>
                </Link>
                <p>Ажил дууссаны төлбөрөө автоматаар төлж, татварын нэхэмжлэх хүлээн авна уу.</p>
              </div>
            </div>
            <div className='flex flex-col'
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay='50'>
              <img src='/images/talent-requirements.png'/>

              <div>
                <Link href='#'>
                  <H3 className='mb-3'>Ажлын менежмент</H3>
                </Link>
                <p>Мэргэжилтэн захиалахдаа нарийн төвөгтэй гэрээ эсвэл уйтгартай бичиг цаасны ажил хийх шаардлагагүй.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Container>
  )
}

export default HowItWork