'use client';

import { Profile } from '@/public/images';
import ProfileEditModal from '../Modal/ProfileEditModal';
import { useState } from 'react';
import onChangeProfileImage from './onChangeProfileImage';
import { useProfileState } from './useProfileState';
import Image from 'next/image';
import UserProfileHeader from './UserProfileHeader';
import UserInfo from './UserInfo';
import { UserData } from '@/types/client.type';
import { putProfileData } from '@/app/api/actions/mypage/putProfileData';

interface MyGatheringListProps {
  user: UserData | null;
}
const UserProfileLayout = ({ user }: MyGatheringListProps) => {
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

  /* 수정된 프로필 제출 함수 */
  const onSubmit = async () => {
    if (!profileImage || !profileInput) {
      alert('프로필 이미지와 회사명을 입력해주세요.');
      return null;
    }
    const formData = new FormData();
    formData.append('companyName', profileInput); // 프로필 이름 추가
    formData.append('image', profileImage); // 프로필 이미지 추가

    const updatedUser = await putProfileData(formData);

    if (!updatedUser) {
      alert('프로필 업데이트에 실패했습니다.');
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
            user={user}
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
