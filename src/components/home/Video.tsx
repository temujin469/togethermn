"use client"

import "react-modal-video/css/modal-video.css"

import React, { useState } from 'react';

// import modal video
import ModalVideo from 'react-modal-video';

// import icons
import { BsPlayCircleFill } from 'react-icons/bs';
import Container from "../ui/container";
import { H2 } from "../ui/Typography/Heading";
import { useQuery } from "@tanstack/react-query";
import getHomePageContents from "@/utils/fetch/getHomePageContents";

const Video = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { data } = useQuery({ queryKey: ["home-page"], queryFn: getHomePageContents })
  return (
    <div className="bg-secondary/20">

      <Container className="py-6 mt-10">
        <div className='xl:container mx-auto'>
          <div className='flex flex-col justify-center items-center text-center sm:flex-row sm:justify-between'>
            <H2 data-aos='fade-right'
              data-aos-offset='50' className="mb-8 sm:mb-0">
              Together гэж юу вэ ?
            </H2>
            {/* modal video */}
            <ModalVideo
              channel='youtube'
              // autoplay
              isOpen={isOpen}
              videoId='nrSGor3kJXQ'
              onClose={() => setIsOpen(false)}
            />
            {/* <video controls>
            <source src={data?.attributes.section2_video.data.attributes.url} type=""></source>
          </video> */}
            {/* video */}
            <div
              className="bg-[url('https://images.pexels.com/photos/8941790/pexels-photo-8941790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat rounded-[10px] rounded-tl-[30px] bg-center bg-cover w-[270px] h-[180px] flex items-center justify-center"
              data-aos='fade-left'
              data-aos-offset='50'
            >
              <div onClick={() => setIsOpen(!isOpen)} className='cursor-pointer'>
                <BsPlayCircleFill className='text-4xl text-white/90 hover:text-white hover:scale-110 transition' />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>

  );
};

export default Video;