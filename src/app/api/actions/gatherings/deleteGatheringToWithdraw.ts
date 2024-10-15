'use server';

import { revalidatePath } from 'next/cache';

import { getCookie } from '../cookie/cookie';

const deleteGatheringToWithdraw = async (gatheringId: number) => {
  const token = await getCookie('token');

  if (!token) {
    return { success: false, message: '로그인이 필요합니다.' };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings/${gatheringId}/leave`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      const { message } = await res.json();
      return { success: false, message };
    }

    const { data, message } = await res.json();

    revalidatePath('/');
    revalidatePath('/(main)/gatherings/[id]', 'page');

    return { success: true, data, message };
  } catch (error) {
    return {
      success: false,
      message: '취소에 실패했습니다. 다시 시도해주세요.',
    };
  }
};

export default deleteGatheringToWithdraw;
