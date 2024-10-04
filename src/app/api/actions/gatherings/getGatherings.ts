'use server';

import { GatheringsListData } from '@/types/data.type';

interface GetGatheringsParams {
  id?: string;
  limit?: number;
  offset?: number;
  type?: 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';
  location?: string;
  date?: string;
  createdBy?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const getGatherings = async (
  params: GetGatheringsParams = {},
): Promise<GatheringsListData[]> => {
  try {
    const { limit = 10, offset = 0, sortBy, sortOrder, ...rest } = params;

    const queryString = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      sortBy: String(sortBy),
      sortOrder: String(sortOrder),
      ...rest,
    }).toString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings?${queryString}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      throw new Error('모임을 불러오지 못했습니다.');
    }

    const data: GatheringsListData[] = await res.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : '모임을 불러오지 못했습니다.',
    );
  }
};

export default getGatherings;
