import Link from 'next/link';
import React from 'react'
import {H2 } from '../ui/Typography/Heading';
import { Button } from '../ui/button';
import Container from '../ui/container';

function AreYouReady() {
  return (
    <Container className='bg-secondary/10'>
      
    <div className='py-10'>
      <div className='flex flex-col sm:flex-row gap-6 xl:container mx-auto justify-between items-center'>
        <div
          data-aos="fade-right"
        >
            <H2>Та төслөө эхлүүлэхэд бэлэн үү?<br /> Яаг одоо ажил нийтлэх!</H2>
        </div>
        <div className='flex flex-col gap-6'
          data-aos='fade-left'>
          <Link href="#">
            <Button variant="secondary" size="lg">
              Ажил байршуулах
            </Button>
          </Link>
          <Link href="#">
            <Button variant="outline" className='border-primary' size="lg">
              Мэргэжилтэн хайх
            </Button>
          </Link>
        </div>
      </div>
    </div>

    </Container>
  )
}

export default AreYouReady;