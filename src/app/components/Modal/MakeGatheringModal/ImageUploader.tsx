'use client';

import { ChangeEvent, useRef, useState } from 'react';
import Button from '../../Button/Button';
import { MAX_IMAGE_SIZE_BYTES } from '@/constants/common';

interface ImageUploaderProps {
  setImage: (image: File | null) => void;
}

const ImageUploader = ({ setImage }: ImageUploaderProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > MAX_IMAGE_SIZE_BYTES) {
        // 1MB 제한
        alert('이미지 크기는 1MB를 초과할 수 없습니다.');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(file);
      };
      setFileName(file.name);
    }
  };

  return (
    <div className='space-y-12 text-16 font-semibold'>
      <h2>이미지</h2>
      <div>
        <input
          ref={inputRef}
          type='file'
          className='hidden'
          onChange={handleChange}
        />
        <div className='flex gap-12'>
          <div
            className={`flex w-full items-center rounded-xl bg-gray-50 px-16 py-[10px] ${fileName ? 'dark:bg-var-gray-100 dark:text-var-gray-800' : 'dark:bg-neutral-900 dark:text-neutral-100'}`}
          >
            {fileName ?? (
              <p className='text-gray-400 dark:text-neutral-400'>
                이미지를 첨부해 주세요 (1MB 이하)
              </p>
            )}
          </div>
          <div className='w-100'>
            <Button
              name='파일 찾기'
              variant='white'
              onClick={() => inputRef.current?.click()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
