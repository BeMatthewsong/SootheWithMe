'use client';

import { ChangeEvent, useRef, useState } from 'react';
import Button from '../../Button/Button';

interface ImageUploaderProps {
  image: string | null;
  setImage: (image: string | null) => void;
}

const ImageUploader = ({ image, setImage }: ImageUploaderProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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
          <div className='flex w-full items-center rounded-xl bg-gray-50 px-16 py-[10px]'>
            {fileName ?? (
              <p className='text-gray-400'>이미지를 첨부해 주세요</p>
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
