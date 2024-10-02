'use server';

import { revalidatePath } from 'next/cache';

export const postUserLogoutData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/signout`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('로그아웃을 실패했습니다.');
    }

    const result = await response.json();

    revalidatePath('/');

    return result;
  } catch (error) {
    console.error('로그아웃을 실패했습니다:', error);
    return null;
  }
};
