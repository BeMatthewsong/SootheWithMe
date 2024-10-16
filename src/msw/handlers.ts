import { HttpResponse, http } from 'msw';
import qs from 'qs';
import { filterReviews } from './reviews/filterReviews';
import { MOCK_REVIEWS, MOCK_REVIEWS_BY_TYPE } from './reviews/mockReviews';

export const handlers = [
  /*
   * GET
   * /reviews
   */
  http.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`, ({ request }) => {
    const url = new URL(request.url);
    const queryParam = qs.parse(url.searchParams.toString());

    const reviews = MOCK_REVIEWS();

    // 쿼리 파라미터에 따라 데이터 필터링
    const result = filterReviews(reviews, queryParam);

    return HttpResponse.json(result);
  }),

  /*
   * GET
   * /reviews/score
   */
  http.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/score`,
    ({ request }) => {
      const url = new URL(request.url);
      const queryParam = qs.parse(url.searchParams.toString());

      const { type } = queryParam;

      const scores = MOCK_REVIEWS_BY_TYPE(type as string);

      return HttpResponse.json(scores);
    },
  ),
];
