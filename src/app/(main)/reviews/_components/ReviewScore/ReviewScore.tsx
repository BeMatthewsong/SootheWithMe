import { ReviewScoreType } from '@/types/data.type';
import AverageRating from './AverageRating';
import Scores from './Scores';

interface ReviewScoreProps {
  score: ReviewScoreType[];
}
const ReviewScore = ({ score }: ReviewScoreProps) => {
  return (
    <div className='flex items-center justify-center border-y-2 border-var-gray-200 bg-white p-32 dark:border-none dark:bg-neutral-800'>
      <div className='flex w-full items-center justify-between gap-24 md:w-auto md:gap-120 lg:w-612'>
        <AverageRating rating={score} />
        <Scores rating={score} />
      </div>
    </div>
  );
};

export default ReviewScore;
