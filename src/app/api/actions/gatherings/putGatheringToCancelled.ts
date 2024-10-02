'use server';

import { revalidatePath } from 'next/cache';

import { getCookie } from '@/actions/auth/cookie/cookie';
import { GatheringInfoType } from '@/types/data.type';

interface GatheringResponse {
  data?: GatheringInfoType;
  success?: boolean;
  message: string;
}

const putGatheringToCancelled = async (
  gatheringId: number,
): Promise<GatheringResponse> => {
  const token = await getCookie('token');

  if (!token) {
    return { success: false, message: '로그인이 필요합니다.' };
  }

  try {
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

    if (!res.ok) {
      return {
        success: false,
        message: '취소에 실패했습니다. 다시 시도해주세요.',
      };
    }

    const { data }: GatheringResponse = await res.json();

    revalidatePath('/');
    revalidatePath('/(main)/gatherings/[id]', 'page');

    return { success: true, data, message: '모임이 취소되었습니다.' };
  } catch (error) {
    return {
      success: false,
      message: '취소에 실패했습니다. 다시 시도해주세요.',
    };
  }
};

export default putGatheringToCancelled;
