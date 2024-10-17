'use server';

import { getCookie } from '../cookie/cookie';
import { UserData } from '@/types/client.type';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

export const putProfileData = async (
  formData: FormData,
): Promise<UserData | null> => {
  const token = await getCookie('token');

  if (!token) {
    toast.error('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
    redirect('/signin');
    return null;
  }

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
    revalidatePath('/');

    const result: UserData = await response.json();

    return result; // 업데이트된 사용자 데이터를 반환
  } catch (error) {
    console.error('프로필 업데이트 중 오류가 발생했습니다:', error);
    return null;
  }
};
