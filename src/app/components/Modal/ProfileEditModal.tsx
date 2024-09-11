'use client';

import { IconX } from '@/public/icons';
import { BtnEditProfile } from '@/public/images';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { ChangeEvent, useState } from 'react';

/**
 * Profile Edit Modal
 * @param onCloseClick - 모달을 닫는 함수
 * @param onUploadProfileImage - 프로필 이미지를 업로드하는 함수
 * @param onSubmit - 프로필 수정하는 함수
 */

interface ProfileEditModalProps {
  onCloseClick?: () => void;
  onUploadProfileImage?: () => void;
  onSubmit?: () => void;
}

const ProfileEditModal = ({
  onCloseClick,
  onUploadProfileImage,
  onSubmit,
}: ProfileEditModalProps) => {
  const [profileInput, setProfileInput] = useState('');

  const onChangeProfileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileInput(e.target.value);
  };

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
      {/* 프로필 이미지 변경 버튼 */}
      <button onClick={onUploadProfileImage} className='h-56 w-56'>
        <BtnEditProfile className='h-full w-full' />
      </button>
      {/* 프로필 이름 변경 */}
      <div className='flex flex-col gap-12'>
        <h2 className='text-16 font-semibold'>회사</h2>
        <Input
          className='text-16 h-40 bg-gray-50 font-medium md:h-44'
          value={profileInput}
          onChange={onChangeProfileInput}
        />
      </div>
      {/* 버튼 그룹 */}
      <div className='flex items-center gap-16'>
        <Button name='취소' variant='white' />
        {/* TODO: 인풋의 값이 이전과 같거나 비어있으면 gray, 아니라면 default */}
        <Button
          name='수정하기'
          onClick={onSubmit}
          variant='gray'
          // variant={`${profileInput === 이전값 || profileInput === '' ? 'gray' : 'default'}`}
        />
      </div>
    </div>
  );
};

export default ProfileEditModal;
