'use server';

import { revalidatePath } from 'next/cache';

import { getCookie } from '@/actions/auth/cookie/cookie';
import { GatheringInfoType } from '@/types/data.type';

const putGatheringToCancelled = async (
  gatheringId: number,
): Promise<GatheringInfoType> => {
  try {
    const token = await getCookie('token');

    if (!token) {
      throw new Error('토큰이 없습니다.');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings/${gatheringId}/cancel`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data: GatheringInfoType = await res.json();

    revalidatePath('/');
    revalidatePath('/(main)/gatherings/[id]', 'page');

    return data;
  } catch (error) {
    throw new Error('모임을 취소하지 못했습니다.');
  }
};

export default putGatheringToCancelled;
