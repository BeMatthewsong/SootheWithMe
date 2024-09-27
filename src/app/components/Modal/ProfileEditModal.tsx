'use client';

import { IconX } from '@/public/icons';
import { BtnEditProfile } from '@/public/images';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { ChangeEvent } from 'react';
import { useUser } from '@/app/(auth)/context/UserContext';
import Image from 'next/image';

/**
 * Profile Edit Modal
 * @param onCloseClick - 모달을 닫는 함수
 * @param onUploadProfileImage - 프로필 이미지를 업로드하는 함수
 * @param onSubmit - 프로필 수정하는 함수
 * @param imagePreview - 프로필 이미지보기 url
 */

interface ProfileEditModalProps {
  onCloseClick?: () => void;
  onUploadProfileImage?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
  imagePreview?: string | null;
  profileInput: string;
  setProfileInput: React.Dispatch<React.SetStateAction<string>>;
}

const ProfileEditModal = ({
  onCloseClick,
  onUploadProfileImage,
  onSubmit,
  imagePreview,
  profileInput,
  setProfileInput,
}: ProfileEditModalProps) => {
  const { user } = useUser();

  const onChangeProfileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileInput(e.target.value);
  };

  const isValid = profileInput !== user?.companyName && profileInput !== '';

  return (
    <div className='w-342 flex max-h-328 flex-col gap-24 rounded-xl bg-var-white p-24 md:w-520'>
      <div className='flex items-center justify-between'>
        <h1 className='text-18 font-semibold text-var-gray-900'>
          프로필 수정하기
        </h1>
        <button onClick={onCloseClick}>
          <IconX className='h-24 w-24' />
        </button>
      </div>
      <label htmlFor='profileImage' className='h-56 w-56 cursor-pointer'>
        <div className='relative h-full w-full'>
          {imagePreview ? (
            <Image
              fill
              className='overflow-hidden rounded-full'
              src={imagePreview}
              alt='프로필 미리보기'
            />
          ) : (
            <BtnEditProfile className='h-full w-full' />
          )}
        </div>
        <input
          type='file'
          id='profileImage'
          accept='image/*'
          onChange={onUploadProfileImage}
          className='hidden'
        />
      </label>
      {/* 프로필 이름 변경 */}
      <div className='flex flex-col gap-12'>
        <h2 className='text-16 font-semibold'>회사</h2>
        <Input
          className='h-40 bg-gray-50 text-16 font-medium md:h-44'
          value={profileInput}
          onChange={onChangeProfileInput}
        />
      </div>
      {/* 버튼 그룹 */}
      <div className='flex items-center gap-16'>
        <Button name='취소' onClick={onCloseClick} variant='white' />
        <Button
          name='수정하기'
          onClick={onSubmit}
          type='button'
          variant={`${isValid ? 'default' : 'gray'}`}
          disabled={!isValid}
        />
      </div>
    </div>
  );
};

export default ProfileEditModal;
