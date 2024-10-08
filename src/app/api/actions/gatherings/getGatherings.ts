'use server';

import qs from 'qs';
import { GatheringsType } from '@/types/client.type';
import { GatheringsListData } from '@/types/data.type';

interface GetGatheringsParams {
  id?: string;
  limit?: number;
  offset?: number;
  type?: GatheringsType;
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
    const { limit = 10, offset = 0, ...rest } = params;

    const queryString = qs.stringify(
      {
        limit,
        offset,
        ...rest,
      },
      {
        skipNulls: true, // null 값을 건너뛰도록 설정
        strictNullHandling: true, // undefined 값도 건너뛰도록 설정
      },
    );

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
