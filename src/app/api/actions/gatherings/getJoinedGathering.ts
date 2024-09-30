'use server';

import { getCookie } from '@/actions/auth/cookie/cookie';
import { UserJoinedGatheringsData } from '@/types/data.type';

interface GetJoinedGatheringsParams {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: 'dateTime' | 'registrationEnd' | 'joinedAt';
  sortOrder?: 'asc' | 'desc';
}

const getJoinedGatherings = async (
  params: GetJoinedGatheringsParams = {},
): Promise<UserJoinedGatheringsData[]> => {
  try {
    const {
      completed = true,
      reviewed = false,
      limit = 10,
      offset = 0,
      sortBy = 'dateTime',
      sortOrder = 'desc',
    } = params;

    const queryString = new URLSearchParams({
      completed: String(completed),
      reviewed: String(reviewed),
      limit: String(limit),
      offset: String(offset),
      sortBy,
      sortOrder,
    }).toString();

    const token = await getCookie('token');

    if (!token) {
      throw new Error('토큰이 없습니다.');
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings/joined?${queryString}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data: UserJoinedGatheringsData[] = await res.json();

    return data;
  } catch (error) {
    throw new Error('모임을 불러오지 못했습니다.');
  }
};

export default getJoinedGatherings;
