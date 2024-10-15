'use server';

import { getCookie } from '../cookie/cookie';
import { UserData } from '@/types/client.type';

export const getUserData = async () => {
  const token = await getCookie('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/user`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error('유저 정보를 불러오는데 실패했습니다.');
    }

    const result: UserData = await response.json();

    return result; // 사용자 데이터를 반환
  } catch (error) {
    console.error('유저 정보를 불러오는데 실패했습니다:', error);
    return null;
  }
};
