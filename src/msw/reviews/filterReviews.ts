import { ParsedQs } from 'qs';
import { ReviewsType } from '@/types/data.type';

export const filterReviews = (reviews: ReviewsType[], queryParam: ParsedQs) => {
  const {
    limit = 10,
    offset = 0,
    type,
    location,
    date,
    sortBy,
    sortOrder,
    gatheringId,
    userId,
  } = queryParam;

  if (gatheringId) {
    reviews = reviews.filter(
      (review) => review.Gathering.id === Number(gatheringId),
    );
  }

  if (userId) {
    reviews = reviews.filter((review) => review.User.id === Number(userId));
  }

  if (type) {
    reviews = reviews.filter((review) => {
      if (type === 'DALLAEMFIT') {
        return (
          review.Gathering.type === 'OFFICE_STRETCHING' ||
          review.Gathering.type === 'MINDFULNESS'
        );
      } else {
        return review.Gathering.type === type;
      }
    });
  }

  if (location) {
    reviews = reviews.filter(
      (review) => review.Gathering.location === location,
    );
  }

  if (date) {
    reviews = reviews.filter((review) => review.Gathering.dateTime === date);
  }

  // TODO : Sorting 로직 추가

  // 가장 마지막에 offset과 limit을 적용
  const result = reviews.slice(Number(offset), Number(offset) + Number(limit));

  return result;
};
