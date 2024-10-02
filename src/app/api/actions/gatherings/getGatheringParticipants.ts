'use server';

import { GatheringParticipantsType } from '@/types/data.type';

const getGatheringParticipants = async (
  gatheringId: number,
  limit?: number,
): Promise<GatheringParticipantsType[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/gatherings/${gatheringId}/participants?limit=${limit}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(message);
    }

    const data: GatheringParticipantsType[] = await res.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : '참가자들을 불러오지 못했습니다.',
    );
  }
};

export default getGatheringParticipants;
