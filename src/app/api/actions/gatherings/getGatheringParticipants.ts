'use server';

import { GatheringParticipantsType } from '@/types/data.type';

const getGatheringParticipants = async (
  gatheringId: number,
): Promise<GatheringParticipantsType[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings/${gatheringId}/participants`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data: GatheringParticipantsType[] = await res.json();

    return data;
  } catch (error) {
    throw new Error('모임을 불러오지 못했습니다.');
  }
};

export default getGatheringParticipants;
