'use client';

import { BtnEdit, ImageProfile, Profile } from '@/public/images';
import { User } from './Mock';
import Image from 'next/image';

// @todo 프로필 변경 모달 함수작성
const handleEditProfile = () => {};

const UserProfileLayout = () => {
  return (
    <div className='relative w-full rounded-[24px] border-2 border-var-gray-200'>
      <div className='flex items-center justify-between rounded-t-[24px] bg-var-orange-400 p-4 px-24 pb-16 pt-[14px]'>
        <div className='text-18 font-semibold text-var-gray-900'>내 프로필</div>
        <ImageProfile className='mx-auto mb-[-26px] h-40 w-156 md:mr-156' />
        <button onClick={handleEditProfile}>
          <BtnEdit className='size-32' />
        </button>
      </div>
      {/* 프로필 헤더 밑줄입니다. */}
      <div className='h-8 w-full border-t-2 border-var-orange-600 bg-var-orange-400'></div>
      <div className='rounded-b-[24px] bg-var-white px-92 py-16'>
        {/* 프로필 이미지 */}
        <div className='absolute left-24 top-56 size-56'>
          {User.image ? (
            <img src={User.image} alt='Profile' className='rounded-full' />
          ) : (
            <Profile />
          )}
        </div>
        {/* 이름 */}
        <div className='text-16 font-semibold text-var-gray-800'>
          {User.name}
        </div>
        <div className='text-14 font-medium text-var-gray-800'>
          {/* 회사명 */}
          <div>
            company.<span className='pl-[6px] font-normal'>{User.company}</span>
          </div>
          {/* 이메일 */}
          <div>
            E-mail. <span className='pl-24 font-normal'>{User.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
