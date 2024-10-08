'use server';

import qs from 'qs';
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

    const queryString = qs.stringify(
      {
        gatheringId: gatheringId?.join(','),
        type,
      },
      {
        skipNulls: true, // null 값을 건너뛰도록 설정
        strictNullHandling: true, // undefined 값도 건너뛰도록 설정
      },
    );

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/scores?${queryString}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!res.ok) {
      throw new Error('리뷰를 불러오지 못했습니다.');
    }

    const data: ReviewScoreType[] = await res.json();

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : '리뷰 평점을 불러오지 못했습니다.',
    );
  }
};

export default getReviewScore;
