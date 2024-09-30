'use server';

import { getCookie } from '@/actions/auth/cookie/cookie';
import { ReviewPostType } from '@/types/data.type';

interface PostReviewsParams {
  gatheringId: number;
  score: number;
  comment: string;
}

const postReviews = async (
  params: PostReviewsParams,
): Promise<ReviewPostType> => {
  try {
    const token = await getCookie('token');

    if (!token) {
      throw new Error('토큰이 없습니다.');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const data: ReviewPostType = await res.json();

    return data;
  } catch (error) {
    throw new Error('모임 생성이 실패하였습니다.');
  }
};

export default postReviews;
