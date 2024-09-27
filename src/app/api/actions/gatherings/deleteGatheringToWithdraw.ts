'use server';

import { revalidatePath } from 'next/cache';

import { getCookie } from '@/actions/auth/cookie/cookie';

const deleteGatheringToWithdraw = async (gatheringId: number) => {
  try {
    const token = await getCookie('token');

    if (!token) {
      throw new Error('토큰이 없습니다.');
    }

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

    const data = await res.json();

    revalidatePath('/');
    revalidatePath('/(main)/gatherings/[id]', 'page');

    return data;
  } catch (error) {
    throw new Error('모임 참여를 취소하지 못했습니다.');
  }
};

export default deleteGatheringToWithdraw;
