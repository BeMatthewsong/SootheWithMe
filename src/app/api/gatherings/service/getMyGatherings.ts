'use client';

import {
  DEFAULT_GATHERINGS_LIMIT,
  DEFAULT_GATHERINGS_OFFSET,
} from '@/constants/common';
import { FetchGatheringsResponse } from '@/types/data.type';

const getMyGatherings = async (
  offset = DEFAULT_GATHERINGS_OFFSET,
  limit = DEFAULT_GATHERINGS_LIMIT,
): Promise<FetchGatheringsResponse> => {
  const response = await fetch(
    `/api/gatherings/joined?offset=${offset}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error('나의 모임을 불러오는데 실패했습니다.');
  }
  return response.json();
};

export default getMyGatherings;
