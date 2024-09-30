import { UserData } from '@/types/client.type';
import { useState } from 'react';

export const useProfileState = (user: UserData | null) => {
  // 초기 데이터값
  const initialProfileInput = user?.companyName || '';
  const initialProfileImage = user?.image || '';

  const [profileInput, setProfileInput] = useState<string>(initialProfileInput); //회사명
  const [profileImage, setProfileImage] = useState<File | string>( // 프로필 이미지
    initialProfileImage,
  );
  const [imagePreview, setImagePreview] = useState<string>(initialProfileImage); //프로필 미리보기

  /* 초기데이터로 리셋하는 함수 */
  const resetProfileState = () => {
    setProfileInput(initialProfileInput);
    setProfileImage(initialProfileImage);
    setImagePreview(initialProfileImage);
  };

  return {
    profileInput,
    setProfileInput,
    profileImage,
    setProfileImage,
    imagePreview,
    setImagePreview,
    resetProfileState,
  };
};
