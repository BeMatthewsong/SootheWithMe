'use server';

import { GatheringsType } from '@/types/client.type';
import { ReviewScoreType } from '@/types/data.type';

interface GetReviewScoreParams {
  gatheringId?: number[];
  type?: GatheringsType;
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
      queryParams.append('type', String(type));
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/scores?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
          // TODO : cache 관련 처리 협의 필요
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
