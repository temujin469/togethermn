import Image from 'next/image';
import React, { useState } from 'react';
import cn from 'clsx';
import { getPlaceholderImageURL } from '@/utils/getPlaceholderImageURL';
import noUserPhoto from "public/images/no-photo.png"


type Props = {
  className?: string;
  alt?:string;
  src?: string
  style?: React.CSSProperties
  sizes?:string
  fill?:boolean
  width?:number
  height?:number
  blurDataURL?:string
}

function BlurImage(props:Props) {

  const [isLoading, setLoading] = useState(true);

  return (
    <Image src={props.src ? props.src: noUserPhoto}
      style={props.style}
      alt={props.alt || "any image"}
      fill={props.fill}
      loading='lazy'
      sizes={props.sizes}
      width={props.width}
      height={props.height}
      placeholder="blur"
      className={cn(
        'duration-700 ease-in-out rounded-md object-cover',
        isLoading
          ? 'blur-sm'
          : 'blur-0',
        props.className,
      )}
      onLoadingComplete={() => setLoading(false)}
      // blurDataURL={props.blurDataURL}
      blurDataURL={getPlaceholderImageURL(props.src!)}
    />

  );
}

export default BlurImage;
