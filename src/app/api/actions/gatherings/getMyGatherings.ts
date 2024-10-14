'use server';

import { getCookie } from '@/actions/auth/cookie/cookie';
import { GatheringType } from '@/types/data.type';

const getMyGatherings = async () => {
  const token = await getCookie('token');
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings/joined?limit=10&offset=0`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error('모임을 불러오지 못했습니다.');
    }

    const data: GatheringType[] = await res.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : '모임을 불러오지 못했습니다.',
    );
  }
};

export default getMyGatherings;
