'use server';

import { getCookie } from '../cookie/cookie';

interface PostReviewsParams {
  gatheringId: number;
  score: number;
  comment: string;
}

const postReviews = async (params: PostReviewsParams) => {
  try {
    const token = await getCookie('token');

    if (!token) {
      return { success: false, message: '로그인이 필요합니다.' };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    });

    const { data, message } = await res.json();

    return {
      success: true,
      data,
      message: '리뷰가 성공적으로 작성되었습니다.',
    };
  } catch (error) {
    return {
      success: false,
      message: '리뷰 생성이 실패하였습니다.',
    };
  }
};

export default postReviews;
