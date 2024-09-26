'use server';

import { ReviewScoreType } from '@/types/data.type';

interface GetReviewScoreParams {
  gatheringId?: number[];
  type?: 'DALLAEMFIT' | 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';
}

const getReviewScore = async (
  params: GetReviewScoreParams = {},
): Promise<ReviewScoreType[]> => {
  try {
    const { gatheringId, type } = params;

    const queryParams = new URLSearchParams();

    if (gatheringId) {
      queryParams.append('gatheringId', gatheringId.join(','));
    }

    if (type) {
      queryParams.append('type', type);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/scores?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data: ReviewScoreType[] = await res.json();

    return data;
  } catch (error) {
    throw new Error('리뷰를 불러오지 못했습니다.');
  }
};

export default getReviewScore;
