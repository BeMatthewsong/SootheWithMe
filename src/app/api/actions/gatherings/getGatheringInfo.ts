'use server';

import { GatheringInfoType } from '@/types/data.type';

const getGatheringInfo = async (
  gatheringId: number,
): Promise<GatheringInfoType> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings/${gatheringId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data: GatheringInfoType = await res.json();

    return data;
  } catch (error) {
    throw new Error('모임을 불러오지 못했습니다.');
  }
};

export default getGatheringInfo;
