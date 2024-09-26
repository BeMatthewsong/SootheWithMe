import { ReviewScoreType } from '@/types/data.type';
import ScoreBar from './ScoreBar';

interface ScoresProps {
  ratingData: ReviewScoreType[];
}

interface Ratings {
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}

// 전체 별점 개수 합산
const calculateTotalRatings = (ratingData: ReviewScoreType[]): Ratings => {
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

const calculateBarWidth = (totalRatings: Ratings): Ratings => {
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

const Scores = ({ ratingData }: ScoresProps) => {
  const count = calculateTotalRatings(ratingData);
  const barWidth = calculateBarWidth(count);

  const ratingLevels = [
    { rating: 5, barWidth: barWidth.fiveStars, count: count.fiveStars },
    { rating: 4, barWidth: barWidth.fourStars, count: count.fourStars },
    { rating: 3, barWidth: barWidth.threeStars, count: count.threeStars },
    { rating: 2, barWidth: barWidth.twoStars, count: count.twoStars },
    { rating: 1, barWidth: barWidth.oneStar, count: count.oneStar },
  ];

  return (
    <div className='flex h-116 grow flex-col gap-4 md:w-300'>
      {ratingLevels.map(({ rating, barWidth, count }) => (
        <ScoreBar
          key={rating}
          rating={rating}
          barWidth={barWidth}
          count={count}
        />
      ))}
    </div>
  );
};

export default Scores;
