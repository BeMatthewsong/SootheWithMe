'use server';

import { getCookie } from '@/actions/auth/cookie/cookie';
import { UserData } from '@/types/client.type';

interface putProfileDataProps {
  companyName: string | null;
  profileImage: File | string;
}

export const putProfileData = async ({
  companyName,
  profileImage,
}: putProfileDataProps): Promise<UserData | null> => {
  const token = await getCookie('token');

  if (!profileImage || !companyName) {
    alert('프로필 이미지와 회사명을 입력해주세요.');
    return null;
  }

  const formData = new FormData();
  formData.append('companyName', companyName); // 프로필 이름 추가
  formData.append('image', profileImage); // 프로필 이미지 추가

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/user`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!response.ok) {
      throw new Error('프로필 업데이트에 실패했습니다.');
    }

    const result: UserData = await response.json();

    return result; // 업데이트된 사용자 데이터를 반환
  } catch (error) {
    console.error('프로필 업데이트 중 오류가 발생했습니다:', error);
    return null;
  }
};
