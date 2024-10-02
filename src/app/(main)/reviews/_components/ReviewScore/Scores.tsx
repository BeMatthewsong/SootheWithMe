import ScoreBar from './ScoreBar';
import { ReviewScoreType } from '@/types/data.type';
import { calculateBarWidth, calculateTotalRatings } from './calculates';

interface ScoresProps {
  ratingData: ReviewScoreType[];
}

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
