'use client';

import { Profile } from '@/public/images';
import { useUser } from '@/app/(auth)/context/UserContext';
import ProfileEditModal from '../Modal/ProfileEditModal';
import { useState } from 'react';
import onChangeProfileImage from './onChangeProfileImage';
import { putProfileData } from '@/app/api/actions/mypage/putProfileData';
import { useProfileState } from './useProfileState';
import Image from 'next/image';
import UserProfileHeader from './UserProfileHeader';
import UserInfo from './UserInfo';

const UserProfileLayout = () => {
  const { user, setUser } = useUser();
  const {
    profileInput,
    setProfileInput,
    profileImage,
    setProfileImage,
    imagePreview,
    setImagePreview,
    resetProfileState,
  } = useProfileState(user);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  /* 프로필 수정 제충 함수 */
  const onSubmit = async () => {
    const updatedUser = await putProfileData({
      companyName: profileInput,
      profileImage: profileImage,
    });

    if (updatedUser) {
      setUser((prevUser) =>
        prevUser ? { ...prevUser, ...updatedUser } : prevUser,
      );
    }

    setIsModalOpen(false);
  };

  /* 모달 열기/닫기 함수 */
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);

    if (isModalOpen) {
      resetProfileState();
    }
  };

  return (
    <div className='relative w-full rounded-[24px] border-2 border-var-gray-200'>
      <UserProfileHeader toggleModal={toggleModal} />
      <div className='rounded-b-[24px] bg-var-white px-92 py-16'>
        {/* 프로필 이미지 */}
        <div className='absolute left-24 top-56 size-56'>
          {user?.image ? (
            <Image
              fill
              src={user.image}
              alt='Profile'
              className='overflow-hidden rounded-full'
            />
          ) : (
            <Profile />
          )}
        </div>
        <UserInfo user={user} />
      </div>
      {isModalOpen && (
        <div className='fixed inset-0 z-popup flex items-center justify-center bg-black bg-opacity-50'>
          <ProfileEditModal
            onCloseClick={toggleModal}
            onUploadProfileImage={onChangeProfileImage({
              setProfileImage,
              setImagePreview,
            })}
            profileInput={profileInput}
            setProfileInput={setProfileInput}
            imagePreview={imagePreview}
            onSubmit={onSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default UserProfileLayout;
