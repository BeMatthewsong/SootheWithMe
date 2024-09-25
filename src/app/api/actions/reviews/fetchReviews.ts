'use server';

import { ReviewsType } from '@/types/data.type';

interface FetchReviewsParams {
  limit?: number;
  offset?: number;
  gatheringId?: number;
  userId?: number;
  location?: string;
  date?: string;
  registrantionEnd?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const fetchReviews = async (
  params: FetchReviewsParams = {},
): Promise<ReviewsType[]> => {
  try {
    const { limit = 12, offset = 0, ...rest } = params;

    // null, undefined 는 URLSearchParams 에서 처리를 못 하기 때문에 String 으로 걸러주는 부분
    const queryString = new URLSearchParams(
      Object.entries({
        limit: String(limit),
        offset: String(offset),
        ...rest,
      }).reduce(
        (acc, [key, value]) => {
          if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        },
        {} as Record<string, string>,
      ),
    ).toString();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews?${queryString}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data: ReviewsType[] = await res.json();

    return data;
  } catch (error) {
    throw new Error('모임을 불러오지 못했습니다.');
  }
};

export default fetchReviews;
