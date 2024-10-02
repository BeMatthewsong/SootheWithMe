import { ReviewScoreType } from '@/types/data.type';

interface Ratings {
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

export const calculateAverageRating = (data: ReviewScoreType[]) => {
  if (data.length <= 0) {
    return '0';
  }
  let totalWeightedScore = 0; // 가중치가 적용된 평점 합계
  let totalReviews = 0; // 총 평점 수

  data.forEach((item) => {
    const weightedScore =
      item.oneStar * 1 +
      item.twoStars * 2 +
      item.threeStars * 3 +
      item.fourStars * 4 +
      item.fiveStars * 5;

    const reviewCount =
      item.oneStar +
      item.twoStars +
      item.threeStars +
      item.fourStars +
      item.fiveStars;

    totalWeightedScore += weightedScore;
    totalReviews += reviewCount;
  });

  // 평균을 계산하고 결과 반환
  const average = totalReviews === 0 ? 0 : totalWeightedScore / totalReviews;
  return average.toFixed(1);
};

// 전체 별점 개수 합산
export const calculateTotalRatings = (
  ratingData: ReviewScoreType[],
): Ratings => {
  return ratingData.reduce(
    (acc, data) => ({
      oneStar: acc.oneStar + data.oneStar,
      twoStars: acc.twoStars + data.twoStars,
      threeStars: acc.threeStars + data.threeStars,
      fourStars: acc.fourStars + data.fourStars,
      fiveStars: acc.fiveStars + data.fiveStars,
    }),
    { oneStar: 0, twoStars: 0, threeStars: 0, fourStars: 0, fiveStars: 0 },
  );
};

export const calculateBarWidth = (totalRatings: Ratings): Ratings => {
  const total = Object.values(totalRatings).reduce(
    (sum, count) => sum + count,
    0,
  );

  if (total === 0) {
    return {
      oneStar: 0,
      twoStars: 0,
      threeStars: 0,
      fourStars: 0,
      fiveStars: 0,
    };
  }

  return {
    oneStar: (totalRatings.oneStar / total) * 100,
    twoStars: (totalRatings.twoStars / total) * 100,
    threeStars: (totalRatings.threeStars / total) * 100,
    fourStars: (totalRatings.fourStars / total) * 100,
    fiveStars: (totalRatings.fiveStars / total) * 100,
  };
};
