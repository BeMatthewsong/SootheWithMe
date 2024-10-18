'use client';

import { useState } from 'react';
import Image from 'next/image';

import { IconAlarm } from '@/public/icons';
import getDaysUntilRegistrationEnd from '@/app/(main)/gatherings/_helpers/getDaysUntilRegistrationEnd';
import getTagMessage from '@/app/(main)/gatherings/_helpers/getTagMessage';
import isClosingTagVisible from '@/app/(main)/gatherings/_helpers/isClosingTagVisible';

interface GatheringImageProps {
  image: string;
  endTime: string;
  isFull: boolean;
}

const GatheringImage = ({ image, endTime, isFull }: GatheringImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const daysLeft = getDaysUntilRegistrationEnd(endTime);
  const tagMessage = getTagMessage(daysLeft, endTime, isFull);
  const isRenderTag = isClosingTagVisible(daysLeft, isFull);

  return (
    <div className='relative h-[270px] w-full md:w-[50vw] lg:max-w-[486px]'>
      {isLoading && (
        <div className='absolute inset-0 h-full w-full animate-pulse rounded-[20px] bg-slate-700'></div>
      )}

      <Image
        className={`rounded-[20px] object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        src={image || '/images/mock-image.png'}
        alt='review image'
        fill
        quality={85}
        sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw'
        onLoadingComplete={() => setIsLoading(false)}
      />

      {isRenderTag && (
        <div className='absolute right-0 top-0 flex items-center gap-4 rounded-bl-[12px] rounded-tr-[20px] bg-orange-600 py-2 pl-4 pr-6 text-xs font-medium text-var-white'>
          <IconAlarm width='24' height='24' />
          <span className='text-12 font-semibold'>{tagMessage}</span>
        </div>
      )}
    </div>
  );
};

export default GatheringImage;
