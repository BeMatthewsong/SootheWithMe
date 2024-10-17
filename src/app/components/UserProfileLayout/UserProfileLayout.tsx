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
import toast from 'react-hot-toast';

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
  const handleSubmit = async () => {
    if (!profileImage || !profileInput) {
      toast.error('프로필 이미지와 회사명을 입력해주세요.');
      return null;
    }
    const formData = new FormData();
    formData.append('companyName', profileInput); // 프로필 이름 추가
    formData.append('image', profileImage); // 프로필 이미지 추가

    const updatedUser = await putProfileData(formData);

    if (!updatedUser) {
      toast.error('프로필 업데이트에 실패했습니다.');
    }
    toast.success('프로필이 변경되었습니다.');

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
    <div className='relative w-full rounded-[24px] border-2 border-var-gray-200 dark:border-neutral-700'>
      <UserProfileHeader toggleModal={toggleModal} />
      <div className='rounded-b-[24px] bg-var-white px-92 py-16 dark:bg-neutral-800'>
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
        <ProfileEditModal
          onClose={toggleModal}
          onUploadProfileImage={onChangeProfileImage({
            setProfileImage,
            setImagePreview,
          })}
          profileInput={profileInput}
          setProfileInput={setProfileInput}
          imagePreview={imagePreview}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default UserProfileLayout;
